export const ROUTES = {
  HOME: '/',
  VISA_SERVICES: '/visa-services',
  WORK_AND_STUDY: '/work-and-study',
  STUDY_ABROAD: '/study-abroad',
  JOBS_AND_CAREERS: '/jobs-and-careers',
  REWARDS: '/rewards',
  PRODUCTS: '/products',
  COURSES: '/courses',
  DASHBOARD: '/dashboard',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
