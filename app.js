/* CRAZY — Smash & Tacos · interactions (vanilla JS, aucune dépendance) */
(() => {
  const root = document.documentElement;
  root.classList.remove("no-js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* Loader (accueil uniquement) */
  const loader = document.querySelector(".loader");
  if (loader) {
    document.body.classList.add("loading");
    const done = () => {
      loader.classList.add("done");
      document.body.classList.remove("loading");
    };
    window.addEventListener("load", () => setTimeout(done, reducedMotion ? 0 : 550));
    setTimeout(done, 3500); // filet de sécurité si une ressource traîne
  }

  /* Apparitions au scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* Menu mobile */
  const wrap = document.querySelector(".nav-wrap");
  const nav = wrap?.querySelector("nav");
  const burger = wrap?.querySelector(".mobile-menu");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    wrap.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.textContent = open ? "Fermer" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger?.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav?.classList.contains("open")) setMenu(false); });

  /* Horaires : statut ouvert/fermé + ligne du jour */
  // Minutes depuis minuit ; une fin > 1440 déborde sur le lendemain (ex. 03:00 = 1620).
  const HOURS = {
    0: [[1140, 1440]],              // dimanche 19:00 – 00:00
    1: [],                          // lundi fermé
    2: [[720, 810], [1140, 1380]],  // mardi
    3: [[720, 810], [1140, 1380]],  // mercredi
    4: [[720, 810], [1140, 1380]],  // jeudi
    5: [[720, 810], [1140, 1620]],  // vendredi 19:00 – 03:00
    6: [[1140, 1620]],              // samedi 19:00 – 03:00
  };
  const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const fmt = (m) => {
    m %= 1440;
    const h = Math.floor(m / 60), min = m % 60;
    return h + "h" + (min ? String(min).padStart(2, "0") : "");
  };
  // Heure de Paris, quel que soit le fuseau du visiteur
  const parisNow = () => {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, min: Number(get("hour")) * 60 + Number(get("minute")) };
  };
  const status = () => {
    const { day, min } = parisNow();
    const prev = (day + 6) % 7;
    for (const [s, e] of HOURS[day]) if (min >= s && min < e) return { open: true, until: e };
    for (const [s, e] of HOURS[prev]) if (e > 1440 && min + 1440 >= s && min + 1440 < e) return { open: true, until: e };
    for (let i = 0; i < 8; i++) {
      const d = (day + i) % 7;
      const next = HOURS[d].find(([s]) => i > 0 || s > min);
      if (next) {
        const when = i === 0 ? "aujourd’hui" : i === 1 ? "demain" : DAYS[d];
        return { open: false, next: when + " à " + fmt(next[0]) };
      }
    }
    return { open: false };
  };
  const st = status();
  document.querySelectorAll("[data-open-status]").forEach((el) => {
    el.classList.add(st.open ? "is-open" : "is-closed");
    el.textContent = st.open
      ? "Ouvert maintenant · jusqu’à " + fmt(st.until)
      : "Fermé pour le moment" + (st.next ? " · ouvre " + st.next : "");
  });
  const today = parisNow().day;
  document.querySelectorAll(".hours tr[data-day]").forEach((tr) => {
    if (Number(tr.dataset.day) === today) tr.classList.add("today");
  });

  /* Année du footer */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  if (reducedMotion) return;

  /* Curseur personnalisé */
  const cursor = document.querySelector(".cursor");
  if (cursor && finePointer) {
    window.addEventListener("pointermove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
    document.querySelectorAll("a, button, .product-card, summary").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
  }

  if (!finePointer) return;

  /* Photo du hero inclinable */
  document.querySelectorAll(".tilt").forEach((card) => {
    const base = card.dataset.rotate || "3";
    card.addEventListener("pointermove", (e) => {
      const b = card.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      card.style.transform = `rotate(${base}deg) perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });

  /* Boutons magnétiques */
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const b = btn.getBoundingClientRect();
      btn.style.translate = `${(e.clientX - b.left - b.width / 2) * 0.15}px ${(e.clientY - b.top - b.height / 2) * 0.2}px`;
    });
    btn.addEventListener("pointerleave", () => (btn.style.translate = ""));
  });

  /* Parallaxe légère */
  const px = document.querySelectorAll("[data-parallax]");
  if (px.length) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        px.forEach((el) => (el.style.translate = `0 ${Math.max(-80, Math.min(80, (y * Number(el.dataset.parallax)) / 100))}px`));
        ticking = false;
      });
    }, { passive: true });
  }
})();
