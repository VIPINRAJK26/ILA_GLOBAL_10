import type { BackendLanguageCourse } from '../types/types';

export const DEFAULT_LANGUAGE_COURSES: BackendLanguageCourse[] = [
  {
    id: "german",
    slug: "german",
    name: "German",
    code: "de",
    flag: "🇩🇪",
    description: "German language tracks for professionals, emigrants, and students.",
    is_active: true,
    specializations: [
      {
        id: "it-software",
        name: "IT & Software",
        description: "Software engineering, cloud architectures, and agile communication.",
        levels: [
          {
            id: "de-it-a1a2",
            level: "A1",
            level_tag: "CEFR A1/A2 Fast-Track",
            title: "German - IT & Software - A1",
            short_desc: "Master foundational German tailored for software developers and tech emigrants heading to Berlin and Munich.",
            full_desc: "Specially structured for software engineers, QA specialists, and developers starting from zero.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "199.00",
            original_price: "349.00",
            rating: "4.90",
            students_enrolled: 1420,
            spots_remaining: 4,
            industry_keywords: ["das Programmieren", "der Fehler", "die Schnittstelle", "das Projekt"],
            features: ["Native German instructors", "Intelli Coach AI drills", "German CV translation", "Goethe exam simulator"],
            batch_dates: ["Nov 03, 2026 - Morning", "Nov 03, 2026 - Evening", "Nov 07, 2026 - Weekend"],
            target_audience: "Software developers relocating to Germany.",
            cefr_certified: true
          },
          {
            id: "de-it-b1",
            level: "B1",
            level_tag: "CEFR B1 Professional",
            title: "German - IT & Software - B1",
            short_desc: "Workplace German for standups, Git workflows, sprint retrospectives, and cross-functional team discussions.",
            full_desc: "Designed to bridge the gap between intermediate German and real-life IT team environments.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 50 AI Hours",
            price: "299.00",
            original_price: "499.00",
            rating: "4.95",
            students_enrolled: 2180,
            spots_remaining: 3,
            industry_keywords: ["die Sprint-Planung", "das Quellcode-Review", "die Bereitstellung"],
            features: ["Sprint simulations", "Cloud & DevOps terminology", "Mock technical interviews"],
            batch_dates: ["Nov 10, 2026 - Evening", "Nov 14, 2026 - Weekend Intensive"],
            target_audience: "Cloud engineers, Tech Leads, and QA specialists.",
            cefr_certified: true
          },
          {
            id: "de-it-b2",
            level: "B2",
            level_tag: "CEFR B2 Advanced Tech",
            title: "German - IT & Software - B2",
            short_desc: "Advanced technical discourse, German software architecture reviews, and stakeholder presentations.",
            full_desc: "Unlock high-salary €80k+ German IT roles that require B2 business fluency.",
            duration: "12 Weeks",
            hours: "120 Live Hours + 60 AI Hours",
            price: "399.00",
            original_price: "599.00",
            rating: "5.00",
            students_enrolled: 980,
            spots_remaining: 2,
            industry_keywords: ["die Softwarearchitektur", "die Datensicherheit & DSGVO", "die Leistungsoptimierung"],
            features: ["Direct interview prep for SAP, Siemens", "DSGVO & German IT compliance", "telc B2 exam voucher"],
            batch_dates: ["Nov 10, 2026 - Evening", "Nov 14, 2026 - Weekend Track"],
            target_audience: "Senior Engineers, Tech Leads, and Data Architects.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "nursing",
        name: "Nursing",
        description: "Clinical communication, patient care, medical records, and nursing licensing.",
        levels: [
          {
            id: "de-nurse-b1",
            level: "B1",
            level_tag: "B1 Pflegefachkraft",
            title: "German - Nursing - B1",
            short_desc: "Foundational German for nursing homes, clinics, and hospital care assistants.",
            full_desc: "Covers vital signs, medical records, handovers, and patient dignity dialogues.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "289.00",
            original_price: "449.00",
            rating: "4.92",
            students_enrolled: 1100,
            spots_remaining: 5,
            industry_keywords: ["die Pflegekraft", "die Blutdruckmessung", "die Übergabe", "der Patient"],
            features: ["Clinical handover practice", "Defizitbescheid exam support", "Direct hospital placement"],
            batch_dates: ["Nov 04, 2026 - Morning", "Nov 08, 2026 - Evening"],
            target_audience: "Nurses and care workers immigrating via fast-track skilled immigration.",
            cefr_certified: true
          },
          {
            id: "de-nurse-b2",
            level: "B2",
            level_tag: "B2 telc Deutsch Pflege",
            title: "German - Nursing - B2",
            short_desc: "Official telc Deutsch B1-B2 Pflege qualification for nursing license recognition (Anerkennung).",
            full_desc: "Comprehensive nursing terminology, pharmacology, doctor orders, and regulatory compliance.",
            duration: "12 Weeks",
            hours: "120 Live Hours + 50 AI Hours",
            price: "389.00",
            original_price: "599.00",
            rating: "4.96",
            students_enrolled: 850,
            spots_remaining: 3,
            industry_keywords: ["die Wundversorgung", "die Medikamentengabe", "die Dokumentation", "der Notfall"],
            features: ["telc B1-B2 Pflege simulation", "Hospital interview prep", "Anerkennung guidance"],
            batch_dates: ["Nov 12, 2026 - Evening", "Nov 16, 2026 - Weekend Track"],
            target_audience: "International registered nurses seeking German license recognition.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "engineering",
        name: "Engineering",
        description: "Mechanical, electrical, civil, and automotive industrial technical communication.",
        levels: [
          {
            id: "de-eng-b1",
            level: "B1",
            level_tag: "CEFR B1 Industrial Engineering",
            title: "German - Engineering - B1",
            short_desc: "Shop floor protocols, safety briefings, CAD drawing terminology, and factory operations.",
            full_desc: "Technical German for mechanical, electrical, and industrial engineers working in German Mittelstand firms.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "319.00",
            original_price: "489.00",
            rating: "4.91",
            students_enrolled: 740,
            spots_remaining: 4,
            industry_keywords: ["die Konstruktion", "die Fertigung", "das Schaltbild", "die Qualitätskontrolle"],
            features: ["DIN standards terminology", "Factory walkthroughs", "Technical documentation writing"],
            batch_dates: ["Nov 08, 2026 - Weekend Track", "Nov 11, 2026 - Evening"],
            target_audience: "Mechanical, automotive, and electrical engineers relocating to Germany.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general",
        name: "General",
        description: "Everyday fluency, conversation, and CEFR certification.",
        levels: [
          {
            id: "de-gen-a1",
            level: "A1",
            level_tag: "Goethe-Zertifikat A1 Start Deutsch",
            title: "German - General - A1",
            short_desc: "Beginner German for family reunification, travel, and everyday social conversation.",
            full_desc: "Learn from zero: greetings, shopping, housing, appointments, and simple workplace dialogues.",
            duration: "6 Weeks",
            hours: "60 Live Hours + 30 AI Hours",
            price: "149.00",
            original_price: "249.00",
            rating: "4.89",
            students_enrolled: 3200,
            spots_remaining: 8,
            industry_keywords: ["der Alltag", "die Vorstellung", "der Einkauf", "die Wohnung"],
            features: ["Official Goethe A1 simulator", "Native speaker breakout rooms", "Grammar cheat sheets"],
            batch_dates: ["Nov 02, 2026 - Morning", "Nov 02, 2026 - Evening"],
            target_audience: "Complete beginners and spouse visa applicants.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general-academic",
        name: "General & Academic",
        description: "Academic preparation, university entrance, and general fluency.",
        levels: [
          {
            id: "de-acad-b2",
            level: "B2",
            level_tag: "TestDaF / DSH University Prep B2",
            title: "German - General & Academic - B2",
            short_desc: "Academic writing, lecture comprehension, and seminar presentation skills for university applicants.",
            full_desc: "Prepares students for Studienkolleg entrance, TestDaF, and direct admissions into German public universities.",
            duration: "12 Weeks",
            hours: "120 Live Hours + 60 AI Hours",
            price: "359.00",
            original_price: "549.00",
            rating: "4.94",
            students_enrolled: 1250,
            spots_remaining: 3,
            industry_keywords: ["die Vorlesung", "die Seminararbeit", "die Immatrikulation", "die Quellenangabe"],
            features: ["Academic essay grading", "TestDaF mock exams", "Uni-Assist guidance"],
            batch_dates: ["Nov 09, 2026 - Morning", "Nov 13, 2026 - Evening"],
            target_audience: "Students applying to German bachelor and master degree programs.",
            cefr_certified: true
          }
        ]
      }
    ]
  },
  {
    id: "spanish",
    slug: "spanish",
    name: "Spanish",
    code: "es",
    flag: "🇪🇸",
    description: "European and Latin American Spanish language courses.",
    is_active: true,
    specializations: [
      {
        id: "it-software",
        name: "IT & Software",
        description: "Software development, cloud architecture, sprint retrospectives, and technical communication.",
        levels: [
          {
            id: "es-it-a1",
            level: "A1",
            level_tag: "DELE A1 Tech Foundation",
            title: "Spanish - IT & Software - A1",
            short_desc: "Spanish language fundamentals for remote software engineers collaborating with LATAM teams.",
            full_desc: "Covers daily standup vocabulary, bug reporting, code reviews, and remote workplace Spanish.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "189.00",
            original_price: "299.00",
            rating: "4.88",
            students_enrolled: 780,
            spots_remaining: 6,
            industry_keywords: ["el repositorio", "el despliegue", "la rama", "la base de datos"],
            features: ["Native Latin American tutors", "AI code review voice drills", "Slack / Jira Spanish templates"],
            batch_dates: ["Nov 05, 2026 - Morning", "Nov 09, 2026 - Evening"],
            target_audience: "Remote developers working with teams in Spain, Mexico, Colombia, and Argentina.",
            cefr_certified: true
          },
          {
            id: "es-it-b1",
            level: "B1",
            level_tag: "CEFR B1 Agile & Sprint Collaboration",
            title: "Spanish - IT & Software - B1",
            short_desc: "Active participation in technical sprint planning, architecture diagrams, and client feature demos.",
            full_desc: "Deep dive into Spanish agile terminology, technical incident management, and cross-functional team debates.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 50 AI Hours",
            price: "269.00",
            original_price: "429.00",
            rating: "4.92",
            students_enrolled: 950,
            spots_remaining: 5,
            industry_keywords: ["la arquitectura de software", "el entorno de pruebas", "la escalabilidad", "el microservicio"],
            features: ["Agile sprint simulations", "Client demo practice", "Technical interview labs"],
            batch_dates: ["Nov 12, 2026 - Evening", "Nov 16, 2026 - Weekend"],
            target_audience: "Full stack developers, QA leads, and Product Managers.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "healthcare",
        name: "Healthcare",
        description: "Medical consultations, pharmacology, doctor-patient interaction, and clinical case studies.",
        levels: [
          {
            id: "es-health-b1",
            level: "B1",
            level_tag: "Clinical Spanish for Healthcare Staff B1",
            title: "Spanish - Healthcare - B1",
            short_desc: "Patient intake, vital symptom assessment, triage documentation, and Spanish medical bedside manner.",
            full_desc: "Designed for doctors, nurses, and healthcare volunteers working in Spanish-speaking regions and bilingual clinics.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "279.00",
            original_price: "449.00",
            rating: "4.94",
            students_enrolled: 640,
            spots_remaining: 4,
            industry_keywords: ["la historia clínica", "el diagnóstico", "la receta médica", "la presión arterial"],
            features: ["Medical roleplay scenarios", "Clinical triage vocabulary", "DELE medical module prep"],
            batch_dates: ["Nov 10, 2026 - Morning", "Nov 14, 2026 - Weekend"],
            target_audience: "Physicians, medical residents, and clinic coordinators.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general",
        name: "General",
        description: "Everyday fluency, conversation, and CEFR certification.",
        levels: [
          {
            id: "es-gen-a1",
            level: "A1",
            level_tag: "DELE A1 Conversational Foundation",
            title: "Spanish - General - A1",
            short_desc: "Learn Spanish from scratch: greetings, social conversations, travel logistics, and core grammar.",
            full_desc: "Fun and interactive zero-to-conversational course with native Spanish speakers from Madrid and Bogota.",
            duration: "6 Weeks",
            hours: "60 Live Hours + 30 AI Hours",
            price: "139.00",
            original_price: "229.00",
            rating: "4.90",
            students_enrolled: 2800,
            spots_remaining: 7,
            industry_keywords: ["la conversación cotidiana", "el saludo", "el transporte", "el alojamiento"],
            features: ["Native Madrid & Bogota instructors", "Intelli Coach dialogue bot", "DELE A1 exam prep"],
            batch_dates: ["Nov 03, 2026 - Morning", "Nov 03, 2026 - Evening"],
            target_audience: "Beginners, holiday travelers, and expats relocating to Spain/Latin America.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "business",
        name: "Business",
        description: "Corporate communication, negotiations, contracts, and presentations.",
        levels: [
          {
            id: "es-biz-b2",
            level: "B2",
            level_tag: "CEFR B2 Executive Business Spanish",
            title: "Spanish - Business - B2",
            short_desc: "Cross-border Latin American contract negotiations, venture discussions, and commercial correspondence.",
            full_desc: "High-impact Spanish for business development managers, founders, and regional executives.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "299.00",
            original_price: "479.00",
            rating: "4.95",
            students_enrolled: 520,
            spots_remaining: 3,
            industry_keywords: ["la negociación", "el contrato mercantil", "la propuesta de valor", "el rendimiento"],
            features: ["Case studies from IBEX 35 firms", "Executive presentation coaching", "Madrid Chamber of Commerce certification"],
            batch_dates: ["Nov 15, 2026 - Evening", "Nov 19, 2026 - Weekend"],
            target_audience: "Corporate executives, bankers, and account managers.",
            cefr_certified: true
          }
        ]
      }
    ]
  },
  {
    id: "dutch",
    slug: "dutch",
    name: "Dutch",
    code: "nl",
    flag: "🇳🇱",
    description: "Dutch language tracks for Netherlands inburgering and tech careers.",
    is_active: true,
    specializations: [
      {
        id: "it-software",
        name: "IT & Software",
        description: "Dutch workplace communication for Amsterdam and Eindhoven tech hubs.",
        levels: [
          {
            id: "nl-it-b1",
            level: "B1",
            level_tag: "CEFR B1 Dutch Tech Workspace",
            title: "Dutch - IT & Software - B1",
            short_desc: "Daily standup communication, stakeholder alignment, and office Dutch for Randstad tech professionals.",
            full_desc: "Accelerate your integration into Dutch engineering culture, direct feedback norms, and Agile retrospectives.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Drills",
            price: "279.00",
            original_price: "449.00",
            rating: "4.91",
            students_enrolled: 430,
            spots_remaining: 4,
            industry_keywords: ["het ontwikkelteam", "de codebeoordeling", "de implementatie", "de storing"],
            features: ["Amsterdam tech company roleplays", "Dutch cultural communication coaching", "High skilled migrant visa bonus"],
            batch_dates: ["Nov 06, 2026 - Evening", "Nov 10, 2026 - Weekend"],
            target_audience: "Software developers, DevOps, and Product Managers working in the Netherlands.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general",
        name: "General",
        description: "Pass the Dutch Inburgering civic integration exam with high marks in speaking and listening.",
        levels: [
          {
            id: "nl-gen-a2",
            level: "A2",
            level_tag: "Inburgeringsexamen Civic Integration A2",
            title: "Dutch - General - A2",
            short_desc: "Pass the Dutch Inburgering civic integration exam with high marks in speaking and listening.",
            full_desc: "Comprehensive exam preparation covering reading, listening, writing, and speaking for permanent residency.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Drills",
            price: "189.00",
            original_price: "299.00",
            rating: "4.93",
            students_enrolled: 820,
            spots_remaining: 6,
            industry_keywords: ["het inburgeringsexamen", "de spreekvaardigheid", "de luistertoets"],
            features: ["DUO official mock exams", "Speaking interview practice", "Civic exam certificate prep"],
            batch_dates: ["Nov 04, 2026 - Morning", "Nov 08, 2026 - Evening"],
            target_audience: "Expats and partners taking the Netherlands civic integration exam.",
            cefr_certified: true
          }
        ]
      }
    ]
  },
  {
    id: "english",
    slug: "english",
    name: "English",
    code: "en",
    flag: "🇬🇧",
    description: "Professional IELTS, TOEFL, and corporate business English.",
    is_active: true,
    specializations: [
      {
        id: "it-software",
        name: "IT & Software",
        description: "Global tech communication, Silicon Valley & London engineering standups.",
        levels: [
          {
            id: "en-it-b2",
            level: "B2",
            level_tag: "CEFR B2 Professional Tech English",
            title: "English - IT & Software - B2",
            short_desc: "Lead cross-functional sprints, write clear technical specs, and ace US/UK tech interviews.",
            full_desc: "Targeted for developers looking to speak with precision during architectural reviews and client demos.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "199.00",
            original_price: "329.00",
            rating: "4.96",
            students_enrolled: 3100,
            spots_remaining: 5,
            industry_keywords: ["system design", "scalability", "technical tradeoff", "incident postmortem"],
            features: ["Mock FAANG style interviews", "PR / Code review writing labs", "Intelli Coach accent clarity module"],
            batch_dates: ["Nov 03, 2026 - Morning", "Nov 03, 2026 - Evening"],
            target_audience: "Developers, Data Engineers, and Tech Leads working with international clients.",
            cefr_certified: true
          },
          {
            id: "en-it-c1",
            level: "C1",
            level_tag: "CEFR C1 Executive Engineering English",
            title: "English - IT & Software - C1",
            short_desc: "Executive communication for VP of Engineering, CTO, and Principal Architect roles.",
            full_desc: "Master nuanced negotiation, board presentations, and international venture communication.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 50 AI Hours",
            price: "329.00",
            original_price: "519.00",
            rating: "4.98",
            students_enrolled: 1400,
            spots_remaining: 3,
            industry_keywords: ["executive alignment", "technical roadmap", "regulatory compliance", "board governance"],
            features: ["Executive speech coaching", "Keynote presentation lab", "Oxford Cambridge faculty mentors"],
            batch_dates: ["Nov 09, 2026 - Evening", "Nov 14, 2026 - Weekend Track"],
            target_audience: "Senior Tech Leaders, Consultants, and Engineering Managers.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general-academic",
        name: "General & Academic",
        description: "Official IELTS Academic 7.5+ and TOEFL iBT preparation.",
        levels: [
          {
            id: "en-ielts-b2",
            level: "B2",
            level_tag: "IELTS Band 7.0–7.5 Intensive",
            title: "English - General & Academic - B2",
            short_desc: "Targeted preparation for UK, Canada, Australia, and European university visa thresholds.",
            full_desc: "Intensive training on Academic Task 1 & 2 writing, listening trap detection, and speaking fluency.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "229.00",
            original_price: "379.00",
            rating: "4.95",
            students_enrolled: 4200,
            spots_remaining: 8,
            industry_keywords: ["academic writing task 2", "cohesion and coherence", "lexical resource", "fluency and pronunciation"],
            features: ["Weekly official British Council mock tests", "1-on-1 essay feedback", "Speaking test simulator"],
            batch_dates: ["Nov 02, 2026 - Morning", "Nov 02, 2026 - Evening"],
            target_audience: "Students and skilled migrants requiring IELTS Band 7+.",
            cefr_certified: true
          },
          {
            id: "en-ielts-c1",
            level: "C1",
            level_tag: "IELTS Band 8.0+ Mastery & Cambridge C1",
            title: "English - General & Academic - C1",
            short_desc: "Near-native academic mastery for scholarship applicants, medical boards, and legal studies.",
            full_desc: "Advanced rhetoric, complex syntax, academic debate, and Band 8.5+ writing strategies.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 50 AI Hours",
            price: "329.00",
            original_price: "529.00",
            rating: "4.97",
            students_enrolled: 1800,
            spots_remaining: 3,
            industry_keywords: ["critical analysis", "rhetorical devices", "academic dissertation", "nuanced argument"],
            features: ["Band 8.5 expert examiners", "Personalized diagnostic feedback", "University recommendation letter assist"],
            batch_dates: ["Nov 08, 2026 - Weekend Track", "Nov 12, 2026 - Evening"],
            target_audience: "Doctors, lawyers, and PhD candidates requiring C1/Band 8+.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "healthcare",
        name: "Healthcare",
        description: "Occupational English Test (OET) for doctors and nurses.",
        levels: [
          {
            id: "en-oet-b2",
            level: "B2",
            level_tag: "OET Grade B (350+) Medical Preparation",
            title: "English - Healthcare - B2",
            short_desc: "Pass the OET for GMC / NMC UK registration, Australian AHPRA, and US healthcare licensing.",
            full_desc: "Specialized clinical consultations, medical referral letters, and patient empathy roleplays.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "349.00",
            original_price: "549.00",
            rating: "4.96",
            students_enrolled: 2300,
            spots_remaining: 4,
            industry_keywords: ["clinical referral letter", "patient discharge", "empathy markers", "medical anamnesis"],
            features: ["Official OET benchmarked examiners", "Doctor and nurse specific streams", "NMC/GMC registration guidance"],
            batch_dates: ["Nov 05, 2026 - Morning", "Nov 09, 2026 - Evening"],
            target_audience: "Doctors and Nurses seeking UK NHS and Australian hospital registration.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "business-management",
        name: "Business & Management",
        description: "Corporate presentations, executive negotiations, and cross-border leadership.",
        levels: [
          {
            id: "en-biz-b2",
            level: "B2",
            level_tag: "CEFR B2 Corporate Business English",
            title: "English - Business & Management - B2",
            short_desc: "High-stakes investor presentations, vendor negotiations, and clear corporate communications.",
            full_desc: "Conducted by former Fortune 500 business leaders with real-world case simulations.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "279.00",
            original_price: "439.00",
            rating: "4.92",
            students_enrolled: 1600,
            spots_remaining: 5,
            industry_keywords: ["executive summary", "margin optimization", "quarterly business review", "stakeholder consensus"],
            features: ["Harvard Business Review case studies", "Live boardroom roleplays", "LinkedIn corporate badge"],
            batch_dates: ["Nov 04, 2026 - Evening", "Nov 08, 2026 - Weekend"],
            target_audience: "Product managers, business analysts, and corporate leaders.",
            cefr_certified: true
          }
        ]
      }
    ]
  },
  {
    id: "french",
    slug: "french",
    name: "French",
    code: "fr",
    flag: "🇫🇷",
    description: "French language mastery for careers, Canadian immigration, and higher education.",
    is_active: true,
    specializations: [
      {
        id: "it-software",
        name: "IT & Software",
        description: "Paris tech ecosystem, remote engineering, and French agile teamwork.",
        levels: [
          {
            id: "fr-it-a1",
            level: "A1",
            level_tag: "DELF A1 French Tech Fundamentals",
            title: "French - IT & Software - A1",
            short_desc: "Foundational French for developers working in Paris Station F or French tech companies.",
            full_desc: "Everyday conversation combined with French software vocabulary and email etiquette.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 40 AI Hours",
            price: "199.00",
            original_price: "329.00",
            rating: "4.89",
            students_enrolled: 620,
            spots_remaining: 5,
            industry_keywords: ["le logiciel", "le bogue", "la livraison", "le serveur"],
            features: ["Native Parisian instructors", "AI pronunciation tutor", "French tech glossary"],
            batch_dates: ["Nov 04, 2026 - Morning", "Nov 07, 2026 - Evening"],
            target_audience: "Tech professionals relocating to France or Quebec.",
            cefr_certified: true
          },
          {
            id: "fr-it-b1",
            level: "B1",
            level_tag: "CEFR B1 French Tech Standups",
            title: "French - IT & Software - B1",
            short_desc: "Speak French with confidence during sprint retrospectives, client demos, and code reviews.",
            full_desc: "Technical meetings, incident management, and professional French workplace debates.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 40 AI Hours",
            price: "289.00",
            original_price: "459.00",
            rating: "4.93",
            students_enrolled: 710,
            spots_remaining: 4,
            industry_keywords: ["la planification de sprint", "la revue de code", "le déploiement continu", "la base de données"],
            features: ["Agile team simulations", "Tech interview practice", "Quebec French points assist"],
            batch_dates: ["Nov 11, 2026 - Evening", "Nov 15, 2026 - Weekend"],
            target_audience: "Mid-level developers and DevOps engineers.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "general-academic",
        name: "General & Academic",
        description: "TEF Canada and DELF B1-B2 exam preparation.",
        levels: [
          {
            id: "fr-tef-b1",
            level: "B1",
            level_tag: "TEF / TCF Canada Express Entry B1/B2",
            title: "French - General & Academic - B1",
            short_desc: "Maximize your Canadian Express Entry CRS points with targeted TEF Canada preparation.",
            full_desc: "Structured specifically for NCLC 7 (CLB 7) requirements in speaking, listening, reading, and writing.",
            duration: "10 Weeks",
            hours: "100 Live Hours + 50 AI Hours",
            price: "299.00",
            original_price: "479.00",
            rating: "4.95",
            students_enrolled: 1950,
            spots_remaining: 4,
            industry_keywords: ["expression orale section B", "compréhension écrite", "le fait divers", "le plaidoyer"],
            features: ["Official TEF Canada mock tests", "Oral exam simulations with native examiners", "CRS 50 points bonus strategy"],
            batch_dates: ["Nov 06, 2026 - Morning", "Nov 10, 2026 - Evening"],
            target_audience: "Canada Express Entry and PNP immigration applicants.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "healthcare-nursing",
        name: "Healthcare & Nursing",
        description: "French medical terminology for hospitals in France, Belgium, and Switzerland.",
        levels: [
          {
            id: "fr-health-b2",
            level: "B2",
            level_tag: "Le Français Médical B2",
            title: "French - Healthcare & Nursing - B2",
            short_desc: "Clinical communication, patient consultations, and French hospital protocol mastery.",
            full_desc: "Prepares doctors and nurses for licensing and hospital employment in Francophone Europe.",
            duration: "12 Weeks",
            hours: "120 Live Hours + 50 AI Hours",
            price: "379.00",
            original_price: "589.00",
            rating: "4.96",
            students_enrolled: 580,
            spots_remaining: 3,
            industry_keywords: ["l'anamnèse", "l'auscultation", "l'ordonnance", "le compte rendu"],
            features: ["Clinical case studies", "Parisian hospital doctor mentors", "Ordre des Médecins exam support"],
            batch_dates: ["Nov 12, 2026 - Evening", "Nov 16, 2026 - Weekend Track"],
            target_audience: "Doctors, dentists, and nurses relocating to France, Belgium, or Switzerland.",
            cefr_certified: true
          }
        ]
      },
      {
        id: "hospitality",
        name: "Hospitality",
        description: "Luxury hotel administration, culinary operations, and guest relations.",
        levels: [
          {
            id: "fr-hosp-b1",
            level: "B1",
            level_tag: "Français du Tourisme et de l'Hôtellerie B1",
            title: "French - Hospitality - B1",
            short_desc: "Guest conciergerie, luxury service etiquette, wine & gastronomy vocabulary.",
            full_desc: "Tailored for hospitality managers, chefs, and resort staff working in Monaco, Paris, and the Alps.",
            duration: "8 Weeks",
            hours: "80 Live Hours + 30 AI Hours",
            price: "249.00",
            original_price: "399.00",
            rating: "4.91",
            students_enrolled: 890,
            spots_remaining: 6,
            industry_keywords: ["la conciergerie", "l'œnologie", "le service en salle", "la réservation"],
            features: ["Luxury hospitality etiquette", "Gastronomy glossary", "Geneva & Paris hotel placement support"],
            batch_dates: ["Nov 07, 2026 - Morning", "Nov 11, 2026 - Evening"],
            target_audience: "Hospitality professionals, sommeliers, and tourism graduates.",
            cefr_certified: true
          }
        ]
      }
    ]
  }
];
