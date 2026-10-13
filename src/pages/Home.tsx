import React, { useState } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { IntelliCoachSection } from '../components/home/IntelliCoachSection';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { WorkAndStudySpotlight } from '../components/home/WorkAndStudySpotlight';
import { IlasWithYouSection } from '../components/home/IlasWithYouSection';
import { RewardsSection } from '../components/home/RewardsSection';
import { QuickEligibilityChecker } from '../components/home/QuickEligibilityChecker';
import { TestimonialsAndTrust } from '../components/home/TestimonialsAndTrust';
import { PageEnquiryForm } from '../components/common/PageEnquiryForm';
import { CTASection } from '../components/home/CTASection';

const Home: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedFilter(categoryId);
    scrollToSection('services-overview');
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Banner with Quick Selector & Metrics */}
      <HeroBanner
        onExploreServices={() => scrollToSection('services-overview')}
        onLaunchIntelliCoach={() => scrollToSection('intelli-coach')}
        onSelectCategory={handleSelectCategory}
      />

      {/* 2. Interactive Intelli Coach Showcase (AI Coach) */}
      <IntelliCoachSection />

      {/* 3. Comprehensive Overview of All 7 Sections */}
      <ServicesOverview
        activeFilter={selectedFilter}
      />

      {/* 4. Instant Mobile Eligibility Calculator */}
      <QuickEligibilityChecker />

      {/* 5. Deep-Dive Spotlight: Work & Study + Study Abroad */}
      <WorkAndStudySpotlight />

      {/* 6. Deep-Dive Spotlight: ILAS With You (On-Ground Care) */}
      <IlasWithYouSection />

      {/* 7. Deep-Dive Spotlight: Rewards & Loyalty Program */}
      <RewardsSection />

      {/* 8. Trust Metrics & Student Success Stories */}
      <TestimonialsAndTrust />

      {/* 9. Dedicated Fast Consultation & Assessment Enquiry Form */}
      <section id="fast-enquiry" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageEnquiryForm 
            pageType="general" 
            title="Book a Free 1-on-1 Global Career Consultation"
            subtitle="Connect with certified study abroad, work permit, and language advisors. Get customized admission roadmaps and consular timelines."
          />
        </div>
      </section>

      {/* 10. Final High-Impact CTA */}
      <CTASection
        onLaunchCoach={() => scrollToSection('intelli-coach')}
        onExploreServices={() => scrollToSection('services-overview')}
      />
    </div>
  );
};

export default Home;