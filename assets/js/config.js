/* ==========================================================================
   PINK FLAMINGO BUZZ — SITE CONFIG
   This is the ONLY file you need to edit to update reels, founders and contact.
   (A .js file is used instead of .json so the site also works when opened
   straight from disk via file://, where fetch() of JSON is blocked.)
   ========================================================================== */
window.PFB_CONFIG = {
  contact: {
    email: "hello@pinkflamingobuzz.com",      // TODO: replace with business email
    phone: "+91 00000 00000",                 // TODO: replace with business number
    instagram: "pinkflamingobuzz",            // TODO: replace with agency handle (no @)
    city: "Hyderabad, India"
  },

  /* ---------------------------------------------------------------------
     CLIENT WORK — Instagram reel shortcodes (the part after /reel/).
     Add / remove / reorder freely. Each renders as an identical card.
     --------------------------------------------------------------------- */
  reels: [
    "DZnPUR_trBT", "DfuQ15BNzBn", "DfEt13nN9Xs", "DeYZD57Ndb3", "Deq7-ZbNfZr",
    "DeHdkudN9Rd", "Dc_a6JItXC8", "Da694RMtRkj", "DaNmoF1tfft", "DZ1rG-Atc8u",
    "DYhw046NGU8", "DWndvB0jfvH", "DWY-XY6jROV", "DVll12YjTg8", "Df7PVHjycXt",
    "Df63OvOSiGp", "Df4s_7cSqVg", "Derbf7bSvN7", "DcsGXCKSdhH", "DZ9N_jly0hT"
  ],

  /* ---------------------------------------------------------------------
     CO-FOUNDERS
     - photo: path to an image in assets/img/ (e.g. "assets/img/neelima.jpg").
              Leave "" to show a branded initials avatar.
     - followers / posts / following: numbers shown on the card. Leave null
              to hide them. If liveStats.endpoint is set (see below), these
              are overwritten with live numbers on every page load.
     --------------------------------------------------------------------- */
  founders: [
    {
      handle: "its_neelimaaa",
      name: "Neelima",
      role: "Co-founder",
      bio: "Content creator who has partnered with brands across lifestyle, fashion and beauty — now bringing that creator insight to every campaign.",
      photo: "",
      followers: null,
      posts: null,
      following: null
    },
    {
      handle: "soulful_funnygirl",
      name: "Soulful Funny Girl",   // TODO: replace with real name
      role: "Co-founder",
      bio: "Creator known for relatable, feel-good comedy content — turning brand stories into moments audiences actually share.",
      photo: "",
      followers: null,
      posts: null,
      following: null
    }
  ],

  /* ---------------------------------------------------------------------
     LIVE INSTAGRAM STATS (optional, recommended)
     Point this at the serverless function in /serverless (Cloudflare Worker
     or Netlify/Vercel). It must return JSON like:
       { "username": "...", "name": "...", "followers_count": 12345,
         "follows_count": 321, "media_count": 456, "profile_picture_url": "https://..." }
     for GET  <endpoint>?username=<handle>
     Leave "" to use the static numbers above.
     --------------------------------------------------------------------- */
  liveStats: {
    endpoint: ""
  }
};
