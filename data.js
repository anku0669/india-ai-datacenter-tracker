// India Data Center Tracker — dataset
// Compiled Aug 2026 from: KPMG India Data Centre Opportunity Report (2026), SBI Sector Report,
// India Colocation Data Center Portfolio Report 2026, GII Research, Ghar.tv India Data Centre
// Real Estate Report 2026, Economic Times, Business Standard, DataCenterDynamics, Reliance/Meta
// press release, Down To Earth, Eco-Business, Scroll.in, The Hindu BusinessLine. See References
// section on the page for direct links.

const NATIONAL_STATS = {
  operationalGW: 1.9,          // installed capacity FY26 (KPMG)
  fy23GW: 0.78,                 // FY23 baseline
  pipelineGW: 4.5,              // planned over next 5 years
  projected2030GW: 12,          // projected by 2030 (Business Standard)
  renewableSharePct: 50,        // approx renewable mix mid-2025
  electricityShareNationalPct: 0.5,   // DCs as share of India's electricity, 2025
  waterShareNationalPct: 0.03,        // DCs as share of India's water draw, 2025 (upper bound)
  waterStressedSharePct: 75,          // % of Indian DCs sited in water-stressed regions
  litresPerMWPerYear: 25000000,       // ~25 million litres / MW / year (evaporative cooling, Karnataka est.)
  totalWaterUse2025BnLitres: 150,     // estimated national DC water use, 2025
  totalWaterUse2030BnLitres: 358,     // projected national DC water use, 2030
  lastUpdated: "August 2026"
};

// Capacity growth trajectory (GW) — for the projection chart
const CAPACITY_TIMELINE = [
  { year: "FY23", gw: 0.78, type: "actual" },
  { year: "FY24", gw: 1.1, type: "actual" },
  { year: "FY25", gw: 1.5, type: "actual" },
  { year: "FY26", gw: 1.9, type: "actual" },
  { year: "FY27", gw: 3.2, type: "projected" },
  { year: "FY28", gw: 5.0, type: "projected" },
  { year: "FY29", gw: 7.5, type: "projected" },
  { year: "FY30", gw: 12.0, type: "projected" }
];

// Water use trajectory (billion litres/year) nationally
const WATER_TIMELINE = [
  { year: "2025", bnLitres: 150 },
  { year: "2026", bnLitres: 190 },
  { year: "2027", bnLitres: 235 },
  { year: "2028", bnLitres: 275 },
  { year: "2029", bnLitres: 315 },
  { year: "2030", bnLitres: 358 }
];

