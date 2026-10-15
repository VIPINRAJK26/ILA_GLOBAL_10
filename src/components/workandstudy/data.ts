export interface IndiaProgrammeCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  compensationRange: string;
  duration: string;
  specialisations: string[];
  termsAndConditions: string[];
}

export interface AbroadOpportunity {
  id: string;
  title: string;
  description: string;
  earningRange?: string;
  location: string;
  opportunityType: string;
  eligibilityNotes: string;
}

export interface GermanProject {
  id: string;
  title: string;
  industry: string;
  description: string;
  pathwayLabel: string;
  careerDirection: string;
  keyTopics: string[];
  selectionCriteria: string;
}

export interface RewardIncentive {
  id: string;
  title: string;
  category: 'points' | 'gifts' | 'travel' | 'salary' | 'leadership' | 'subsidy';
  badge: string;
  description: string;
  eligibilityDetails: string;
  icon: string;
}

export interface CalculatorPlanConfig {
  advertisedStipend: string;
  courseDiscount: string;
  experienceDocs: string;
  rewardTier: string;
  additionalPerks: string;
}

// 1. Module One: Work & Study in India Data
export const INDIA_PROGRAMMES: IndiaProgrammeCategory[] = [
  {
    id: 'office-admin-accounts',
    name: 'Office Administration & Accounts',
    tagline: 'Modern operational, accounting, and billing workflows for corporate environments.',
    iconName: 'BuildingIcon',
    compensationRange: '₹15,000 – ₹25,000 / month',
    duration: '6 Months Practical Training',
    specialisations: [
      'General Office Administration',
      'AI-Assisted Accounting & Tally Prime',
      'Billing, Invoicing & GST Documentation',
      'Vendor & Operations Management',
      'HR and Administrative Operations',
    ],
    termsAndConditions: [
      'Stipend range is performance-linked and applies upon successful qualification into project-based assignments.',
      'Training duration is six months; corporate experience letters reflect the actual verified assignments and hours delivered.',
      'Candidate must maintain 85%+ attendance across scheduled training modules.',
    ],
  },
  {
    id: 'software-seo-ai',
    name: 'Software, SEO & Social AI',
    tagline: 'Technical full-stack, automation, and enterprise search growth tracks.',
    iconName: 'LaptopIcon',
    compensationRange: '₹18,000 – ₹35,000 / month',
    duration: '6 Months Practical Training',
    specialisations: [
      'Full-Stack Web Development (React & Python/Node.js)',
      'AI Engineering & Intelligent Automation',
      'Enterprise SEO & Organic Growth',
      'Social Media Advertising & Campaign Automation',
    ],
    termsAndConditions: [
      'Advertised compensation is dependent on project assignment tier, client requirements, and technical evaluation.',
      'Code reviews and git commits are tracked towards practical portfolio assessment.',
      'Completion of required capstone project is mandatory for corporate recommendation records.',
    ],
  },
  {
    id: 'import-export-logistics',
    name: 'Import, Export & Global Logistics',
    tagline: 'Cross-border supplier procurement, customs compliance, and freight coordination.',
    iconName: 'GlobeIcon',
    compensationRange: '₹16,000 – ₹28,000 / month',
    duration: '6 Months Practical Training',
    specialisations: [
      'European & Global Supplier Sourcing',
      'Customs Documentation & Cross-Border Compliance',
      'International Air & Sea Freight Logistics',
      'B2B Commercial Accounts & Invoicing',
    ],
    termsAndConditions: [
      'Live trade simulation and vendor communications conducted under certified logistics mentor guidance.',
      'Stipends are subject to partner assignment placement and client verification.',
      'Regulatory compliance certifications require passing the export documentation practical exam.',
    ],
  },
  {
    id: 'engineering-technical-services',
    name: 'Engineering & Technical Services',
    tagline: 'Green energy, smart mobility, and industrial diagnostics for technical professionals.',
    iconName: 'ShieldCheckIcon',
    compensationRange: '₹15,000 – ₹30,000 / month',
    duration: '6 Months Practical Training',
    specialisations: [
      'Solar Photovoltaic & Inverter Systems',
      'Electric Vehicle Diagnostics & Charging Systems',
      'Industrial HVAC & Automation Diagnostics',
      'Technical Safety Audits & Blueprint Review',
    ],
    termsAndConditions: [
      'Requires background in electrical, mechanical, or electronics diploma/degree.',
      'Safety equipment compliance and on-site workshop protocol adhere to ISO 45001 standards.',
      'Compensation varies based on project inspection hours and technical assessment clearance.',
    ],
  },
];

