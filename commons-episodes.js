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
   ===================================================================== */
var EPISODES = [
  { num:"SP", label:"Special edition", date:"2026-11-18", title:"Who Knocks on Jamie's Door?", stars:["marcus","jamie"], img:"marcus", video:"videos/episode-special-milburn.mp4", poster:"videos/episode-special-milburn-poster.jpg",
    blurb:"Our response to the Milburn Review. Marcus's niece Jamie hasn't been past the front gate since March. The plan gives her an adviser in 14 days and somewhere to go. So who knocks on her door first, and why wait until 2027 to pay for it?",
    res:[["Sign the petition","dispatch-milburn-falls-short.html#petition"],["#PayTheFirstYear","dispatch-first-year-wage.html"],["Where Milburn falls short","dispatch-milburn-falls-short.html"]] },
  { num:1, date:"2026-11-20", title:"Thirty-One Years and a Floppy Disk", stars:["dee","zara"], img:"dee", video:"videos/episode-01.mp4",
    blurb:"Nan Dee is made redundant after 31 years on the night shift and digs out her last CV. It is on a floppy disk. Zara tries to help. Nobody survives the font choice.",
    res:[["The CV that gets read","guide-cv.html"],["Comquat CV Rewrite (free)","https://cv.the-common-people.com"]] },
  { num:2, date:"2026-11-27", title:"Read Receipts", stars:["zara","bowie"], img:"zara", video:"videos/episode-02.mp4",
    blurb:"Zara smashes a final interview. Then nothing. Days of nothing. Bowie and Ozzy stage a sit-in by her phone while the family debate whether no news is good news.",
    res:[["#StopGhostingJobSeekers","dispatch-stop-ghosting.html"],["Comquat Interview Prep (free)","prep-report.html"]] },
  { num:3, date:"2026-11-13", title:"Sunday Roast, Monday Interview", stars:["kai","priya"], img:"kai", video:"videos/episode-03.mp4", poster:"videos/episode-03-poster.jpg",
    blurb:"Kai can cook for twelve without breaking a sweat. Talking about himself for ten minutes is another story. Priya runs a very strict mock interview across the gravy.",
    res:[["Interview prep guide","guide-interview-prep.html"],["Apprenticeships, explained","apprenticeships.html"]] },
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
