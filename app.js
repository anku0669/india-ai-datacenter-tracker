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
  document.getElementById("last-updated").textContent = NATIONAL_STATS.lastUpdated;
  document.getElementById("footer-updated").textContent = NATIONAL_STATS.lastUpdated;
});

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

function renderStats() {
  const stats = [
    { value: `${NATIONAL_STATS.operationalGW} GW`, label: "Installed capacity (FY26)" },
    { value: `${NATIONAL_STATS.pipelineGW} GW`, label: "Pipeline (next 5 years)" },
    { value: `${NATIONAL_STATS.projected2030GW} GW`, label: "Projected capacity by 2030" },
    { value: `${DATA_CENTERS.length}`, label: "Hubs tracked on this page" },
  ];
  const bar = document.getElementById("stats-bar");
  bar.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-value text-orange-600">${s.value}</div>
      <div class="stat-label">${s.label}</div>
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
  const map = L.map("map", { scrollWheelZoom: false }).setView([21.5, 79.0], 5);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 12,
  }).addTo(map);

  DATA_CENTERS.forEach(dc => {
    const color = statusColor(dc.status);
    const marker = L.circleMarker([dc.lat, dc.lng], {
      radius: dc.liveMW ? Math.max(8, Math.min(22, Math.sqrt(dc.liveMW))) : 9,
      fillColor: color,
      color: "#ffffff",
      weight: 1.5,
      fillOpacity: 0.85,
    }).addTo(map);

    const mw = dc.liveMW ? `${dc.liveMW} MW live` : "Live capacity: n/a";
    const pipeline = dc.pipelineMW ? `${dc.pipelineMW} MW pipeline` : "";
    marker.bindPopup(`
      <b>${dc.name}</b>
      ${dc.state}<br/>
      <span style="color:${color}; font-weight:600;">${statusLabel(dc.status)}</span><br/>
      ${mw}${pipeline ? " · " + pipeline : ""}<br/>
      Operators: ${dc.operators.join(", ")}<br/>
      Investment: ${dc.investmentUSD}<br/>
      <em>${dc.note}</em><br/>
      <span style="color:#888; font-size:0.7rem;">Source: ${dc.source}</span>
    `);
  });
}

function renderHubCards() {
  const container = document.getElementById("hub-cards");
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
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: CAPACITY_TIMELINE.map(d => d.year),
      datasets: [{
        label: "Installed / projected capacity (GW)",
        data: CAPACITY_TIMELINE.map(d => d.gw),
        backgroundColor: CAPACITY_TIMELINE.map(d => d.type === "actual" ? "#ea580c" : "#fdba74"),
        borderRadius: 4,
      }]
    },
    options: {
      plugins: { legend: { display: false }, title: { display: true, text: "India Data Center Capacity Growth (GW)" } },
      scales: { y: { beginAtZero: true, title: { display: true, text: "Gigawatts" } } }
    }
  });
}

function renderWaterChart() {
  const ctx = document.getElementById("waterChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: WATER_TIMELINE.map(d => d.year),
      datasets: [{
        label: "Estimated national DC water use (billion litres/year)",
        data: WATER_TIMELINE.map(d => d.bnLitres),
        borderColor: "#0284c7",
        backgroundColor: "rgba(2,132,199,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      }]
    },
    options: {
      plugins: { legend: { display: false }, title: { display: true, text: "Projected Water Consumption (Billion Litres/Year)" } },
      scales: { y: { beginAtZero: true, title: { display: true, text: "Billion litres" } } }
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
      }]
    },
    options: {
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }, title: { display: true, text: `Data Centers vs. India's Total Grid (${INDIA_POWER.totalCapacityGW} GW)` } }
    }
  });
}

function renderWaterShareChart() {
  const ctx = document.getElementById("waterShareChart");
  if (!ctx) return;
  const dcBCM = NATIONAL_STATS.totalWaterUse2025BnLitres / 1000; // billion litres -> BCM
  const dc2030BCM = NATIONAL_STATS.totalWaterUse2030BnLitres / 1000;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Rest of India's water use", "Data centers (2025, ~0.15 BCM)", "Data centers (2030 projected, ~0.36 BCM)"],
      datasets: [{
        data: [INDIA_WATER.totalAnnualBCM - dcBCM - dc2030BCM, dcBCM, dc2030BCM],
        backgroundColor: ["#e5e7eb", "#0284c7", "#7dd3fc"],
      }]
    },
    options: {
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }, title: { display: true, text: `Data Centers vs. India's Total Water Resources (${INDIA_WATER.totalAnnualBCM.toLocaleString()} BCM)` } }
    }
  });
}
