import type { 
  EligibilityAssessmentPayload, 
  EligibilityResult, 
  EligibilityPointItem, 
  RecommendedProduct,
  ProductOption
} from '../types';

export const AVAILABLE_PRODUCTS: ProductOption[] = [
  {
    id: 'visa_services',
    title: 'Visa & Consular Services',
    badge: 'Chancenkarte & Work Visas',
    badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    tagline: 'Opportunity Card (Chancenkarte), EU Blue Card, Job Seeker & Fast-Track Work Permits',
    iconName: 'passport',
    popularDestination: 'Germany, Ireland, UK, Canada',
    keyFeature: '6-Point Statutory Scoring Audit & Document Verification'
  },
  {
    id: 'study_abroad',
    title: 'Study Abroad & Public University',
    badge: '€0 Tuition Free Unis',
    badgeColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    tagline: 'Tuition-free German state universities, 1-Year UK Fast Masters & Canadian Co-op',
    iconName: 'graduation',
    popularDestination: 'Germany, UK, Ireland, France',
    keyFeature: 'Direct Public Admissions, APS Clearance & Post-Study Visas'
  },
  {
    id: 'course_enrollment',
    title: 'Language Academy & CEFR Courses',
    badge: '1:1 Tutor & 24/7 AI',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    tagline: 'Targeted German A1-C1, Medical German (FSP), IT Professional Vocabulary & IELTS',
    iconName: 'book',
    popularDestination: 'German / European Hubs',
    keyFeature: 'Goethe Exam Simulator, Intelli Coach AI Drills & Live Cohorts'
  },
  {
    id: 'work_and_study',
    title: 'Work & Study Dual Track',
    badge: 'Earn €14-€22/hr',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    tagline: 'Dual degree & Werkstudent program allowing legal student employment during degree',
    iconName: 'briefcase',
    popularDestination: 'Germany, Ireland, Canada',
    keyFeature: '140 Full Working Days / Year + Co-op Integration'
  },
  {
    id: 'job_placement',
    title: 'Career & Direct Job Placement',
    badge: 'High Shortage Relocation',
    badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800',
    tagline: 'Direct hiring for IT engineers, nurses (Anerkennung), medical staff & mechanical tech',
    iconName: 'globe',
    popularDestination: 'Germany, Netherlands, Austria',
    keyFeature: 'Credential Licensing (Defizitbescheid) & Consular Expedited Filing'
  }
];

