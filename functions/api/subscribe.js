// Cloudflare Pages Function: POST /api/subscribe
// Adds a newsletter subscriber to your Resend Contacts (your subscriber database).
// Your Resend API key stays server-side and is never exposed to the browser.
//
// Required environment variable (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY   your Resend API key (starts with "re_"), set as a Secret
// Optional:
//   RESEND_FROM      a verified sender, e.g. "The Com'mon People <loudspeaker@thecommonpeople.co.uk>"
//                    If set, a welcome email is sent. If unset, signup still works with no welcome email.

export async function onRequestPost(context) {
  const { request, env } = context;
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "Bad request." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  const honeypot = String(body.company || ""); // hidden field; bots fill it, humans don't
  if (honeypot) return json({ message: "Thanks." }); // silently ignore bots

  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!validEmail) return json({ error: "Please enter a valid email address." }, 400);

  if (!env.RESEND_API_KEY) {
    return json({ error: "Signup isn't configured yet. Please try again later." }, 500);
  }

  // Add the contact to Resend (your subscriber database).
  // If RESEND_AUDIENCE_ID is set, add them straight into that audience; otherwise use global Contacts.
  const audienceId = String(env.RESEND_AUDIENCE_ID || "").trim();
  const endpoint = audienceId
    ? `https://api.resend.com/audiences/${audienceId}/contacts`
    : "https://api.resend.com/contacts";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!res.ok) {
      const t = (await res.text()).toLowerCase();
      const alreadyExists = res.status === 409 || res.status === 422 || t.includes("already");
      if (alreadyExists) {
        return json({ message: "You're already on the list. Thanks." });
      }
      return json({ error: "Couldn't subscribe right now. Please try again." }, 502);
    }
  } catch (e) {
    return json({ error: "Couldn't subscribe right now. Please try again." }, 502);
  }

  // Optional welcome email. Best-effort: never fail the signup if this errors.
  if (env.RESEND_FROM) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.RESEND_FROM,
          to: email,
          subject: "You're on the list. The Com'mon People",
          text:
            "Thanks for subscribing to the Loudspeaker.\n\n" +
            "Once a month you'll get an editor's view from the recruitment frontline, plus a heads-up when new free guides and dispatches land. No spam, no selling your details, unsubscribe any time from the link in every email.\n\n" +
            "The Com'mon People\nFree, always.",
        }),
      });
    } catch (e) {
      // ignore welcome-email errors
    }
  }

  return json({ message: "You're on the list. Welcome aboard." });
}