// 2. Module Two: Work & Study Abroad Data
export const ABROAD_OPPORTUNITIES: AbroadOpportunity[] = [
  {
    id: 'airport-pickup-transit',
    title: 'Airport Pickup & Transit Support',
    description: 'Help arriving international students navigate airport arrival gates, regional train connections, luggage coordination, and student accommodation handover.',
    earningRange: '€50 – €100 per arrival (Indicative advertised range)',
    location: 'Germany & Key EU Airport Hubs (Frankfurt, Munich, Berlin)',
    opportunityType: 'Per-Arrival Support Assignment',
    eligibilityNotes: 'Requires valid student visa, local transit familiarity, and orientation clearance.',
  },
  {
    id: 'student-services',
    title: 'Student Services & Settling-In Support',
    description: 'Assist newly arrived scholars with local registration guidance, neighborhood orientation, and authorized student housing coordination.',
    location: 'Munich, Berlin, Hamburg, Vienna',
    opportunityType: 'Campus / Community Assistant Assignment',
    eligibilityNotes: 'Subject to local agency selection and registered student status.',
  },
  {
    id: 'documentation-services',
    title: 'Documentation Services & Clerical Support',
    description: 'Provide administrative organisation, dossier preparation, and document sorting support within the strictly permitted scope of student assistant work.',
    location: 'Regional Study Hubs / Hybrid',
    opportunityType: 'Administrative Student Support',
    eligibilityNotes: 'Compliant with statutory student hour allocations and data privacy protocols.',
  },
  {
    id: 'it-part-time-roles',
    title: 'IT-Based Part-Time Roles',
    description: 'Explore eligible part-time student roles including front-end web maintenance, QA testing, technical support, and remote corporate digital tasks.',
    location: 'Germany / European Remote',
    opportunityType: 'Werkstudent / Part-Time Student Contract',
    eligibilityNotes: 'Requires verified coding competencies and alignment with student work permit rules.',
  },
  {
    id: 'marketing-part-time-roles',
    title: 'Marketing-Based Part-Time Roles',
    description: 'Participate in eligible marketing support roles involving social media scheduling, localized content research, SEO optimization, and campaign analytics.',
    location: 'Germany / Hybrid',
    opportunityType: 'Marketing Assistant / Flexible Project',
    eligibilityNotes: 'Requires working German or English fluency and portfolio submission.',
  },
];

// 3. Module Three: German Onboarding Projects Data
export const GERMAN_PROJECTS: GermanProject[] = [
  {
    id: 'solar-renewable-pilots',
    title: 'Solar & Renewable Technical Pilots',
    industry: 'Clean Energy & Automation',
    description: 'Practical training focusing on PV inverters, EV commercial chargers, grid safety protocols, and German DIN/VDE engineering technical standards.',
    pathwayLabel: 'India Preparation → Potential Opportunities in Germany',
    careerDirection: 'Renewable energy technician, PV systems designer, and field engineering roles.',
    keyTopics: ['PV Inverters', 'EV Chargers', 'Grid Safety', 'DIN/VDE Standards', 'Power Storage'],
    selectionCriteria: 'Foundational degree/diploma in Electrical, Electronics, or Mechanical Engineering.',
  },
  {
    id: 'cross-border-sourcing',
    title: 'Cross-Border Sourcing & Logistics',
    industry: 'Supply Chain & Global Trade',
    description: 'Hands-on projects covering Incoterms 2020, European customs clearance dossiers, international supplier audits, and commercial contract negotiations.',
    pathwayLabel: 'India Preparation → Potential Opportunities in Germany',
    careerDirection: 'Global sourcing specialist, freight operations manager, and supply chain coordinator.',
    keyTopics: ['Incoterms 2020', 'Customs Clearance', 'B2B Negotiations', 'Supplier Audits', 'Bill of Lading'],
    selectionCriteria: 'Commercial aptitude, English fluency, and successful intake case-study evaluation.',
  },
  {
    id: 'software-ai-tech',
    title: 'Software & AI Tech Projects',
    industry: 'Modern Software Engineering',
    description: 'Collaborative development of modern web architectures using React, AI-augmented workflow automation, PostgreSQL data layers, and cloud deployment pipelines.',
    pathwayLabel: 'Remote / Hybrid Projects → Potential International Roles',
    careerDirection: 'Full-stack developer, automation engineer, cloud technician, and technical consultant.',
    keyTopics: ['React & Next.js', 'AI Workflows', 'PostgreSQL', 'Cloud & DevOps', 'API Design'],
    selectionCriteria: 'Basic programming literacy (JavaScript/Python) and code logic assessment clearance.',
  },
  {
    id: 'medical-hospital-services',
    title: 'Medical & Hospital Services',
    industry: 'Healthcare Administration & Clinical Preparation',
    description: 'Focused preparation in Medical German (Fachsprache Medizin/Pflege), hospital electronic records, clinical workflow orientation, and Defizitbescheid document organization.',
    pathwayLabel: 'Preparation → Qualification and Recognition Assessment',
    careerDirection: 'Registered nursing recognition (Anerkennung), healthcare coordinator, and hospital assistant.',
    keyTopics: ['Medical German B2', 'Hospital EMR Systems', 'Anatomical Terms', 'Recognition Dossier', 'Patient Intake'],
    selectionCriteria: 'Recognized GNM/B.Sc. Nursing or Medical degree and enrollment in German B1/B2 track.',
  },
];