export function calculateEligibility(payload: EligibilityAssessmentPayload): EligibilityResult {
  const pointsBreakdown: EligibilityPointItem[] = [];
  const strengths: string[] = [];
  const recommendations: string[] = [];
  const recommendedProducts: RecommendedProduct[] = [];

  let totalScore = 0;
  let chankartePoints = 0;

  // 1. Evaluate Academic Qualifications
  let educationPoints = 0;
  let educationStatus: 'passed' | 'partial' | 'needs_work' = 'passed';
  let eduDesc = '';

  switch (payload.education_level) {
    case 'phd':
    case 'master_stem':
      educationPoints = 25;
      chankartePoints += 4;
      strengths.push('STEM Postgraduate degree grants maximum academic evaluation points in Europe.');
      eduDesc = 'Advanced STEM degree recognized under Anabin / ZAB database.';
      break;
    case 'bachelor_stem':
    case 'nursing_medical':
      educationPoints = 22;
      chankartePoints += 4;
      strengths.push('Eligible for fast-track recognition in shortage sectors (IT / Healthcare).');
      eduDesc = 'Recognized Bachelor / Medical credential in a critical shortage occupation.';
      break;
    case 'master_non_stem':
      educationPoints = 20;
      chankartePoints += 3;
      eduDesc = 'Postgraduate degree qualifying for administrative and management visas.';
      break;
    case 'bachelor_non_stem':
      educationPoints = 17;
      chankartePoints += 3;
      eduDesc = 'Standard university degree recognized under Anabin qualification standards.';
      break;
    default:
      educationPoints = 10;
      educationStatus = 'partial';
      chankartePoints += 1;
      eduDesc = 'High school or vocational certificate — best paired with a Foundation Year or Dual-Study.';
      recommendations.push('Consider a preparatory Studienkolleg or Dual-Study Program to meet university degree pre-requisites.');
      break;
  }

  pointsBreakdown.push({
    category: 'Academic Credentials & Recognition',
    pointsAwarded: educationPoints,
    maxPoints: 25,
    status: educationStatus,
    description: eduDesc,
  });
  totalScore += educationPoints;

  // 2. Evaluate Professional Experience
  let expPoints = 0;
  let expStatus: 'passed' | 'partial' | 'needs_work' = 'passed';
  let expDesc = '';

  if (payload.experience_years === '5+') {
    expPoints = 20;
    chankartePoints += 3;
    strengths.push('5+ years of demonstrable industry experience provides significant hiring advantage.');
    expDesc = 'Senior industry tenure qualifying for EU Blue Card experience exemptions.';
  } else if (payload.experience_years === '3-5') {
    expPoints = 17;
    chankartePoints += 2;
    strengths.push('Solid 3-5 years experience satisfies German Skilled Worker requirements.');
    expDesc = 'Mid-level industry experience recognized for professional sponsorship.';
  } else if (payload.experience_years === '1-2') {
    expPoints = 13;
    chankartePoints += 1;
    expDesc = 'Junior experience — eligible for study visas, junior roles, or opportunity card points.';
  } else {
    expPoints = 8;
    expStatus = 'partial';
    expDesc = 'Entry-level / Fresh graduate — optimal for Masters, Bachelor, or Dual-Study pathways.';
    recommendations.push('Gain European work experience via the 140-day student work permit (Werkstudent).');
  }

  pointsBreakdown.push({
    category: 'Professional Experience & Tenure',
    pointsAwarded: expPoints,
    maxPoints: 20,
    status: expStatus,
    description: expDesc,
  });
  totalScore += expPoints;

  // 3. Evaluate Language Competencies
  let langPoints = 0;
  let langStatus: 'passed' | 'partial' | 'needs_work' = 'passed';
  let langDesc = '';

  // German score
  if (payload.german_level === 'b2' || payload.german_level === 'c1_plus') {
    langPoints += 18;
    chankartePoints += 3;
    strengths.push('B2/C1 German unlocks 90% higher job response rates and medical licensing clearance.');
    langDesc = 'Upper-intermediate to advanced German (CEFR B2/C1 certified standard).';
  } else if (payload.german_level === 'b1') {
    langPoints += 14;
    chankartePoints += 2;
    strengths.push('B1 German satisfies statutory Chancenkarte and work visa linguistic thresholds.');
    langDesc = 'CEFR B1 Intermediate German qualifies for Opportunity Card + Werkstudent.';
  } else if (payload.german_level === 'a1' || payload.german_level === 'a2') {
    langPoints += 10;
    langStatus = 'partial';
    chankartePoints += 1;
    langDesc = 'Elementary German (A1/A2). Sufficient for English-medium universities, but needs upgrade for local jobs.';
    recommendations.push('Fast-track German to B1 with ILA Intensive Cohorts before visa submission.');
  } else {
    langPoints += 5;
    langStatus = 'needs_work';
    langDesc = 'Zero / Beginner German. Highly recommended to start A1/A2 immediately.';
    recommendations.push('Enroll in ILA German A1 Fast-Track to avoid consular interview rejection.');
  }

  // English boost
  if (payload.english_level === 'fluent_ielts_6_5' || payload.english_level === 'advanced_ielts_7_5') {
    langPoints += 7;
    chankartePoints += 1;
  } else {
    langPoints += 3;
  }

  pointsBreakdown.push({
    category: 'Linguistic Readiness (German & English)',
    pointsAwarded: Math.min(langPoints, 25),
    maxPoints: 25,
    status: langStatus,
    description: langDesc,
  });
  totalScore += Math.min(langPoints, 25);

  // 4. Age Factor (Chancenkarte / Visa Point System)
  let agePoints = 0;
  let ageDesc = '';
  if (payload.age_range === 'under_35') {
    agePoints = 15;
    chankartePoints += 2;
    ageDesc = 'Under 35 years: qualifies for highest statutory age bonus under German immigration laws.';
  } else if (payload.age_range === '35_40') {
    agePoints = 11;
    chankartePoints += 1;
    ageDesc = 'Age 35-40 years: satisfies skilled migration criteria without penalty.';
  } else {
    agePoints = 7;
    ageDesc = 'Age 40+: requires meeting higher minimum salary thresholds for EU Blue Card.';
  }

  pointsBreakdown.push({
    category: 'Age Profile & Statutory Alignment',
    pointsAwarded: agePoints,
    maxPoints: 15,
    status: 'passed',
    description: ageDesc,
  });
  totalScore += agePoints;

  // 5. Financial & Proof of Funds
  let finPoints = 0;
  let finStatus: 'passed' | 'partial' | 'needs_work' = 'passed';
  let finDesc = '';

  if (payload.budget_readiness === 'full_blocked_account' || payload.budget_readiness === 'employer_sponsored') {
    finPoints = 15;
    strengths.push('Financial readiness / blocked account capability confirms instant consular readiness.');
    finDesc = 'Funds available for blocked account (€11,904/yr) or formal employer sponsorship.';
  } else if (payload.budget_readiness === 'partial_funding') {
    finPoints = 10;
    finStatus = 'partial';
    finDesc = 'Partial funds available — suitable when combined with student working rights (€1,200/mo).';
    recommendations.push('Utilize ILA’s Blocked Account Escrow Assistance and student loan partners.');
  } else {
    finPoints = 8;
    finStatus = 'partial';
    finDesc = 'Seeking zero-tuition options and early campus work-study to offset living costs.';
    recommendations.push('Apply for public universities with €0 tuition and apply early for DAAD subsidies.');
  }

  pointsBreakdown.push({
    category: 'Financial Capability & Blocked Account',
    pointsAwarded: finPoints,
    maxPoints: 15,
    status: finStatus,
    description: finDesc,
  });
  totalScore += finPoints;

  // Compute final verdict
  const finalScore = Math.min(Math.round(totalScore), 100);
  let statusCategory: 'high_match' | 'strong_potential' | 'conditional_track' = 'high_match';
  let statusColor = 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40';
  let verdict = '';
  let counselorSummary = '';

  if (finalScore >= 80) {
    statusCategory = 'high_match';
    statusColor = 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40';
    verdict = 'Outstanding Match — Fast-Track Consular & Academic Filing Recommended';
    counselorSummary = `Candidate demonstrates a formidable profile with ${finalScore}% eligibility match. With ${chankartePoints} statutory points, they comfortably exceed the German Opportunity Card minimum (6 points) and meet public university direct admission thresholds.`;
  } else if (finalScore >= 65) {
    statusCategory = 'strong_potential';
    statusColor = 'text-indigo-600 dark:text-indigo-400 border-indigo-500/40 bg-indigo-50 dark:bg-indigo-950/40';
    verdict = 'Strong Potential — Eligible with Recommended Language / Credit Optimization';
    counselorSummary = `Candidate has a solid foundation (${finalScore}% score). Enhancing German by one CEFR band or completing an accredited credit bridging module will ensure a 100% smooth visa issuance.`;
  } else {
    statusCategory = 'conditional_track';
    statusColor = 'text-amber-600 dark:text-amber-400 border-amber-500/40 bg-amber-50 dark:bg-amber-950/40';
    verdict = 'Conditional Track — Dual-Study or Preparatory Language Pathway Advised';
    counselorSummary = `Candidate is eligible through structured transitional pathways. We recommend starting with an ILA intensive language cohort combined with a Work & Study placement track.`;
  }

  // Tailor Recommended Products
  if (payload.product_type === 'visa_services' || chankartePoints >= 6) {
    recommendedProducts.push({
      id: 'prod-chancenkarte',
      title: 'Germany Opportunity Card (Chancenkarte) Filing',
      category: 'Visa Services',
      badge: `${chankartePoints}/6 Statutory Points Verified`,
      link: '/visa-services',
      description: 'End-to-end consular filing with legal declaration, blocked account escrow, and health cover.'
    });
  }

  if (payload.german_level === 'none' || payload.german_level === 'a1' || payload.german_level === 'a2') {
    recommendedProducts.push({
      id: 'prod-german-course',
      title: 'Targeted German Language Cohort (A1 to B2)',
      category: 'Language Academy',
      badge: 'Live Cohort or 24/7 AI',
      link: '/courses?language=german',
      description: 'CEFR-accredited training tailored to your industry specialization with Goethe exam guarantee.'
    });
  }

  if (payload.product_type === 'study_abroad' || payload.education_level === 'high_school' || payload.education_level.includes('bachelor')) {
    recommendedProducts.push({
      id: 'prod-study-abroad',
      title: 'Top German Public University Admissions',
      category: 'Study Abroad',
      badge: '€0 Tuition State Unis',
      link: '/study-abroad',
      description: 'Guaranteed 3 university applications, APS document review, and blocked account setup.'
    });
  }

  if (payload.product_type === 'work_and_study' || payload.budget_readiness !== 'full_blocked_account') {
    recommendedProducts.push({
      id: 'prod-work-study',
      title: 'Work & Study Dual Degree Program',
      category: 'Work & Study',
      badge: 'Earn €14-€22/hr',
      link: '/work-and-study',
      description: 'Combine legal student employment (140 full days) with international European degrees.'
    });
  }

  const randomRef = `ILA-ELG-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    assessmentReference: randomRef,
    productType: payload.product_type,
    score: finalScore,
    verdict,
    statusCategory,
    statusColor,
    targetCountry: payload.target_country || 'Germany',
    pointsBreakdown,
    totalPoints: chankartePoints,
    qualifyingPointsRequired: 6,
    strengths,
    recommendations,
    recommendedProducts,
    estimatedTimeline: payload.timeline === 'immediate' ? '4-8 Weeks' : '2-4 Months',
    counselorSummary,
    calculatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
}
