/**
 * PURNA YOGAM Firestore Security Rules Test Cases (Dirty Dozen Verification)
 * Run with Firebase Emulator Suite when testing locally.
 */
export const dirtyDozenSecurityCases = [
  { id: 1, name: 'Unauthenticated journal write', path: 'users/attacker/journalEntries/j1', expected: 'PERMISSION_DENIED' },
  { id: 2, name: 'Cross-user private journal read', path: 'users/userA/journalEntries/j1', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Self-assigned admin role on signup', path: 'users/userA', expected: 'PERMISSION_DENIED' },
  { id: 4, name: 'Shadow field injection on profile update', path: 'users/userA', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Non-admin write to /admins', path: 'admins/userA', expected: 'PERMISSION_DENIED' },
  { id: 6, name: 'Unverified email staff CMS write', path: 'cmsItems/item1', expected: 'PERMISSION_DENIED' },
  { id: 7, name: 'Oversized 100KB payload rejection', path: 'users/userA/journalEntries/j2', expected: 'PERMISSION_DENIED' },
  { id: 8, name: 'Malformed document ID rejection', path: 'users/userA/bookmarks/bad..id', expected: 'PERMISSION_DENIED' },
  { id: 9, name: 'Backdated createdAt forgery', path: 'users/userA/journalEntries/j3', expected: 'PERMISSION_DENIED' },
  { id: 10, name: 'Public list of draft CMS items', path: 'cmsItems', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Audit log deletion by staff', path: 'auditLogs/log1', expected: 'PERMISSION_DENIED' },
  { id: 12, name: 'Certificate score > 100 or spoofed uid', path: 'certificates/PY-CERT-9999', expected: 'PERMISSION_DENIED' }
];
