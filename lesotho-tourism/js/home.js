/* home.js - featured destinations (dynamic content from JSON) + hero search */
"use strict";
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("featuredGrid");
  const featuredIds = ["maletsunyane-falls", "thaba-bosiu", "afriski", "katse-dam", "malealea", "ha-kome"];
  try {
    const all = await LT.loadDestinations();
    window.__dest = all;
    grid.innerHTML = featuredIds.map(id => all.find(d => d.id === id)).filter(Boolean).map(LT.cardHTML).join("");
  } catch (e) {
    grid.innerHTML = '<div class="col-12"><div class="alert alert-lt-warm" role="alert">We could not load the featured places. Please refresh the page.</div></div>';
  }

  grid.addEventListener("click", e => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const on = LT.toggleFav(fav.dataset.fav);
      fav.classList.toggle("saved", on); fav.textContent = on ? "♥" : "♡"; fav.setAttribute("aria-pressed", on);
    }
    const det = e.target.closest("[data-details]");
    if (det) window.openDetails(window.__dest.find(d => d.id === det.dataset.details));
  });

  // Hero search sends the visitor to the destinations page with the query
  document.getElementById("heroSearch").addEventListener("submit", e => {
    e.preventDefault();
    const q = document.getElementById("heroQuery").value.trim();
    location.href = "destinations.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });
});

