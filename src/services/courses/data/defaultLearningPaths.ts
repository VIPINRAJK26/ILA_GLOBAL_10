import type { BackendLearningPath } from '../types/types';

export const DEFAULT_BACKEND_LEARNING_PATHS: BackendLearningPath[] = [
  {
    id: '1-to-1',
    slug: '1-to-1',
    title: '1-to-1 Human Tutor',
    tagline: 'Private certified native instructor with dedicated live cohort batches & custom time slots',
    badge: 'Live Cohort Batches (+50%)',
    badge_color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    price_multiplier: 1.5,
    icon_type: 'user',
    icon_color: 'text-amber-600 dark:text-amber-400',
    features: [
      'Dedicated certified native faculty',
      'Scheduled live batches & choice of morning/afternoon/evening slots',
      'Personalized 1:1 oral review & accent correction',
      'Direct WhatsApp tutor support',
      'Full CEFR Goethe/IELTS exam readiness prep'
    ],
    deliverables: [
      'Live 1:1 Video Calls',
      'Cohort Schedule & Time Slot Selection',
      'Intelli Coach AI Included'
    ],
    recommended_for: 'Students requiring scheduled live cohort guidance, fixed batches, and personalized human accountability.',
    is_active: true,
    display_order: 1
  },
  {
    id: 'video-ai',
    slug: 'video-ai',
    title: 'Video + AI Masterclass',
    tagline: 'Structured video modules combined with 24/7 AI practice — use anytime without fixed batches',
    badge: 'Most Popular • 24/7 Anytime',
    badge_color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
    price_multiplier: 1.0,
    icon_type: 'laptop',
    icon_color: 'text-indigo-600 dark:text-indigo-400',
    features: [
      'Comprehensive 4K video curriculum modules',
      'Intelli Coach AI conversation partner 24/7',
      'Use anytime: zero batch dates or timing constraints',
      'Downloadable vocabulary & grammar dossiers',
      'Self-paced milestone assessments'
    ],
    deliverables: [
      'On-Demand Video Modules',
      '24/7 Instant AI Drills',
      'Flexible Anytime Access'
    ],
    recommended_for: 'Working professionals seeking maximum curriculum depth and the freedom to learn anytime.',
    is_active: true,
    display_order: 2
  },
  {
    id: 'ai-tutor',
    slug: 'ai-tutor',
    title: '24/7 AI Tutor',
    tagline: 'Instant 24/7 on-demand speaking drills — start anytime, day or night',
    badge: '24/7 Anytime • Budget-Friendly (-30%)',
    badge_color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    price_multiplier: 0.7,
    icon_type: 'bot',
    icon_color: 'text-emerald-600 dark:text-emerald-400',
    features: [
      'Instant 24/7 access (Use anytime, no batch wait)',
      'Unlimited interactive voice/text roleplays',
      'Instant real-time grammar & pronunciation feedback',
      'Zero scheduling constraints — practice day or night',
      'Self-paced CEFR mock examinations'
    ],
    deliverables: [
      'Instant 24/7 Activation',
      'Unlimited AI Voice/Text Drills',
      'Consular Mock Scenarios'
    ],
    recommended_for: 'Independent learners wanting immediate 24/7 anytime practice with zero batch waiting.',
    is_active: true,
    display_order: 3
  }
];
