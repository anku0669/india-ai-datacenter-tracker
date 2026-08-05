// India Data Center Tracker — rendering logic
// Uses NATIONAL_STATS, CAPACITY_TIMELINE, WATER_TIMELINE, DATA_CENTERS from data.js

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderPowerContext();
  renderWaterContext();
  renderMap();
  renderHubCards();
  renderPowerChart();
  renderWaterChart();
  renderPowerShareChart();
  renderWaterShareChart();
  const lu = document.getElementById("last-updated");
  if (lu) lu.textContent = NATIONAL_STATS.lastUpdated;
  const fu = document.getElementById("footer-updated");
  if (fu) fu.textContent = NATIONAL_STATS.lastUpdated;
});

function renderStats() {
  const bar = document.getElementById("stats-bar");
  if (!bar) return;
  const stats = [
    { value: `${NATIONAL_STATS.operationalGW} GW`, label: "Installed capacity (FY26)" },
    { value: `${NATIONAL_STATS.pipelineGW} GW`, label: "Pipeline (next 5 years)" },
    { value: `${NATIONAL_STATS.projected2030GW} GW`, label: "Projected capacity by 2030" },
    { value: `${DATA_CENTERS.length}`, label: "Hubs tracked on this page" },
  ];
  bar.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-value text-orange-600">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");
}

function renderPowerContext() {
  const el = document.getElementById("power-context-stats");
  if (!el) return;
  const stats = [
    { value: `${INDIA_POWER.totalCapacityGW} GW`, label: "India's total installed power capacity (Mar 2026)" },
    { value: `${INDIA_POWER.totalGenerationTWh.toLocaleString()} TWh`, label: "Total electricity generated, FY 2025-26" },
    { value: `${INDIA_POWER.nonFossilSharePct}%`, label: "Share from non-fossil sources" },
    { value: `${INDIA_POWER.dcShareTodayPct}%`, label: "Data centers' share of national capacity, today" },
  ];
  el.innerHTML = stats.map(s => `
    <div class="mega-stat">
      <div class="mega-value text-orange-600">${s.value}</div>
      <div class="mega-label">${s.label}</div>
    </div>
  `).join("");
}

function renderWaterContext() {
  const el = document.getElementById("water-context-stats");
  if (!el) return;
  const stats = [
    { value: `${INDIA_WATER.totalAnnualBCM.toLocaleString()} BCM`, label: "India's total annual water resources" },
    { value: `${INDIA_WATER.utilizableBCM.toLocaleString()} BCM`, label: "Utilizable water resources/year" },
    { value: `${INDIA_WATER.perCapitaM3.toLocaleString()} m³`, label: "Per-capita water availability (< 1,700 m³ = stressed)" },
    { value: `${INDIA_WATER.dcShareOfTotalPct}%`, label: "Data centers' share of total water, nationally" },
  ];
  el.innerHTML = stats.map(s => `
    <div class="mega-stat">
      <div class="mega-value text-sky-600">${s.value}</div>
      <div class="mega-label">${s.label}</div>
    </div>
  `).join("");
}

function statusColor(status) {
  if (status === "operational") return "#16a34a";
  if (status === "construction") return "#f59e0b";
  return "#dc2626";
}

function statusLabel(status) {
  if (status === "operational") return "Operational";
  if (status === "construction") return "Under Construction";
  return "Planned / Proposed";
}

function renderMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map", {
    scrollWheelZoom: false,
    zoomControl: false,
    attributionControl: true,
  }).setView([22.5, 79.5], 5);

  L.control.zoom({ position: "topright" }).addTo(map);

  // High-quality dark basemap for a premium look
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 12,
  }).addTo(map);

  // India highlight outline (approximate bounding polygon)
  const indiaBounds = L.polygon([
    [8.0, 68.0], [8.0, 97.5], [37.0, 97.5], [37.0, 68.0]
  ], {
    color: "#f97316",
    weight: 1.5,
    dashArray: "6 6",
    fill: false,
    opacity: 0.5,
  }).addTo(map);

  DATA_CENTERS.forEach(dc => {
    const color = statusColor(dc.status);
    const baseRadius = dc.liveMW ? Math.max(9, Math.min(24, Math.sqrt(dc.liveMW))) : 10;

    // Glow ring
    L.circleMarker([dc.lat, dc.lng], {
      radius: baseRadius + 6,
      fillColor: color,
      color: "transparent",
      fillOpacity: 0.25,
    }).addTo(map);

    // Main marker
    const marker = L.circleMarker([dc.lat, dc.lng], {
      radius: baseRadius,
      fillColor: color,
      color: "#ffffff",
      weight: 2,
      fillOpacity: 0.95,
    }).addTo(map);

    const mw = dc.liveMW ? `${dc.liveMW} MW live` : "Live capacity: n/a";
    const pipeline = dc.pipelineMW ? `${dc.pipelineMW} MW pipeline` : "";
    marker.bindPopup(`
      <div style="min-width:220px;">
        <b style="font-size:0.95rem;">${dc.name}</b>
        <span style="color:#9ca3af; font-size:0.75rem;">${dc.state}</span><br/>
        <span style="color:${color}; font-weight:700; font-size:0.8rem;">${statusLabel(dc.status)}</span><br/>
        <span style="font-size:0.8rem;">${mw}${pipeline ? " · " + pipeline : ""}</span><br/>
        <span style="font-size:0.75rem; color:#9ca3af;">Operators: ${dc.operators.join(", ")}</span><br/>
        <span style="font-size:0.75rem; color:#9ca3af;">Investment: ${dc.investmentUSD}</span><br/>
        <em style="font-size:0.75rem; display:block; margin-top:4px;">${dc.note}</em>
        <span style="color:#6b7280; font-size:0.65rem; display:block; margin-top:4px;">Source: ${dc.source}</span>
      </div>
    `, { maxWidth: 320 });

    // Show popup on hover for a premium feel
    marker.on("mouseover", function() { this.openPopup(); });
  });
}

