export interface StudyProgramCard {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  badge?: string;
  iconName?: string;
  intakeInfo?: string;
}

export interface BenefitHighlight {
  id: string;
  title: string;
  description: string;
  metricBadge?: string;
  iconName?: string;
}

export interface SupportServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  iconName?: string;
  badge?: string;
}

export interface PublicUniSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  programs: StudyProgramCard[];
  guaranteedBenefits: BenefitHighlight[];
  actions: {
    checkRequirements: {
      title: string;
      description: string;
      ctaText: string;
    };
    uploadTranscripts: {
      title: string;
      description: string;
      ctaText: string;
    };
  };
}

export interface CompanionBannerData {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  linkUrl: string;
}

export interface PrivateUniSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  programs: StudyProgramCard[];
  keyAdvantages: BenefitHighlight[];
}

export interface AusbildungSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  programs: StudyProgramCard[];
  highlights: BenefitHighlight[];
}

export interface SupportServicesSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  services: SupportServiceItem[];
}

export interface FinalCtaData {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface StudyAbroadOverviewData {
  hero: {
    title: string;
    highlightWord: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    categories: Array<{
      id: string;
      label: string;
      targetSectionId: string;
    }>;
  };
  publicUniversities: PublicUniSectionData;
  companionBanner: CompanionBannerData;
  privateUniversities: PrivateUniSectionData;
  ausbildung: AusbildungSectionData;
  supportServices: SupportServicesSectionData;
  finalCta: FinalCtaData;
}
