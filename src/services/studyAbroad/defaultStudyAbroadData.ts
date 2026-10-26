import type { StudyAbroadOverviewData } from './types';

export const DEFAULT_STUDY_ABROAD_DATA: StudyAbroadOverviewData = {
  hero: {
    title: 'Study in Germany & Europe with',
    highlightWord: 'Ilas With You',
    subtitle:
      'End-to-end support for your international education. From university selection and APS visa clearance to part-time jobs and comfortable local settlement.',
    primaryCta: 'Explore Admissions',
    secondaryCta: 'Upload Documents',
    categories: [
      { id: 'public-uni', label: 'Public Universities (€0 Tuition)', targetSectionId: 'public-universities' },
      { id: 'private-uni', label: 'Private Universities', targetSectionId: 'private-universities' },
      { id: 'ausbildung', label: 'Ausbildung (Paid Dual Study)', targetSectionId: 'ausbildung' },
      { id: 'support-services', label: 'Other Support Services', targetSectionId: 'support-services' },
    ],
  },

  publicUniversities: {
    eyebrow: '100% Free Tuition',
    heading: 'German Public Universities',
    description:
      'World-renowned state universities offering top-tier degrees with zero tuition fees across Germany.',
    programs: [
      {
        id: 'tu9',
        title: 'TU9 Technical Universities',
        description:
          'Top engineering, IT, AI & automotive research degrees with €0 tuition.',
        ctaText: 'Check Eligibility',
        badge: 'Engineering & IT Research',
        intakeInfo: 'Winter & Summer Intakes',
      },
      {
        id: 'fh',
        title: 'Universities of Applied Sciences (FH)',
        description:
          'Practical, industry-focused Bachelors & Masters with internship semesters.',
        ctaText: 'Check Eligibility',
        badge: 'Industry & Practice',
        intakeInfo: 'Direct Corporate Tie-ups',
      },
      {
        id: 'masters',
        title: 'English-Taught International Masters',
        description:
          'Over 1,500+ tuition-free degree programs taught completely in English.',
        ctaText: 'Check Eligibility',
        badge: '1,500+ Programs',
        intakeInfo: 'No German Required for Admission',
      },
    ],
    guaranteedBenefits: [
      {
        id: 'zero-tuition',
        title: '€0 Tuition Public Uni',
        description: '100% Free Tuition in world-class German universities.',
        metricBadge: '€0 Fees',
      },
      {
        id: 'work-rights',
        title: 'Part-Time Work Rights',
        description: '20 Hrs/Week legal student work allowance with good pay.',
        metricBadge: '20 Hrs/Wk',
      },
      {
        id: 'job-seeking',
        title: '18-Month Job Seeking Visa',
        description: 'Post-Study Visa to transition into European corporate jobs.',
        metricBadge: '18 Months',
      },
      {
        id: 'rewards',
        title: 'Reward Ecosystem',
        description: 'Cashback Perks per academic milestone & peer referrals.',
        metricBadge: 'Cashback',
      },
    ],
    actions: {
      checkRequirements: {
        title: 'Check Public Uni Requirements',
        description:
          'Get instant evaluation of your CGPA, German levels, and ECTS credits.',
        ctaText: 'Check Requirements',
      },
      uploadTranscripts: {
        title: 'Upload Transcripts for Review',
        description:
          'Submit degree certificates & marksheets for preliminary APS checks.',
        ctaText: 'Upload Transcripts',
      },
    },
  },

  companionBanner: {
    eyebrow: 'Royal Lifetime Mentorship',
    title: 'Ilas With You Companion',
    description:
      '24/7 AI Academic Mentor: University Shortlisting, Course Matching, and Visa Assistance.',
    ctaText: 'Access Companion Now →',
    linkUrl: '/#ilas-companion',
  },

  privateUniversities: {
    eyebrow: 'English Medium & Fast Track',
    heading: 'German Private Universities',
    description:
      'Specialized career-focused universities with flexible entry requirements, small class sizes, and corporate networking.',
    programs: [
      {
        id: 'direct-english',
        title: 'Direct English-Medium Intake',
        description:
          'No prior German language certificates required for initial bachelor & master entry.',
        ctaText: 'Apply Now',
        badge: 'Zero German Required',
        intakeInfo: 'Immediate Processing',
      },
      {
        id: 'work-integrated',
        title: 'Work-Integrated Co-Op Degrees',
        description:
          'Partner corporate internships built directly into the university curriculum.',
        ctaText: 'Apply Now',
        badge: 'Paid Internships',
        intakeInfo: 'Corporate Sponsors',
      },
      {
        id: 'flexible-intakes',
        title: 'Flexible Intakes (March & October)',
        description:
          'Multiple application windows throughout the year for fast visa processing.',
        ctaText: 'Apply Now',
        badge: 'Fast Visa',
        intakeInfo: 'Rolling Admissions',
      },
    ],
    keyAdvantages: [
      {
        id: 'placement-rate',
        title: '98% Placement Rate',
        description:
          'Direct hiring fairs with BMW, Siemens, SAP, and European tech firms.',
        metricBadge: '98%',
      },
      {
        id: 'fast-visa',
        title: 'Fast Visa Clearances',
        description:
          'Fast-track admission letters for immediate embassy visa interviews.',
        metricBadge: 'Express',
      },
      {
        id: 'scholarship-opts',
        title: 'Scholarship Options',
        description:
          'Partial tuition waivers and merit-based grants for international students.',
        metricBadge: 'Up to 30%',
      },
      {
        id: 'practical-classrooms',
        title: 'Practical Classrooms',
        description:
          'Small batch sizes with direct mentor feedback from industry executives.',
        metricBadge: '15:1 Ratio',
      },
    ],
  },

  ausbildung: {
    eyebrow: 'Earn While You Study',
    heading: 'Ausbildung (Paid Vocational Training)',
    description:
      "Germany's famous dual education system where you receive a guaranteed monthly salary (€1,000–€1,400/month) while mastering a profession.",
    programs: [
      {
        id: 'nursing-ausbildung',
        title: 'Nursing & Healthcare Ausbildung',
        description:
          'High demand across German hospitals with guaranteed work contracts post-training.',
        ctaText: 'Apply Intake',
        badge: 'Hospital Contracts',
        intakeInfo: 'April & October',
      },
      {
        id: 'it-ausbildung',
        title: 'IT & Software Systems Ausbildung',
        description:
          'Practical software development and network engineering in corporate IT teams.',
        ctaText: 'Apply Intake',
        badge: 'Tech Employers',
        intakeInfo: 'August & September',
      },
      {
        id: 'mechatronics-ausbildung',
        title: 'Mechatronics & Hotel Management',
        description:
          'Hands-on industrial engineering and hospitality management in top organizations.',
        ctaText: 'Apply Intake',
        badge: 'Industrial Leaders',
        intakeInfo: 'September Intake',
      },
    ],
    highlights: [
      {
        id: 'stipend',
        title: '€1,000–€1,400 Stipend',
        description:
          'Guaranteed monthly salary from Day 1 to cover all living expenses.',
        metricBadge: '€1.4k/mo',
      },
      {
        id: 'zero-fees',
        title: 'Zero Tuition Fees',
        description: 'No university tuition fees required for any vocational trade.',
        metricBadge: '€0',
      },
      {
        id: 'job-guarantee',
        title: 'Direct Job Guarantee',
        description:
          'Over 95% of graduates transition immediately into full-time employer contracts.',
        metricBadge: '95%+',
      },
      {
        id: 'pr-pathway',
        title: 'PR Pathway',
        description:
          'Fast-track eligibility for Permanent Residency (PR) in Germany.',
        metricBadge: '2 Years',
      },
    ],
  },

  supportServices: {
    eyebrow: 'End-to-End Assistance',
    heading: 'Complimentary Support Services',
    description:
      'We stand with you at every step—from initial document attestation and visa clearance to airport pickup and local accommodation.',
    services: [
      {
        id: 'arrival-care',
        category: 'Arrival Care',
        title: 'Accommodation & Pickup',
        description:
          'Guaranteed student dorms, WG flatshare assistance, and airport reception upon arrival in Germany.',
        ctaText: 'Request Support',
        badge: 'Airport to Dorm',
      },
      {
        id: 'finance-health',
        category: 'Finance & Health',
        title: 'Blocked Account & Insurance',
        description:
          'End-to-end guidance for Sperrkonto (Blocked Account) setup and TK/AOK public health insurance.',
        ctaText: 'Request Support',
        badge: 'Consular Approved',
      },
      {
        id: 'student-income',
        category: 'Student Income',
        title: 'Part-Time Job Assistance',
        description:
          'Direct connecting with student job pools (20 hrs/week) to support monthly living expenses easily.',
        ctaText: 'Request Support',
        badge: 'Werkstudent',
      },
      {
        id: 'visa-processing',
        category: 'Visa Processing',
        title: '21-Day Visa & APS Clearance',
        description:
          'Fast-track APS document verification, embassy appointment booking, and visa file preparation.',
        ctaText: 'Request Support',
        badge: 'Fast-Track APS',
      },
      {
        id: 'documentation',
        category: 'Documentation',
        title: 'Uni-Assist & Attestation',
        description:
          'Official German translation, certified document notarization, and error-free Uni-Assist submissions.',
        ctaText: 'Request Support',
        badge: '100% Precision',
      },
      {
        id: 'settlement-support',
        category: 'Settlement Support',
        title: 'Local Registration (Anmeldung)',
        description:
          'In-person guidance for German city hall registration (Anmeldung) and local bank account opening.',
        ctaText: 'Request Support',
        badge: 'City Hall Concierge',
      },
    ],
  },

  finalCta: {
    title: 'Ready to Start Your European Journey?',
    subtitle:
      'Submit your preliminary details now for free counseling and university shortlisting.',
    ctaText: 'Explore All Services & Apply →',
  },
};