// 4. Module Four: Rewards & Study Incentives Data
export const REWARD_INCENTIVES: RewardIncentive[] = [
  {
    id: 'milestone-points',
    title: 'Milestone Points & Cashbacks',
    category: 'points',
    badge: 'Learning Incentive',
    description: 'Accumulate points for verified coursework submissions, passing German language modules (A1 through B2), and verified project deliverables.',
    eligibilityDetails: 'Points are credited based on published grading rubrics and are redeemable strictly for approved vouchers or cashbacks.',
    icon: 'AwardIcon',
  },
  {
    id: 'tech-gifts-study-kits',
    title: 'Tech Gifts & Study Kits',
    category: 'gifts',
    badge: 'Hardware & Tools',
    description: 'High-performing students who complete milestones ahead of schedules may qualify for developer laptops, specialized study kits, and technical reference sets.',
    eligibilityDetails: 'Subject to performance evaluation, milestone verification, and program cohort inventory.',
    icon: 'LaptopIcon',
  },
  {
    id: 'european-educational-tours',
    title: 'European Educational Tours',
    category: 'travel',
    badge: 'Immersion Visit',
    description: 'Sponsored educational visits to European university partner campuses and corporate technology centers for exceptional performers.',
    eligibilityDetails: 'Selection based on competitive review, verified academic standing, visa eligibility, and published cohort criteria.',
    icon: 'GlobeIcon',
  },
  {
    id: 'salary-incentives',
    title: 'Salary & Performance Progression',
    category: 'salary',
    badge: 'Compensation Growth',
    description: 'Advertised progression from ₹15,000 to ₹45,000+ per month reflects potential advancement through advanced corporate project tiers.',
    eligibilityDetails: 'Represents an advertised potential range tied to performance reviews and project requirements, not an automatic entitlement.',
    icon: 'BriefcaseIcon',
  },
  {
    id: 'leadership-pathways',
    title: 'Leadership & Consultant Pathways',
    category: 'leadership',
    badge: 'Career Evolution',
    description: 'Advance from student participant to freelance technical consultant, mentor, or regional outreach coordinator.',
    eligibilityDetails: 'Offered based on leadership demonstration, peer-evaluation metrics, and company partner openings.',
    icon: 'UserIcon',
  },
  {
    id: 'course-fee-subsidies',
    title: 'Course Fee Subsidies',
    category: 'subsidy',
    badge: 'Up to 50% Subsidy',
    description: 'Eligible candidates preparing for German language certification or IELTS training can unlock tuition fee subsidies of up to 50%.',
    eligibilityDetails: 'Actual subsidy percentage depends on qualifying test score, early application, and applicable cohort terms.',
    icon: 'GraduationCapIcon',
  },
];

// 5. Plan Calculator Configuration Data
export const CALCULATOR_PROGRAMMES = [
  'German A1–B2 + Tech Work-While-Learn',
  'German Medical + Hospital Pilot',
  'Solar Business Toolkit + German Preparation',
  'IELTS International + Cross-Border Logistics',
  'Full-Stack AI Coding + Remote EU IT Role',
] as const;

export const CALCULATOR_DURATIONS = [
  '3-Month Foundation Pilot',
  '6-Month Integrated Pilot',
  '1-Year Full Certification',
] as const;

export type CalculatorProgrammeType = typeof CALCULATOR_PROGRAMMES[number];
export type CalculatorDurationType = typeof CALCULATOR_DURATIONS[number];

export const CALCULATOR_CONFIG: Record<CalculatorDurationType, CalculatorPlanConfig> = {
  '3-Month Foundation Pilot': {
    advertisedStipend: '₹45,000 Total Advertised Stipend',
    courseDiscount: 'Standard Early-Bird Subsidy (Up to 20%)',
    experienceDocs: 'Foundation Training Record & Completion Letter',
    rewardTier: 'Bronze Tier (Milestone Points & Starter Study Kit)',
    additionalPerks: 'Eligible for transition evaluation into 6-month corporate pilot.',
  },
  '6-Month Integrated Pilot': {
    advertisedStipend: '₹1,20,000 Total Advertised Stipend',
    courseDiscount: 'Up to 50% Course Fee Subsidy',
    experienceDocs: 'Corporate Project Record & Work-While-Learn Experience Certificate',
    rewardTier: 'Silver Tier (Developer Hardware Toolkits & Vouchers)',
    additionalPerks: 'Includes German career onboarding mentorship and visa advisory support.',
  },
  '1-Year Full Certification': {
    advertisedStipend: '₹3,00,000+ Total Advertised Compensation',
    courseDiscount: 'Up to 50% Subsidized Academy Tuition',
    experienceDocs: 'Full Corporate Experience Portfolio & Verified Partner Recommendation',
    rewardTier: 'Gold / Platinum Tier (European Tour & Tech Kit Eligibility)',
    additionalPerks: 'Priority European employer interview matching and consular defense preparation.',
  },
};