// Major data center hubs / facilities across India
// status: "operational" | "construction" | "planned"
const DATA_CENTERS = [
  {
    id: "mumbai",
    name: "Mumbai / Navi Mumbai Hub",
    state: "Maharashtra",
    lat: 19.0760, lng: 72.8777,
    status: "operational",
    liveMW: 790,
    pipelineMW: 1181,
    operators: ["STT GDC India", "Equinix (MB3)", "AWS", "Reliance-Brookfield-Digital Realty JV", "Yotta", "CtrlS", "NTT"],
    investmentUSD: "8.3B+ (AWS) plus multi-operator campuses",
    note: "India's largest and most mature data center hub, holding roughly 47-54% of the country's live IT load. Backed by submarine cable landing stations, India's densest financial-sector demand (banks, exchanges, insurers needing low-latency proximity), and the deepest colocation ecosystem in the country. Carries the single largest expansion pipeline nationally at over 1.1 GW, with new campuses in Taloja and Navi Mumbai adding to an already-saturated corridor. Land and power costs here are now among the highest in India, which is one reason hyperscalers are increasingly routing new gigawatt-scale projects toward Hyderabad and Andhra Pradesh instead.",
    source: "Ghar.tv India Data Centre Real Estate Report 2026; DataCenterDynamics"
  },
  {
    id: "thane",
    name: "Thane (Balkum) — Amazon Data Center",
    state: "Maharashtra",
    lat: 19.2183, lng: 72.9781,
    status: "operational",
    liveMW: null,
    pipelineMW: null,
    operators: ["Amazon Web Services"],
    investmentUSD: "Part of AWS's broader $48B India commitment",
    note: "Became a flashpoint for water-use transparency after residents' group WakeUp Thanekars found three conflicting water-allocation figures (0.01 MLD per Amazon's factsheet vs 125 KLD per the state appraisal committee vs a reported 12 MLD municipal supply plan) in a city already running roughly 30 MLD short of daily demand. Amazon maintains the facility uses no water for routine cooling and switches to evaporative cooling only above ~29.4°C ambient temperature; residents are demanding the underlying environmental clearance documents (Water NOC, Sewer NOC, CRZ clearance) and a site-specific cooling-system disclosure. The dispute is one of the clearest public examples of how thin India's data-center water-reporting requirements currently are.",
    source: "The Hindu BusinessLine, Aug 2026"
  },
  {
    id: "chennai",
    name: "Chennai Hub",
    state: "Tamil Nadu",
    lat: 13.0827, lng: 80.2707,
    status: "operational",
    liveMW: 191,
    pipelineMW: 260,
    operators: ["AdaniConneX", "Airtel Nxtra", "CtrlS", "NTT", "STT GDC (Chennai 7)", "Equinix (CN1)"],
    investmentUSD: "Multi-billion, multi-operator",
    note: "India's second-largest hub, benefiting from subsea cable landings and Tamil Nadu's favorable power tariffs and policy support. STT's Chennai 7 and Equinix's CN1 both went live in 2025-26, keeping growth momentum strong. Tamil Nadu's coastal geography makes it a candidate for seawater-cooled facilities similar to the Jamnagar model, though most current Chennai capacity still relies on conventional evaporative or chilled-water systems drawing on municipal and groundwater sources.",
    source: "GII Research; Ghar.tv 2026"
  },
  {
    id: "hyderabad",
    name: "Hyderabad Hub",
    state: "Telangana",
    lat: 17.3850, lng: 78.4867,
    status: "construction",
    liveMW: 151,
    pipelineMW: 1900,
    operators: ["AWS", "Microsoft Azure", "NTT/GDC"],
    investmentUSD: "7B (AWS, Dec 2025) + share of Microsoft's $17.5B",
    note: "India's fastest-growing hyperscale hub — live capacity doubled in a year and the pipeline of ~1.9 GW is the second-largest in the country. Telangana's Data Centre Policy offers cost-based power, a dedicated data-center zone and 100% stamp-duty reimbursement, drawing AWS and Microsoft campuses. The speed of growth here is precisely why regulators and environmental groups are pushing hardest for water-stress mapping before, not after, gigawatt-scale campuses are approved — Telangana's groundwater table is already under strain from agricultural and municipal demand in several districts.",
    source: "Ghar.tv 2026; DataCenterDynamics"
  },
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    lat: 18.5204, lng: 73.8567,
    status: "construction",
    liveMW: null,
    pipelineMW: null,
    operators: ["Microsoft Azure", "AdaniConneX"],
    investmentUSD: "Share of Microsoft's $17.5B AI infra pledge",
    note: "A Tier-II market gaining momentum as Mumbai's power and land costs rise. Microsoft has named Pune alongside Hyderabad for new AI campuses under its December 2025 investment pledge, and Adani has separately listed Pune among the cities where it is developing facilities beyond its flagship Chennai JV with EdgeConneX. Pune's industrial power infrastructure and proximity to Mumbai's fiber backbone make it an attractive overflow market, though public data on its exact live capacity remains sparse compared to the top three hubs.",
    source: "Business Standard, Aug 2026"
  },
  {
    id: "vizag",
    name: "Visakhapatnam (Vizag) Mega Cluster",
    state: "Andhra Pradesh",
    lat: 17.6868, lng: 83.2185,
    status: "planned",
    liveMW: 0,
    pipelineMW: 2500,
    operators: ["Reliance Industries", "Google", "Sify", "Digital Connexion", "Anant Raj Cloud", "RMZ", "Tillman Global Holdings"],
    investmentUSD: "17B+ (Reliance, 1.5 GW) and 15B (Google, 1 GW)",
    note: "The single biggest concentration of announced future capacity in India. Reliance's three-phase, 1.5 GW cluster (~Rs 1.6 lakh crore, roughly $17-19 billion) includes captive solar, battery storage, a dedicated cable landing station and a desalination plant — Phase 1 (500 MW at Polipalli) targets commercial operation by October 2028, with Phase 2 adding ~1 GW by 2030 near Bhogapuram, close to Visakhapatnam's new airport. Google's adjoining 1 GW, $15B campus plus three new subsea cables put Andhra Pradesh on track for a stated 6 GW hosting target, backed by near-100% state GST reimbursement and capital subsidies. Land allocation for Reliance's project alone runs to roughly 935 acres. This is also the cluster where lawyers and environmental groups have most forcefully criticized the lack of disclosed water-sourcing plans at the clearance stage.",
    source: "Economic Times; DataCenterDynamics, 2026"
  },
  {
    id: "odisha",
    name: "Odisha Cluster (Bhubaneswar region)",
    state: "Odisha",
    lat: 20.2961, lng: 85.8245,
    status: "planned",
    liveMW: 0,
    pipelineMW: 1000,
    operators: ["Adani Group", "HCLTech (Sovereign AI Park, with Sarvam)", "RBI", "Government of Odisha"],
    investmentUSD: "~12B (Adani, Rs 1 trillion, 1 GW) + Rs 14,257 crore (HCLTech)",
    note: "An emerging AI-infrastructure hub. Adani has proposed a Rs 1 trillion (~$12B), 1 GW AI-focused data center on roughly 250 acres — potentially India's second-largest single investment in the sector after Google's Andhra Pradesh project, pending state approval and incentive negotiations. HCLTech's Rs 14,257 crore Sovereign AI Park, developed with Sarvam and the Odisha government, adds a distinct sovereign-AI angle focused on government and public-sector workloads. Separately, a Rs 169 crore RBI data center and a Rs 266.48 crore state next-gen data center are both nearing completion — smaller in scale but notable as some of the first explicitly public-sector-owned facilities in the current wave.",
    source: "Business Standard, Aug 2026"
  },
  {
    id: "jamnagar",
    name: "Jamnagar AI Data Center",
    state: "Gujarat",
    lat: 22.4707, lng: 70.0577,
    status: "construction",
    liveMW: 0,
    pipelineMW: 168,
    operators: ["Reliance Industries", "Meta Platforms"],
    investmentUSD: "Undisclosed; build-to-suit lease deal",
    note: "Meta's first built-to-suit data center in India, a 168 MW facility on a two-year delivery timeline with an option to scale. Reliance is providing end-to-end services — design, construction, utility management, renewable power, network connectivity and fully managed operations — while Meta leases capacity. Notable for using desalinated seawater for cooling instead of groundwater or municipal supply, a model regulators, activists and other operators are watching closely as a potential template for coastal facilities elsewhere in India, including parts of the Vizag and Chennai clusters.",
    source: "Reliance Industries press release, June 2026"
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR / Noida",
    state: "Uttar Pradesh / Delhi",
    lat: 28.5355, lng: 77.3910,
    status: "operational",
    liveMW: 260,
    pipelineMW: 400,
    operators: ["NTT", "Sify", "STT GDC", "CtrlS"],
    investmentUSD: "Multi-operator, undisclosed aggregate",
    note: "One of the four metros (with Mumbai, Chennai, Bengaluru) that together host roughly 90% of India's current capacity. Growth here is steadier and more enterprise and government-workload driven than the hyperscale, AI-first build-outs further south in Andhra Pradesh and Telangana. Delhi NCR's role as India's political and regulatory capital also means it hosts a disproportionate share of compliance-sensitive government and BFSI (banking, financial services, insurance) workloads that require in-country, low-latency hosting.",
    source: "KPMG India Data Centre Opportunity Report, 2026"
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    lat: 12.9716, lng: 77.5946,
    status: "operational",
    liveMW: 220,
    pipelineMW: 180,
    operators: ["NTT", "CtrlS", "Sify", "Colt DCS"],
    investmentUSD: "Multi-operator, undisclosed aggregate",
    note: "India's tech capital carries real water-stress exposure: Karnataka-based estimates of ~25 million litres of cooling water per MW per year originate largely from Bengaluru-area facility disclosures, and the city already faces recurring municipal water shortages and dependence on tanker-truck supply in several neighborhoods during dry months. Bengaluru's data center growth is now more constrained by land and water availability than by demand, which is part of why newer hyperscale capacity is increasingly routed to Hyderabad and coastal Andhra Pradesh instead.",
    source: "Down To Earth, April 2026"
  }
];
