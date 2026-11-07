import { describe, it, expect } from 'vitest';
import { calculateEligibility, AVAILABLE_PRODUCTS } from './evaluationRules';
import type { EligibilityAssessmentPayload } from '../types';

describe('Eligibility Evaluation Engine (calculateEligibility)', () => {
  it('exposes standard AVAILABLE_PRODUCTS definitions', () => {
    expect(AVAILABLE_PRODUCTS).toBeDefined();
    expect(AVAILABLE_PRODUCTS.length).toBeGreaterThanOrEqual(5);
    const ids = AVAILABLE_PRODUCTS.map((p) => p.id);
    expect(ids).toContain('visa_services');
    expect(ids).toContain('study_abroad');
    expect(ids).toContain('course_enrollment');
  });

  it('awards maximum points and high_match status for STEM Master + B2 German + 5+ yrs experience', () => {
    const payload: EligibilityAssessmentPayload = {
      product_type: 'visa_services',
      education_level: 'master_stem',
      field_of_study: 'it_software',
      experience_years: '5+',
      german_level: 'b2',
      english_level: 'fluent_ielts_6_5',
      age_range: 'under_35',
      budget_readiness: 'full_blocked_account',
      target_country: 'Germany',
      timeline: 'immediate',
    };

    const result = calculateEligibility(payload);

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.statusCategory).toBe('high_match');
    expect(result.totalPoints).toBeGreaterThanOrEqual(6);
    expect(result.qualifyingPointsRequired).toBe(6);
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.estimatedTimeline).toBe('4-8 Weeks');

    // Should recommend Opportunity Card
    const productIds = result.recommendedProducts.map((p) => p.id);
    expect(productIds).toContain('prod-chancenkarte');
  });

  it('awards conditional_track status and recommends preparatory pathways for high school + zero German', () => {
    const payload: EligibilityAssessmentPayload = {
      product_type: 'study_abroad',
      education_level: 'high_school',
      field_of_study: 'it_software',
      experience_years: '0',
      german_level: 'none',
      english_level: 'basic',
      age_range: 'under_35',
      budget_readiness: 'seeking_zero_tuition',
      target_country: 'Germany',
      timeline: 'exploring',
    };

    const result = calculateEligibility(payload);

    expect(result.score).toBeLessThan(65);
    expect(result.statusCategory).toBe('conditional_track');
    expect(result.recommendations.length).toBeGreaterThan(0);

    // Should recommend German language course
    const productIds = result.recommendedProducts.map((p) => p.id);
    expect(productIds).toContain('prod-german-course');
    expect(productIds).toContain('prod-study-abroad');
  });

  it('correctly calculates age points based on statutory thresholds', () => {
    const under35Payload: EligibilityAssessmentPayload = {
      product_type: 'visa_services',
      education_level: 'bachelor_stem',
      field_of_study: 'it_software',
      experience_years: '3-5',
      german_level: 'b1',
      english_level: 'fluent_ielts_6_5',
      age_range: 'under_35',
      budget_readiness: 'full_blocked_account',
      target_country: 'Germany',
      timeline: 'immediate',
    };

    const over40Payload: EligibilityAssessmentPayload = {
      ...under35Payload,
      age_range: 'above_40',
    };

    const resultUnder35 = calculateEligibility(under35Payload);
    const resultOver40 = calculateEligibility(over40Payload);

    const under35AgeItem = resultUnder35.pointsBreakdown.find((p) =>
      p.category.includes('Age Profile')
    );
    const over40AgeItem = resultOver40.pointsBreakdown.find((p) =>
      p.category.includes('Age Profile')
    );

    expect(under35AgeItem?.pointsAwarded).toBe(15);
    expect(over40AgeItem?.pointsAwarded).toBe(7);
    expect(resultUnder35.score).toBeGreaterThan(resultOver40.score);
  });
});
