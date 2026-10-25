(function () {
  var P = window.PORTFOLIO;
  var $ = function (s) { return document.querySelector(s); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function yt(id, q) { return "https://i.ytimg.com/vi/" + id + "/" + (q || "maxresdefault") + ".jpg"; }
  function roles(list) { return (list || []).map(esc).join(" &middot; "); }
  var PLAY = '<span class="play" aria-hidden="true"><span class="tri"></span></span>';

  // Media tile: YouTube or Instagram, with overlay text
  function mediaTile(o, cls, inner) {
    var data, bg;
    if (o.youtubeId) {
      data = 'data-yt="' + esc(o.youtubeId) + '" data-start="' + (o.start || 0) + '"';
      var id = esc(o.youtubeId);
      if (o.poster) {
        // Your own HD frame: always the sharpest option
        bg = '<img class="tile__blur" src="' + esc(o.poster) + '" alt="" aria-hidden="true" loading="lazy">' +
             '<img class="tile__img tile__img--fit" src="' + esc(o.poster) + '" alt="" loading="lazy">';
      } else {
        // Sharpest YouTube still first. The 4:3 ones (sddefault, hqdefault) get their black bars trimmed below
        var fb = ["hq720", "sddefault", "hqdefault", "mqdefault"].map(function (q) { return yt(id, q); }).join(",");
        bg = '<img class="tile__blur" src="' + yt(id) + '" data-fallback="' + fb + '" alt="" aria-hidden="true" loading="lazy">' +
             '<img class="tile__img tile__img--fit" src="' + yt(id) + '" data-fallback="' + fb + '" alt="" loading="lazy">';
      }
    } else {
      data = 'data-ig="' + esc(o.instagram.kind) + "/" + esc(o.instagram.id) + '"';
      bg = '<span class="poster" aria-hidden="true"></span>' +
        (o.poster
          ? '<img class="tile__img" src="' + esc(o.poster) + '" alt="" loading="lazy">'
          : '<span class="ig-wrap" aria-hidden="true"><iframe class="ig-live" src="https://www.instagram.com/' +
              esc(o.instagram.kind) + "/" + esc(o.instagram.id) +
              '/embed/" loading="lazy" tabindex="-1" scrolling="no" title=""></iframe></span>');
    }
    return (
      '<button class="tile tile--media ' + cls + ' reveal" ' + data + ' aria-label="Play ' + esc(o.title || "video") + '">' +
        bg + '<span class="scrim" aria-hidden="true"></span>' + PLAY +
        '<span class="tile__overlay">' + inner + "</span>" +
      "</button>"
    );
  }

  // ---------- Featured ----------
  var f = P.featured;
  var feat = document.getElementById("t-feature");
  feat.outerHTML = mediaTile(f, "t-hero",
    '<span class="tile__title tile__title--xl">' + esc(f.title) + "</span>" +
    '<span class="tile__line">' + esc(f.line) + "</span>" +
    '<span class="tile__roles">' + roles(f.roles) + "</span>"
  );

  // ---------- Ads ----------
  $("#ads").innerHTML = P.ads.map(function (a) {
    return mediaTile(a, a.youtubeId ? "t-half" : "t-tall",
      '<span class="tile__kicker">' + esc(a.category) + " &middot; " + esc(a.company) + "</span>" +
      '<span class="tile__title">' + esc(a.title) + "</span>" +
      (a.line ? '<span class="tile__line">' + esc(a.line) + "</span>" : "") +
      '<span class="tile__roles">' + roles(a.roles) + "</span>"
    );
  }).join("");

  // ---------- Films ----------
  $("#film-roles").innerHTML = roles(P.filmRoles);
  var films = P.films.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
  $("#films-grid").innerHTML = films.map(function (fl, i) {
    var lead = fl.featured && i === 0;
    return mediaTile(fl, lead ? "t-cinema" : "t-film",
      (fl.views ? '<span class="badge">' + esc(fl.views) + " views</span>" : "") +
      '<span class="tile__title' + (lead ? " tile__title--xl" : "") + '">' + esc(fl.title) + "</span>" +
      (lead ? '<span class="tile__roles">Independent short film</span>' : "")
    );
  }).join("");

  // ---------- Series ----------
  var s = P.series;
  $("#series-grid").innerHTML =
    '<div class="tile t-intro reveal">' +
      '<p class="tile__kicker">Creator series &middot; ' + esc(s.client) + "</p>" +
      '<h2 class="tile__h tile__h--lg">' + esc(s.title) + "</h2>" +
      '<p class="tile__p">' + esc(s.line) + "</p>" +
      '<p class="tile__roles">' + roles(s.roles) + "</p>" +
    "</div>" +
    s.reels.map(function (r, i) {
      return mediaTile(
        { title: "Episode " + (i + 1), instagram: { kind: "reel", id: r.id }, poster: r.poster },
        "t-reel",
        '<span class="ep">' + String(i + 1).padStart(2, "0") + "</span>"
      );
    }).join("");

  // ---------- Contact ----------
  var c = P.contact;
  $("#email-link").href = "mailto:" + c.email + "?subject=" + encodeURIComponent("New project enquiry");
  $("#wa-link").href = "https://wa.me/" + c.whatsapp;
  $("#ig-link").href = c.instagram;
  $("#year").textContent = new Date().getFullYear();

  // ---------- Thumbnail fallback ----------
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function swap() {
      var list = (img.dataset.fallback || "").split(",").filter(Boolean);
      if (list.length) { img.src = list.shift(); img.dataset.fallback = list.join(","); }
      else img.style.visibility = "hidden";
    }
    img.addEventListener("error", swap);
    img.addEventListener("load", function () {
      if (img.naturalWidth <= 120) return swap();
      if (!img.dataset.cropped && Math.abs(img.naturalWidth / img.naturalHeight - 4 / 3) < 0.02) trimBars(img);
    });
  });

  // YouTube's 4:3 stills have black bars baked into the top and bottom. Cut them off so the frame is a clean 16:9
  function trimBars(img) {
    try {
      var w = img.naturalWidth, h = Math.round(w * 9 / 16), top = Math.round((img.naturalHeight - h) / 2);
      var c = document.createElement("canvas");
      c.width = w; c.height = h;
      var ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, top, w, h, 0, 0, w, h);
      c.className = img.className;
      if (img.getAttribute("aria-hidden")) c.setAttribute("aria-hidden", "true");
      img.dataset.cropped = "1";
      img.replaceWith(c);
    } catch (e) { /* leave the original if anything goes wrong */ }
  }

  // ---------- Fit Instagram previews inside their tiles ----------
  var IG_W = 400, IG_HEAD = 56, IG_MEDIA = IG_W * 16 / 9;
  function fitIG() {
    document.querySelectorAll(".ig-wrap").forEach(function (wrap) {
      var w = wrap.clientWidth, h = wrap.clientHeight, fr = wrap.firstElementChild;
      var s = Math.max(w / IG_W, h / IG_MEDIA);
      fr.style.width = IG_W + "px";
      fr.style.height = (IG_MEDIA + IG_HEAD + 200) + "px";
      fr.style.transform = "translate(" + (w - IG_W * s) / 2 + "px," +
        (-IG_HEAD * s + (h - IG_MEDIA * s) / 2) + "px) scale(" + s + ")";
    });
  }
  fitIG();
  window.addEventListener("resize", fitIG);

  // ---------- Lightbox ----------
  var lb = $("#lightbox"), frame = $("#lightbox-frame"), lastFocus = null;
  function open(html, vertical) {
    lastFocus = document.activeElement;
    frame.className = "lightbox__frame" + (vertical ? " is-vertical" : "");
    frame.innerHTML = html;
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    setTimeout(function () { lb.hidden = true; frame.innerHTML = ""; }, 250);
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function openYT(id, start) {
    open('<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1" + (start ? "&start=" + start : "") +
      '" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>');
  }
  function openIG(path) {
    open('<iframe src="https://www.instagram.com/' + path + '/embed/" title="Instagram video" scrolling="no" allowtransparency="true"></iframe>', true);
  }
  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-yt]"))) return openYT(t.dataset.yt, +t.dataset.start || 0);
    if ((t = e.target.closest("[data-ig]"))) return openIG(t.dataset.ig);
    if (e.target.closest("[data-play-featured]")) return openYT(f.youtubeId, f.start);
    if (!lb.hidden && (e.target === lb || e.target.closest(".lightbox__close"))) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) close(); });

  // ---------- Hero: photo (2s) > video > photo (2s) > video ... on repeat ----------
  var heroMedia = document.getElementById("hero-media");
  if (heroMedia) {
    var heroVideo = heroMedia.querySelector("video");
    var PHOTO_MS = 2000;
    function playVideo() {
      heroVideo.currentTime = 0;
      var p = heroVideo.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked: the photo simply stays */ });
    }
    heroVideo.addEventListener("playing", function () { heroMedia.classList.add("is-playing"); });
    heroVideo.addEventListener("ended", function () {
      heroMedia.classList.remove("is-playing");   // photo fades back in
      setTimeout(playVideo, PHOTO_MS);
    });
    setTimeout(playVideo, PHOTO_MS);
  }

  // ---------- Nav + reveal ----------
  var nav = $("#nav");
  window.addEventListener("scroll", function () { nav.classList.toggle("is-solid", window.scrollY > 20); }, { passive: true });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
