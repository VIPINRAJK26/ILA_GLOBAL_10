export type LanguageCategory = 'German' | 'Spanish' | 'French' | 'English';

export type CourseField = 
  | 'IT & Software' 
  | 'Healthcare & Nursing' 
  | 'Engineering' 
  | 'Business & Management' 
  | 'General & Academic';

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Course {
  id: string;
  title: string;
  language: LanguageCategory;
  flag: string;
  field: CourseField;
  level: LanguageLevel;
  levelTag: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  hours: string;
  price: number;
  originalPrice: number;
  rating: number;
  studentsEnrolled: number;
  spotsRemaining: number;
  industryKeywords: string[];
  features: string[];
  batchDates: string[];
  targetAudience: string;
  cefrCertified: boolean;
}

export const COURSES_DATA: Course[] = [
  // --- GERMAN COURSES ---
  {
    id: 'de-it-a1a2',
    title: 'German for IT & Tech Beginners (A1-A2 Foundation)',
    language: 'German',
    flag: '🇩🇪',
    field: 'IT & Software',
    level: 'A1',
    levelTag: 'CEFR A1/A2 Fast-Track',
    shortDesc: 'Master foundational German tailored for software developers and tech emigrants heading to Berlin and Munich.',
    fullDesc: 'Specially structured for software engineers, QA specialists, and developers starting from zero. Learn everyday communication while integrating software vocabulary into your daily routine.',
    duration: '8 Weeks',
    hours: '80 Live Hours + 40 AI Hours',
    price: 199,
    originalPrice: 349,
    rating: 4.9,
    studentsEnrolled: 1420,
    spotsRemaining: 4,
    industryKeywords: [
      'das Programmieren (coding)',
      'der Fehler (bug)',
      'die Schnittstelle (API)',
      'das Projekt (project)',
      'die Besprechung (meeting)',
      'der Arbeitgeber (employer)'
    ],
    features: [
      'Native German instructors from Berlin & Frankfurt',
      'Daily 15-min Intelli Coach AI vocabulary drills',
      'German CV & LinkedIn profile translation',
      'Official Goethe-Zertifikat A1 exam simulator'
    ],
    batchDates: [
      'Nov 03, 2026 - Morning (09:00 CET)',
      'Nov 03, 2026 - Evening (18:30 CET)',
      'Nov 07, 2026 - Weekend Intensive'
    ],
    targetAudience: 'Software developers, web devs, and tech interns relocating to Germany.',
    cefrCertified: true
  },
  {
    id: 'de-it-b1',
    title: 'German for IT Professionals & Cloud Engineers (B1 Track)',
    language: 'German',
    flag: '🇩🇪',
    field: 'IT & Software',
    level: 'B1',
    levelTag: 'CEFR B1 Professional',
    shortDesc: 'Workplace German for standups, Git workflows, sprint retrospectives, and cross-functional team discussions.',
    fullDesc: 'Designed to bridge the gap between intermediate German and real-life IT team environments. Speak confidently during Agile ceremonies, code review discussions, and client demonstrations.',
    duration: '10 Weeks',
    hours: '100 Live Hours + 50 AI Hours',
    price: 299,
    originalPrice: 499,
    rating: 4.95,
    studentsEnrolled: 2180,
    spotsRemaining: 3,
    industryKeywords: [
      'die Sprint-Planung (sprint planning)',
      'das Quellcode-Review (code review)',
      'die Fehlerbehebung (debugging)',
      'die Bereitstellung (deployment / CI-CD)',
      'die Datenbankmigration (DB migration)',
      'die Anforderung (requirement)'
    ],
    features: [
      'Simulated German Tech Standups & Sprint Planning',
      'Specialized IT Glossary with 800+ tech terms',
      'telc Deutsch B1 / Goethe B1 exam drills',
      'Chancenkarte (Opportunity Card) language points guarantee'
    ],
    batchDates: [
      'Nov 05, 2026 - Evening (19:00 CET)',
      'Nov 08, 2026 - Weekend Track (10:00 CET)'
    ],
    targetAudience: 'Cloud engineers, DevOps, and Full-Stack Developers aiming for German employment.',
    cefrCertified: true
  },
  {
    id: 'de-it-b2',
    title: 'German B2 for Senior Tech Leads & Software Architects',
    language: 'German',
    flag: '🇩🇪',
    field: 'IT & Software',
    level: 'B2',
    levelTag: 'CEFR B2 Advanced Tech',
    shortDesc: 'Advanced technical discourse, German software architecture reviews, and stakeholder presentations.',
    fullDesc: 'Unlock high-salary €80k+ German IT roles that require B2 business fluency. Focus on architectural decision records (ADRs), security compliance (DSGVO/GDPR), and executive engineering presentations.',
    duration: '12 Weeks',
    hours: '120 Live Hours + 60 AI Hours',
    price: 399,
    originalPrice: 599,
    rating: 5.0,
    studentsEnrolled: 980,
    spotsRemaining: 2,
    industryKeywords: [
      'die Softwarearchitektur (software architecture)',
      'die Datensicherheit & DSGVO (data security & GDPR)',
      'die Leistungsoptimierung (performance tuning)',
      'der Stakeholder-Austausch (stakeholder alignment)',
      'das Skalierungskonzept (scalability framework)',
      'die Machbarkeitsstudie (feasibility study)'
    ],
    features: [
      'Direct interview prep for SAP, Siemens, and Zalando',
      'DSGVO & German IT compliance vocabulary module',
      'telc B2 exam voucher discount included',
      '1-on-1 mock technical interview in German'
    ],
    batchDates: [
      'Nov 10, 2026 - Evening (18:30 CET)',
      'Nov 14, 2026 - Weekend Track (09:00 CET)'
    ],
    targetAudience: 'Senior Engineers, Tech Leads, and Data Architects looking for permanent Blue Card careers.',
    cefrCertified: true
  },
  {
    id: 'de-med-b2',
    title: 'Medical German for Doctors & Nurses (B2/C1 Fachsprache)',
    language: 'German',
    flag: '🇩🇪',
    field: 'Healthcare & Nursing',
    level: 'B2',
    levelTag: 'B2/C1 Medizin & Pflege',
    shortDesc: 'Specialized clinical German for Approbation, FSP medical exam, patient history taking, and hospital communication.',
    fullDesc: 'Mandatory pathway for foreign medical graduates and nurses seeking license recognition (Approbation) in Germany. Covers medical terminology, doctor-to-doctor briefings, and patient empathy.',
    duration: '14 Weeks',
    hours: '140 Live Hours + Clinical Simulations',
    price: 449,
    originalPrice: 699,
    rating: 4.96,
    studentsEnrolled: 1850,
    spotsRemaining: 5,
    industryKeywords: [
      'die Anamneseerhebung (patient history taking)',
      'die Schichtübergabe (shift handover)',
      'der Arztbrief (discharge summary)',
      'die Medikationsverordnung (prescription)',
      'die körperliche Untersuchung (physical examination)',
      'die Einverständniserklärung (informed consent)'
    ],
    features: [
      'Taught by licensed German physicians (Ärzte)',
      'Preparation for Fachsprachenprüfung (FSP) & KP',
      'Realistic mock patient cases with Intelli Coach AI',
      'Hospital placement assistance across NRW and Bavaria'
    ],
    batchDates: [
      'Nov 02, 2026 - Morning (08:30 CET)',
      'Nov 06, 2026 - Evening (18:00 CET)'
    ],
    targetAudience: 'International doctors, dentists, and certified nursing professionals.',
    cefrCertified: true
  },
  {
    id: 'de-eng-b1',
    title: 'Technical German for Mechanical & Automotive Engineers (B1/B2)',
    language: 'German',
    flag: '🇩🇪',
    field: 'Engineering',
    level: 'B1',
    levelTag: 'CEFR B1/B2 Ingenieurwesen',
    shortDesc: 'German engineering terminology, DIN standards, CAD documentation, and factory floor communication.',
    fullDesc: 'Tailored for automotive, mechanical, and electrical engineers targeting careers with BMW, Bosch, Porsche, and Mittelstand industrial champions.',
    duration: '10 Weeks',
    hours: '100 Live Hours + 40 AI Hours',
    price: 329,
    originalPrice: 499,
    rating: 4.88,
    studentsEnrolled: 820,
    spotsRemaining: 6,
    industryKeywords: [
      'die Konstruktionszeichnung (CAD drawing)',
      'die DIN-Normen (DIN industrial standards)',
      'die Fertigungsstraße (production line)',
      'die Qualitätskontrolle (quality assurance)',
      'die Werkstoffprüfung (materials testing)',
      'das Drehmoment (torque / mechanical spec)'
    ],
    features: [
      'Automotive & robotics technical vocabulary masterclass',
      'Factory visit terminology & safety protocol German',
      'Mittelstand job application package'
    ],
    batchDates: [
      'Nov 08, 2026 - Evening (19:00 CET)',
      'Nov 15, 2026 - Weekend (10:00 CET)'
    ],
    targetAudience: 'Mechanical, mechatronics, and automotive engineers.',
    cefrCertified: true
  },
  {
    id: 'de-gen-a1c1',
    title: 'Complete German for University Admissions (A1 to C1)',
    language: 'German',
    flag: '🇩🇪',
    field: 'General & Academic',
    level: 'B2',
    levelTag: 'CEFR A1–C1 Academic',
    shortDesc: 'Zero to university-ready German. Complete preparation for TestDaF and DSH at tuition-free universities.',
    fullDesc: 'The gold standard for students wishing to study at German public universities tuition-free. Covers academic writing, seminar participation, and high-scoring TestDaF strategies.',
    duration: '24 Weeks (Modular)',
    hours: '240 Live Hours + Full AI Suite',
    price: 599,
    originalPrice: 999,
    rating: 4.97,
    studentsEnrolled: 3400,
    spotsRemaining: 8,
    industryKeywords: [
      'die Vorlesung (university lecture)',
      'die Immatrikulation (enrollment)',
      'die Seminararbeit (term paper)',
      'das Visumsgespräch (visa interview)',
      'die Wohnungsanmeldung (city registration)',
      'das Sperrkonto (blocked account)'
    ],
    features: [
      'TestDaF 4x4 & DSH-2 guarantee track',
      'Free TU Munich & RWTH Aachen application guidance',
      'German Student Visa mock consular interview'
    ],
    batchDates: [
      'Nov 01, 2026 - Full Cohort (09:00 CET)',
      'Nov 15, 2026 - Fast Track (18:00 CET)'
    ],
    targetAudience: 'Prospective undergraduate and postgraduate university students.',
    cefrCertified: true
  },

  // --- SPANISH COURSES ---
  {
    id: 'es-it-b1',
    title: 'Spanish for Tech & Digital Nomads (A2/B1 Track)',
    language: 'Spanish',
    flag: '🇪🇸',
    field: 'IT & Software',
    level: 'B1',
    levelTag: 'DELE B1 Tech',
    shortDesc: 'Spanish for remote developers, tech hubs in Madrid and Barcelona, and Latin American startup operations.',
    fullDesc: 'Tailored for tech professionals working remotely from Spain (Digital Nomad Visa) or joining booming tech ecosystems in Barcelona, Valencia, and Madrid.',
    duration: '8 Weeks',
    hours: '64 Live Hours + 30 AI Hours',
    price: 219,
    originalPrice: 349,
    rating: 4.91,
    studentsEnrolled: 640,
    spotsRemaining: 5,
    industryKeywords: [
      'el desarrollo ágil (agile development)',
      'el despliegue en la nube (cloud deployment)',
      'la base de datos (database)',
      'la resolución de incidencias (incident triage)',
      'la llamada diaria (daily standup)',
      'el programador (programmer)'
    ],
    features: [
      'Spanish Digital Nomad Visa paperwork terminology',
      'Interactive conversational drills with Madrid instructors',
      'DELE B1 examination simulator'
    ],
    batchDates: [
      'Nov 04, 2026 - Evening (18:30 CET)',
      'Nov 07, 2026 - Weekend (11:00 CET)'
    ],
    targetAudience: 'Software devs, product managers, and remote workers moving to Spain.',
    cefrCertified: true
  },
  {
    id: 'es-biz-b2',
    title: 'Business Spanish for Global Commerce (B2/C1 Track)',
    language: 'Spanish',
    flag: '🇪🇸',
    field: 'Business & Management',
    level: 'B2',
    levelTag: 'DELE B2 Negocios',
    shortDesc: 'Corporate Spanish for LATAM market expansion, sales pitches, and legal contracts.',
    fullDesc: 'Master commercial negotiations, formal corporate correspondences, and cross-border trade discussions in Spanish.',
    duration: '10 Weeks',
    hours: '80 Live Hours + 40 AI Hours',
    price: 289,
    originalPrice: 429,
    rating: 4.89,
    studentsEnrolled: 510,
    spotsRemaining: 4,
    industryKeywords: [
      'la negociación comercial (business negotiation)',
      'el contrato de compraventa (sales agreement)',
      'el flujo de caja (cash flow)',
      'el análisis de mercado (market research)',
      'la propuesta de valor (value proposition)',
      'el arancel aduanero (customs tariff)'
    ],
    features: [
      'Case studies from Madrid, Mexico City & Bogotá',
      'SIELE / DELE commercial certificate support',
      'Executive presentation rehearsals'
    ],
    batchDates: [
      'Nov 06, 2026 - Evening (19:00 CET)',
      'Nov 12, 2026 - Weekend (10:00 CET)'
    ],
    targetAudience: 'Consultants, traders, and international business managers.',
    cefrCertified: true
  },

  // --- FRENCH COURSES ---
  {
    id: 'fr-gen-b2',
    title: 'French for Canada Express Entry & Quebec PR (TEF/TCF Track)',
    language: 'French',
    flag: '🇫🇷',
    field: 'General & Academic',
    level: 'B2',
    levelTag: 'TEF / TCF Canada NCLC 7',
    shortDesc: 'Target 50+ bonus CRS immigration points for Canada Express Entry and Quebec skilled worker tracks.',
    fullDesc: 'High-intensity coaching designed specifically to hit NCLC 7 (CLB 7) in French to maximize Canadian immigration point scores. Coached by certified Canadian French linguists.',
    duration: '14 Weeks',
    hours: '120 Live Hours + 60 AI Hours',
    price: 379,
    originalPrice: 599,
    rating: 4.98,
    studentsEnrolled: 2450,
    spotsRemaining: 3,
    industryKeywords: [
      'l’immigration francophone (francophone immigration)',
      'l’expression orale (oral communication)',
      'la compréhension écrite (reading comprehension)',
      'le marché du travail (job market)',
      'les démarches administratives (administrative steps)',
      'la résidence permanente (permanent residency)'
    ],
    features: [
      'Guaranteed blueprint for +50 Canadian CRS points',
      'Weekly TEF / TCF Canada simulated exams',
      'Quebec immigration interview preparation'
    ],
    batchDates: [
      'Nov 02, 2026 - Morning (09:00 EST / 15:00 CET)',
      'Nov 04, 2026 - Evening (19:30 EST)'
    ],
    targetAudience: 'Immigrants and students aiming for Canadian Permanent Residency (PR).',
    cefrCertified: true
  },

  // --- ENGLISH COURSES ---
  {
    id: 'en-ielts-acad',
    title: 'IELTS Academic Masterclass (Band 7.5+ Guaranteed Track)',
    language: 'English',
    flag: '🇬🇧',
    field: 'General & Academic',
    level: 'C1',
    levelTag: 'IELTS Band 7.5 – 8.5',
    shortDesc: 'Score 7.5+ in Academic Writing, Speaking, Reading, and Listening for top UK, US, and German universities.',
    fullDesc: 'Exclusively taught by former British Council certified examiners. Systematic breakdown of Task 2 academic essays, complex graphical data reporting, and spontaneous conversational fluency.',
    duration: '6 Weeks',
    hours: '48 Live Hours + Unlimited AI Writing Audits',
    price: 179,
    originalPrice: 299,
    rating: 4.94,
    studentsEnrolled: 4200,
    spotsRemaining: 7,
    industryKeywords: [
      'academic lexicon (scholarly vocabulary)',
      'cohesion and coherence (essay flow)',
      'lexical resource (vocabulary diversity)',
      'fluency and pronunciation (spoken cadence)',
      'critical data synthesis (task 1 analysis)',
      'substantive argumentation (persuasive essay)'
    ],
    features: [
      'AI Instant Essay Grader with band breakdown',
      '10 Full-length mock computer-delivered exams',
      '1-on-1 Speaking mock drills with live examiner feedback'
    ],
    batchDates: [
      'Nov 01, 2026 - Morning & Evening Slots',
      'Nov 07, 2026 - Weekend Intensive Cohort'
    ],
    targetAudience: 'Students and professionals applying for global university visas.',
    cefrCertified: true
  }
];
