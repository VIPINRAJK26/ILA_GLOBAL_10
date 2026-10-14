import type { ApiVisaCountry, ApiVisaType, VisaCountry, VisaType } from '../types/types';

/**
 * Safely parse array-or-string fields from DRF
 */
function toArray(val: string[] | string | undefined | null): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string') {
    // If it's a newline or period or comma separated string
    return val
      .split(/\n|•|,\s*/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  return [];
}

/**
 * Transform raw DRF Visa Type into frontend VisaType
 */
export function transformApiVisaType(raw: ApiVisaType): VisaType {
  return {
    id: raw.id || '',
    country: raw.country || '',
    countryCode: raw.country?.toUpperCase() || '',
    name: raw.name || 'Visa Stream',
    officialCode: raw.official_code || 'Official Visa Category',
    category: raw.category || 'student',
    categoryDisplay: raw.category_display || 'Visa Track',
    badge: raw.badge || 'Verified Stream',
    approvalRate: raw.approval_rate || '95%+',
    shortDescription: raw.short_description || '',
    fullDescription: raw.full_description || raw.short_description || '',
    processingTime: raw.processing_time || '4–8 Weeks',
    consularFee: raw.consular_fee || 'Standard Consular Fee',
    financialRequirement: raw.financial_requirement || 'Proof of Funds Required',
    workRights: raw.work_rights || 'Standard Permitted Hours',
    validityPeriod: raw.validity_period || 'Duration of stay',
    eligibilityCriteria: toArray(raw.eligibility_criteria),
    requiredDocuments: toArray(raw.required_documents),
    keyHighlights: toArray(raw.key_highlights),
    tags: toArray(raw.tags),
    isActive: Boolean(raw.is_active),
  };
}

/**
 * Transform raw DRF Visa Country into frontend VisaCountry
 */
export function transformApiCountry(raw: ApiVisaCountry): VisaCountry {
  const visaTypes = (raw.visa_types || []).map(transformApiVisaType);

  return {
    id: raw.id || '',
    name: raw.name || '',
    code: raw.code || '',
    flag: raw.flag || '🌐',
    region: raw.region || 'Global',
    currency: raw.currency || 'USD ($)',
    averageProcessingTime: raw.average_processing_time || '4–6 Weeks',
    overallApprovalRate: raw.overall_approval_rate || '95%+',
    consularHotline: raw.consular_hotline || 'Available upon filing',
    isActive: Boolean(raw.is_active),
    createdAt: raw.created_at,
    visaTypes,
    heroHeadline: raw.hero_headline || `${raw.name} Immigration & Higher Education Visa Routes`,
    summary: `${raw.name} offers world-class opportunities for international students and skilled professionals across top institutions.`,
    activeVisaTracksCount: visaTypes.length,
    popularIntakes: raw.popular_intakes || 'Fall & Spring Sessions',
  };
}
