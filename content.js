/*
  ============================================================
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  You never need to touch index.html or main.js to add work.
  ============================================================

  YouTube:   "youtubeId" is the part after "watch?v=".  "start" (seconds) is optional.
  Instagram: "instagram" is { kind: "reel" or "p", id: "the part after /reel/ or /p/" }.
  Posters:   For the sharpest thumbnails, export an HD frame (1920x1080 JPG) from your original footage,
             put it in the /images folder and add  poster: "images/your-file.jpg"  to that item.
             Works for YouTube and Instagram items. Without one, YouTube tiles use YouTube's best still
             and Instagram tiles show a live preview.
*/

window.PORTFOLIO = {
  // ---------- CONTACT (replace these) ----------
  contact: {
    email: "anuragvedula02@gmail.com",
    whatsapp: "919908900669",                 // country code + number, no "+" or spaces
    instagram: "https://www.instagram.com/"   // TODO: your handle
  },

  // ---------- FEATURED BRAND FILM ----------
  featured: {
    title: "PhonePe",
    category: "Brand Film",
    roles: ["Director", "Lead Actor"],
    company: "Owled Media",
    youtubeId: "EYkbg444H8A",
    start: 459,
    line: "Our most performed piece. A brand story for one of India's biggest fintech names, directed and fronted on camera."
  },

  // ---------- COMMERCIAL / AD WORK (add more Owled Media work here) ----------
  ads: [
    // YouTube ads show as two half-width tiles, above the tall Instagram tiles
    {
      title: "TickerTape",
      category: "Ad Film",              // TODO: e.g. "P2C Ad" or "Skit-Based Ad"
      roles: ["Director"],              // TODO: your role on this one
      company: "Owled Media",
      youtubeId: "weOQqJeB-38"
    },
    {
      title: "TickerTape",
      category: "Ad Film",              // TODO: e.g. "P2C Ad" or "Skit-Based Ad"
      roles: ["Director"],              // TODO: your role on this one
      company: "Owled Media",
      youtubeId: "u4LzZZWS3YM"
    },
    {
      title: "PhonePe Invest",
      category: "Skit-Based Ad",
      roles: ["Assistant Director"],
      company: "Owled Media",
      line: "Dating, but make it investing. We turned every kind of date into a different kind of investment, from the safe bet to the high-risk thrill.",
      instagram: { kind: "p", id: "DeZcGmqPlHg" }
      // poster: "images/skit-ad.jpg"
    },
    {
      title: "Brand Reel",              // TODO: brand name
      category: "Social Ad",            // TODO: e.g. "P2C Ad" or "Skit-Based Ad"
      roles: ["Director"],              // TODO: your role on this one
      company: "Owled Media",
      instagram: { kind: "reel", id: "DcDC1z_k8Yh" }
    }
    , {
      title: "Brand Reel",              // TODO: brand name
      category: "Social Ad",            // TODO: e.g. "P2C Ad" or "Skit-Based Ad"
      roles: ["Director"],              // TODO: your role on this one
      company: "Owled Media",
      instagram: { kind: "reel", id: "DcIrvJkHdW-" }
    }
    // YouTube example:
    // , { title: "Brand Name", category: "P2C Ad", roles: ["Director"], company: "Owled Media", youtubeId: "VIDEO_ID" }
  ],

  // ---------- INDEPENDENT SHORT FILMS ----------
  films: [
    {
      title: "Until Next Time",
      youtubeId: "DZnocvKdBeE",
      views: "15K+",      // TODO: confirm this is the 15K+ film. If not, move views + featured to the right one
      featured: true
      // , poster: "images/until-next-time.jpg"
    },
    { title: "A Day After / A Day Before", youtubeId: "fCc2Ya7-5XQ", views: "" },
    { title: "Tiniest Regrets in Life", youtubeId: "DYw8a9WyIEs", views: "" },
    { title: "That's How It Began", youtubeId: "ykxcrCYJ3To", views: "" }
  ],
  filmRoles: ["Writer", "Director", "Editor", "Producer"],

  // ---------- CREATOR SERIES ----------
  series: {
    client: "Bharadwaj.ai",
    title: "AI, explained.",
    roles: ["Writer", "Director", "DOP", "Editor"],
    line: "A short-form education series for an AI creator. Concept, script, shoot and cut, all by one person.",
    reels: [
      { id: "DY4eorfv9DD" },   // add  poster: "images/reel-1.jpg"  for a real still
      { id: "DaSqmxwxHWm" },
      { id: "DY7GOMtP0UO" },
      { id: "DZpY6CqR6Wu" }
    ]
  }
};
