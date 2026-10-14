import type { AuthUser, UserRole } from '../types/types';

/**
 * Normalize raw backend user data into clean AuthUser format
 */
export function normalizeAuthUser(raw: any): AuthUser {
  if (!raw) {
    return {
      id: '',
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      name: '',
      role: 'student',
    };
  }

  const firstName = raw.first_name || '';
  const lastName = raw.last_name || '';
  const fullName = raw.name || `${firstName} ${lastName}`.trim() || raw.username || raw.email || 'Member';

  // Determine user role
  let role: UserRole = raw.role || 'student';
  if (raw.is_superuser) {
    role = 'super_admin';
  } else if (raw.roles && Array.isArray(raw.roles) && raw.roles.length > 0) {
    if (raw.roles.includes('super_admin')) role = 'super_admin';
    else if (raw.roles.includes('hr')) role = 'hr';
    else if (raw.roles.includes('staff')) role = 'staff';
    else if (raw.roles.includes('student')) role = 'student';
  } else if (raw.is_staff && role === 'student') {
    role = 'staff';
  }

  // Derive department
  let department = raw.department;
  if (!department) {
    if (role === 'super_admin') department = 'Executive Governance & Platform Super Admin';
    else if (role === 'hr') department = 'Global Human Resources & Talent Recruitment';
    else if (role === 'staff') department = 'Consular Processing & Advisory';
  }

  // Identifier code
  const identifierCode = raw.identifierCode || raw.code || (
    role === 'super_admin' ? 'ILA-ROOT-001' :
    role === 'staff' ? `ILA-EMP-${raw.id || '104'}` :
    role === 'hr' ? `ILA-HR-${raw.id || '208'}` :
    `ILA-STU-${raw.id || Math.floor(1000 + Math.random() * 9000)}`
  );

  return {
    id: raw.id ?? raw.uuid ?? '',
    uuid: raw.uuid,
    username: raw.username || raw.email || '',
    email: raw.email || '',
    first_name: firstName,
    last_name: lastName,
    name: fullName,
    phone: raw.phone || raw.phone_number || '',
    phone_number: raw.phone_number || raw.phone || '',
    role,
    roles: raw.roles || [role],
    is_active: raw.is_active !== false,
    is_staff: Boolean(raw.is_staff),
    is_superuser: Boolean(raw.is_superuser),
    avatar: raw.avatar,
    franchise_id: raw.franchise_id || (raw.franchise?.id ?? null),
    franchise_name: raw.franchise_name || raw.franchise?.name,
    franchise_code: raw.franchise_code || raw.franchise?.code,
    franchises: raw.franchises || (raw.franchise ? [raw.franchise] : []),
    department,
    destination: raw.destination || '🇩🇪 Germany / 🇨🇦 Canada',
    program: raw.program || 'Higher Education & Visa Services',
    identifierCode,
  };
}