function renderHubCards() {
  const container = document.getElementById("hub-cards");
  if (!container) return;
  container.innerHTML = DATA_CENTERS.map(dc => `
    <div class="hub-card">
      <span class="status-pill status-${dc.status}">${statusLabel(dc.status)}</span>
      <h3 class="font-bold text-base">${dc.name}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400">${dc.state}</p>
      <div class="flex gap-4 text-sm my-1">
        <div><span class="font-semibold">${dc.liveMW ? dc.liveMW + " MW" : "—"}</span><div class="text-xs text-gray-500">live</div></div>
        <div><span class="font-semibold">${dc.pipelineMW ? dc.pipelineMW + " MW" : "—"}</span><div class="text-xs text-gray-500">pipeline</div></div>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400"><strong>Operators:</strong> ${dc.operators.join(", ")}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400"><strong>Investment:</strong> ${dc.investmentUSD}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300 leading-snug mt-1">${dc.note}</p>
      <p class="text-xs text-gray-400 mt-auto pt-1 border-t border-gray-100 dark:border-gray-800">Source: ${dc.source}</p>
    </div>
  `).join("");
}

function renderPowerChart() {
  const ctx = document.getElementById("powerChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: CAPACITY_TIMELINE.map(d => d.year),
      datasets: [{
        label: "Installed / projected capacity (GW)",
        data: CAPACITY_TIMELINE.map(d => d.gw),
        backgroundColor: CAPACITY_TIMELINE.map(d => d.type === "actual" ? "#ea580c" : "#fdba74"),
        borderRadius: 6,
      }]
    },
    options: {
      plugins: { legend: { display: false }, title: { display: true, text: "India Data Center Capacity Growth (GW)", font: { size: 14, weight: "bold" } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: "Gigawatts" }, grid: { color: "rgba(0,0,0,0.05)" } }, x: { grid: { display: false } } }
    }
  });
}

function renderWaterChart() {
  const ctx = document.getElementById("waterChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: WATER_TIMELINE.map(d => d.year),
      datasets: [{
        label: "Estimated national DC water use (billion litres/year)",
        data: WATER_TIMELINE.map(d => d.bnLitres),
        borderColor: "#0284c7",
        backgroundColor: "rgba(2,132,199,0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointBackgroundColor: "#0284c7",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      }]
    },
    options: {
      plugins: { legend: { display: false }, title: { display: true, text: "Projected Water Consumption (Billion Litres/Year)", font: { size: 14, weight: "bold" } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: "Billion litres" }, grid: { color: "rgba(0,0,0,0.05)" } }, x: { grid: { display: false } } }
    }
  });
}

function renderPowerShareChart() {
  const ctx = document.getElementById("powerShareChart");
  if (!ctx) return;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Rest of India's grid", "Data centers (today, ~1.9 GW)", "Data centers (2030 pipeline, ~12 GW)"],
      datasets: [{
        data: [
          INDIA_POWER.totalCapacityGW - NATIONAL_STATS.operationalGW - NATIONAL_STATS.projected2030GW,
          NATIONAL_STATS.operationalGW,
          NATIONAL_STATS.projected2030GW
        ],
        backgroundColor: ["#e5e7eb", "#ea580c", "#fdba74"],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "65%",
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 }, padding: 16 } }, title: { display: true, text: `Data Centers vs. India's Total Grid (${INDIA_POWER.totalCapacityGW} GW)`, font: { size: 14, weight: "bold" } } }
    }
  });
}

function renderWaterShareChart() {
  const ctx = document.getElementById("waterShareChart");
  if (!ctx) return;
  const dcBCM = NATIONAL_STATS.totalWaterUse2025BnLitres / 1000;
  const dc2030BCM = NATIONAL_STATS.totalWaterUse2030BnLitres / 1000;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Rest of India's water use", "Data centers (2025, ~0.15 BCM)", "Data centers (2030 projected, ~0.36 BCM)"],
      datasets: [{
        data: [INDIA_WATER.totalAnnualBCM - dcBCM - dc2030BCM, dcBCM, dc2030BCM],
        backgroundColor: ["#e5e7eb", "#0284c7", "#7dd3fc"],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "65%",
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 }, padding: 16 } }, title: { display: true, text: `Data Centers vs. India's Total Water Resources (${INDIA_WATER.totalAnnualBCM.toLocaleString()} BCM)`, font: { size: 14, weight: "bold" } } }
    }
  });
}
