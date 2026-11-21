/* =====================================================================
   THE COMMONS: EPISODE SCHEDULE (shared by the homepage and the Commons page)

   HOW RELEASES WORK
   - Each episode goes live automatically at midnight on its date (a Friday).
   - It only goes live if its video file is on the site. Upload it any time
     before release day to the videos folder, named exactly:
        videos/episode-01.mp4, videos/episode-02.mp4 ... videos/episode-08.mp4
   - No video by release day? The episode stays as "Coming soon" until the
     video is uploaded, then appears straight away.
   - To use YouTube instead, replace video:"..." with youtube:"VIDEO_ID".
   - To move a release, change its date (YYYY-MM-DD).
   - read:[...] is the written version shown under the video: every word,
     plus what's happening on screen. ["s", "..."] is a scene note,
     ["Name", "..."] is someone speaking. captions: is the matching
     caption file, for YouTube or socials (the words are already in the picture).
   ===================================================================== */
var EPISODES = [
  { num:1, date:"2026-11-20", title:"Thirty-One Years and a Floppy Disk", stars:["dee","zara"], img:"dee", video:"videos/episode-01.mp4",
    blurb:"Nan Dee is made redundant after 31 years on the night shift and digs out her last CV. It is on a floppy disk. Zara tries to help. Nobody survives the font choice.",
    res:[["The CV that gets read","guide-cv.html"],["Comquat CV Rewrite (free)","https://cv.the-common-people.com"]],
    captions:"videos/episode-01.vtt",
    read:[["s", "Title card: The Commons, Episode 01. Thirty-One Years and a Floppy Disk. Photos of Nan Dee and Zara. Music plays."], ["s", "A warehouse at night. Nan Dee, in a hi-vis vest and holding a clipboard, waves a lorry off."], ["Nan Dee", "Thirty-one years I ran the night shift. Lorries out the door before the sun was up."], ["s", "An office. A manager gives a nervous double thumbs up next to a droopy balloon. Nan Dee holds a little cactus and a letter. She is not impressed."], ["Nan Dee", "Then one Tuesday, they thanked me for my service."], ["s", "The loft, lit by a torch. Nan Dee holds a floppy disk up like treasure."], ["Nan Dee", "So I dug out my CV. It was in the loft. On a floppy disk."], ["s", "The kitchen. Zara, in her wheelchair, holds the floppy disk at arm's length. Nan Dee folds her arms."], ["Nan Dee", "Our Zara looked at it like it was a fossil. “Nan, nothing can even open that.”"], ["s", "An old computer shows a purple CV in Comic Sans, with Nan Dee's photo. Nan Dee shows it off proudly. Zara slumps back with her hand on her forehead."], ["Nan Dee", "We got it open. Purple. Comic Sans. A photo of me in shoulder pads. Zara had to have a lie down."], ["s", "The kitchen table, with coffee and biscuits. Zara points at a laptop while Nan Dee types, tongue out in concentration."], ["Nan Dee", "Her advice? Stop listing duties. Say what you actually did. Two pages, plain font, every word earning its place."], ["s", "An interview room. Nan Dee and the interviewer shake hands, both smiling."], ["Nan Dee", "Turns out thirty-one years of keeping the lights on is exactly what they were after."], ["s", "Back to the purple Comic Sans CV on the old computer."], ["Nan Dee", "If your CV’s older than your grandkids, there’s a free guide for that. Come on."], ["s", "End card: Free help from this episode. The CV that gets read. Comquat CV Rewrite (free). the-common-people.com. New episodes every Friday. Free, always."]] },
  { num:2, date:"2026-11-27", title:"Read Receipts", stars:["zara","bowie"], img:"zara", video:"videos/episode-02.mp4",
    blurb:"Zara smashes a final interview. Then nothing. Days of nothing. Bowie and Ozzy stage a sit-in by her phone while the family debate whether no news is good news.",
    res:[["#StopGhostingJobSeekers","dispatch-stop-ghosting.html"],["Comquat Interview Prep (free)","prep-report.html"]] },
  { num:3, date:"2026-11-13", title:"Sunday Roast, Monday Interview", stars:["kai","priya"], img:"kai", video:"videos/episode-03.mp4", poster:"videos/episode-03-poster.jpg",
    blurb:"Kai can cook for twelve without breaking a sweat. Talking about himself for ten minutes is another story. Priya runs a very strict mock interview across the gravy.",
    res:[["Interview prep guide","guide-interview-prep.html"],["Apprenticeships, explained","apprenticeships.html"]],
    captions:"videos/episode-03.vtt",
    read:[["s", "Title card: The Commons, Episode 03. Sunday Roast, Monday Interview. Told by Kai, future chef. Music plays."], ["s", "A busy home kitchen. Kai, in a yellow hoodie with a tea towel on his shoulder, cooks a roast with trays of Yorkshire puddings. He's grinning."], ["Kai", "Sunday dinner for twelve? Easy. Roast in at eleven, Yorkshires at quarter to two, and gravy that’d make you cry."], ["s", "After dinner, among the empty plates and roasting tins, Kai stares at his phone in shock."], ["Kai", "Then this lands. An interview. Apprentice chef. Monday morning."], ["s", "Night. Kai sits at his desk surrounded by screwed-up paper, chewing his pen and clutching his hair. Then he slumps over the desk."], ["Kai", "Cooking, I can do. Talking about myself for ten minutes? My brain just goes... blank."], ["s", "The dinner table. Priya, in a blazer with a clipboard, interviews Kai across the gravy boat. Kai looks worn out."], ["Kai", "So Priya runs a mock interview. Across the gravy. She is not messing about."], ["s", "Close up: Kai writes 1, 2, 3 on a notepad, with little drawings of a ladle and a whisk."], ["Kai", "Her trick? Tell it like a recipe. What you made. How you made it. How it turned out."], ["s", "Monday. Kai stands in the doorway of a busy restaurant kitchen full of chefs."], ["Kai", "Monday. Same nerves. But this time, I had my recipes."], ["s", "Home. Kai bursts through the front door holding up his phone. The dogs, Bowie and Ozzy, jump up to greet him."], ["Kai", "Did I get it? Let’s just say..."], ["s", "Ozzy throws his head back and howls."], ["Ozzy", "AWOOOOOO!"], ["Kai", "Ozzy howled."], ["s", "End card: Free help from this episode. Interview prep guide. Apprenticeships, explained. Free to read. Free to share. the-common-people.com. The Commons. A new episode every Friday."]] },
  { num:4, date:"2026-12-04", title:"The Paperwork Staircase", stars:["marcus","kai"], img:"marcus", video:"videos/episode-04.mp4",
    blurb:"Marcus decides to take on his first apprentice and meets his greatest enemy yet: the funding rules. He builds a staircase to escape. It does not help.",
    res:[["Apprenticeship guidance","apprenticeships.html"],["The Apprenticeship Paradox","dispatch-apprenticeship-paradox.html"]] },
  { num:5, date:"2026-12-11", title:"Two Hundred and Eighty", stars:["priya","marcus"], img:"priya", video:"videos/episode-05.mp4",
    blurb:"Priya opens her inbox to around 280 applications for one role (the UK average, according to Modern CV's UK Job Interview Statistics 2026). Not one mentions the job. She needs a better plan and a board that will listen.",
    res:[["The Commons Report","dispatch-report-hertfordshire.html"],["Embed apprenticeships in HR","dispatch-embed-apprenticeships.html"]] },
  { num:6, date:"2026-12-18", title:"Stand By", stars:["lou","zara"], img:"lou", video:"videos/episode-06.mp4",
    blurb:"Auntie Lou has run festivals for thousands, but one LinkedIn headline brings her to her knees. Zara offers help. Lou offers a clipboard. Chaos, with a running order.",
    res:[["LinkedIn, properly","guide-linkedin.html"],["The intro video guide","guide-video-intro.html"]] },
  { num:7, date:"2027-01-08", title:"The Robots Are Reading", stars:["dee","kai"], img:"dee", video:"videos/episode-07.mp4",
    blurb:"Dee is convinced a computer binned her application before a human saw it. Kai tries to explain AI. Dee writes a strongly worded letter to the algorithm.",
    res:[["The EU AI Act, explained","dispatch-eu-ai-act.html"],["Comquat CV Rewrite (free)","https://cv.the-common-people.com"]] },
  { num:8, date:"2027-01-15", title:"Woof. Woof.", stars:["bowie","dee","marcus","priya","zara","kai","lou"], img:"bowie-ozzy", video:"videos/episode-08.mp4",
    blurb:"Series finale. The whole family gathers for a celebration and Bowie and Ozzy steal the show. Someone gets a job. Someone gets an apprentice. Ozzy gets the sausage rolls.",
    res:[["Subscribe to The Loudspeaker","loudspeaker.html"],["Browse the field guides","guides.html"]] }
];
