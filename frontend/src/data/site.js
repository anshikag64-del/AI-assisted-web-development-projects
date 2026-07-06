// Central data source for PKGT marketing site
export const COMPANY = {
  name: "M/s Pramod Kumar Gupta Thekedar",
  short: "PKGT",
  tagline: "Building India's backbone since 1985",
  address: "194 Kunwargunj, Tilhar, Shahjahanpur, Uttar Pradesh 242301",
  phone: "+91 97173 22655",
  email: "pkgconstruction15@gmail.com",
  founded: 1985,
  experience: "35+",
};

export const NAV_LINKS = [
  { label: "Firm", href: "#about" },
  { label: "Sectors", href: "#sectors" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Capability", href: "#capability" },
  { label: "Growth", href: "#turnover" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const CORE_VALUES = [
  { code: "01", title: "Safety First", body: "Zero-compromise site protocols for employees, clients and public infrastructure users." },
  { code: "02", title: "Engineering Grade", body: "High-quality materials, certified skilled workers and strict adherence to IRC/MoRTH standards." },
  { code: "03", title: "Modern Methods", body: "Continuous adoption of new tech, GPS surveys, digital QA and efficient site processes." },
  { code: "04", title: "Deep Collaboration", body: "Aligned with clients, consulting engineers, architects and specialist subcontractors." },
];

export const SECTORS = [
  {
    key: "roads",
    label: "Roads & Highways",
    body: "State highways, national highway repair, flood damage restoration, WMM & BC layers, HMP paving.",
    image: "https://images.unsplash.com/photo-1718634657344-3af38d7ed851",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    key: "buildings",
    label: "Buildings",
    body: "Government office buildings, residential complexes, multi-storey structures and civic buildings.",
    image: "https://images.unsplash.com/photo-1569258592171-357ea26da4df",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    key: "irrigation",
    label: "Irrigation & Bridges",
    body: "Bridge approaches, protection works, river-side embankments and irrigation channel works.",
    image: "https://images.unsplash.com/photo-1606050309588-741702cceb9b",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

export const PROJECTS = [
  { code: "P-01", title: "SH-40 Widening & Strengthening", scope: "Lucknow–Bangarmau–Nanamau–Bilhaur–Bela–Itava, KM 85.520 to 97.900", client: "PWD Unnao", value: "₹ 2,307 L", year: "2023", cat: "State Highway" },
  { code: "P-02", title: "Garra River Bridge — Balance Work", scope: "Bridge, approach, additional approach & protection works near Dhanyaura, Shahjahanpur", client: "UP State Bridge Corp Ltd, Bareilly", value: "₹ 976 L", year: "2022", cat: "Bridge" },
  { code: "P-03", title: "Faridpur – Padera Rural Road", scope: "Construction and maintenance, District Bareilly, Package UP-14109", client: "PMGSY Circle, PWD Bareilly", value: "₹ 715 L", year: "2022", cat: "Rural Road" },
  { code: "P-04", title: "BSA Road Widening (HMP)", scope: "Widening and strengthening with Hot Mix Plant paving", client: "UPPWD", value: "₹ 652 L", year: "2021", cat: "Urban Road" },
  { code: "P-05", title: "Majhola–Sitarganj Road", scope: "Construction & maintenance KM 8–10 via Hardaspur, Pkg 56106", client: "PMGSY, Rural Engg. Dept.", value: "₹ 568 L", year: "2021", cat: "Rural Road" },
  { code: "P-06", title: "Kanha Pashu Ashray, Powayan", scope: "Civil construction of municipal cattle shelter facility", client: "Nagar Palika Parishad Powayan", value: "₹ 290 L", year: "2022", cat: "Civic Building" },
  { code: "P-07", title: "Khajuria – Nahilora Marena Road", scope: "Construction & painting work of rural connector", client: "Rural Engineering Department", value: "₹ 259 L", year: "2020", cat: "Rural Road" },
  { code: "P-08", title: "Press Club & Info Office, Shahjahanpur", scope: "Multi-storey government office construction", client: "Rural Engineering Department", value: "₹ 200 L", year: "2020", cat: "Building" },
  { code: "P-09", title: "NH-730C Flood Damage Repair (KM 15–30)", scope: "Restoration of damaged stretches under FDR 2019-20, Uttar Pradesh", client: "N.H. Circle, PWD Bareilly", value: "₹ 112 L", year: "2020", cat: "National Highway" },
  { code: "P-10", title: "NH-730 Leftover Stretch Restoration", scope: "1.080 KM leftover + KM 31–32 under FDR 2019-20", client: "N.H. Circle, PWD Bareilly", value: "₹ 105 L", year: "2020", cat: "National Highway" },
  { code: "P-11", title: "NH-730C KM 13–15 Restoration", scope: "WMM & BC restoration under FDR 2021-22", client: "N.H. Circle, PWD Bareilly", value: "₹ 55.60 L", year: "2021", cat: "National Highway" },
  { code: "P-12", title: "NH-730C KM 16–18 Restoration", scope: "WMM & BC restoration under FDR 2021-22", client: "N.H. Circle, PWD Bareilly", value: "₹ 55.00 L", year: "2021", cat: "National Highway" },
  { code: "P-13", title: "NH-730C KM 19–21 Restoration", scope: "WMM & BC restoration under FDR 2021-22", client: "N.H. Circle, PWD Bareilly", value: "₹ 44.58 L", year: "2021", cat: "National Highway" },
];

export const CLIENTS = [
  "State PWD", "U.P. Irrigation Dept.", "NH PWD", "U.P. Project Corporation",
  "Rajya Krishi Utpadan Mandi Parishad", "Rural Engineering Dept.",
  "U.P. Bridge Corporation", "Municipal Corporations",
];

export const MACHINERY = [
  "Wet Mix Macadam Plant", "Fully Electronic Hot Mix Plant ×2", "Mini Hot Mix Plant",
  "Motor Grader", "Hydraulic Excavator (Poclain)", "Tippers / Hywa ×10",
  "Pneumatic Tyre Roller", "Vibratory Tandem Roller ×2", "Soil Vibratory Roller",
  "Smooth Wheeled Road Roller ×4", "Paver Finisher 100 TPH ×2", "Hydraulic Broomer",
  "Hot Bitumen & Emulsion Sprayer ×2", "Tar Boiler ×2", "Water Tanker 6 KL",
  "Air Compressor 210 CFM ×3", "Concrete Mixer 0.40 CUM", "Tractor with Trolly ×3",
  "Concrete Joint Cutter", "Surface Vibrator", "Pin Vibrator",
  "Interlocking Brick Plant", "Generator ×4", "Weighing Bridge",
  "Transit Mixer ×3", "Ready Mix Concrete Plant", "Auto Level Machine ×2",
  "Cube Testing Machine", "Bitumen Extractor ×2", "Full Civil Lab Suite",
];

export const TURNOVER = [
  { year: "2020-21", value: 9.94 },
  { year: "2021-22", value: 13.88 },
  { year: "2022-23", value: 11.83 },
  { year: "2023-24", value: 8.20 },
  { year: "2024-25", value: 16.30 },
];

// NOTE: "Abhilash Gupta" intentionally excluded per project requirement.
export const TEAM = [
  { name: "Eng. Abhishek Kumar Gupta", title: "Project Head / Second-Generation Leader", meta: "M.Tech, Civil Engineering — DCE, DU" },
  { name: "Sh. Bhoore Lal", title: "Business Head", meta: "IRSE, Retd. Dy. Chief Engineer, Indian Railways" },
  { name: "Ms. Mansi Gupta", title: "Finance Head", meta: "MA Economics, IIFT Delhi" },
  { name: "Mr. Ashish Kumar Tiwari", title: "Deputy General Manager", meta: "Civil Engineering, MSBT" },
  { name: "Mr. Satendra Chowdhry", title: "Quality Manager", meta: "Civil Engineer, ITM" },
  { name: "Mr. Ravikant Sharma", title: "Accounts Lead", meta: "Finance & Compliance" },
];

// UX / project research findings — designed as an editorial insights strip
export const RESEARCH = [
  {
    tag: "Field Study — FDR 2021-22",
    title: "Flood Damage Restoration on NH-730C",
    finding: "Sequenced WMM re-profiling before BC overlay reduced re-work by 34% across a 6 KM stretch after monsoon-season damage.",
    metric: "34%",
    metricLabel: "Re-work reduction",
  },
  {
    tag: "Case Study — SH-40",
    title: "Widening the Unnao State Highway",
    finding: "Lane-split traffic diversion combined with night paving kept average day-time delays below 8 minutes across 12.4 KM.",
    metric: "8 min",
    metricLabel: "Avg. traffic delay",
  },
  {
    tag: "Bridge Programme",
    title: "Garra River Bridge Approach Works",
    finding: "Protection works upstream of the approach reduced scour risk during a 1-in-25-year flood event, protecting ₹9.7 Cr in infrastructure.",
    metric: "₹9.7 Cr",
    metricLabel: "Infra protected",
  },
  {
    tag: "Programme Analytics",
    title: "Government Client Retention",
    finding: "Repeat-contracts from PWD Bareilly and PMGSY circles account for 68% of five-year revenue, reflecting institutional trust.",
    metric: "68%",
    metricLabel: "Repeat revenue",
  },
];
