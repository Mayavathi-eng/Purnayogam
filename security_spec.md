# PURNA YOGAM Firestore Security Specification

## 1. Data Invariants
1. **Owner Isolation**: All personal user data (`/users/{userId}`, `/users/{userId}/private/*`, `bookmarks`, `journalEntries`, `lessonProgress`, `practiceLogs`) can only be accessed by `request.auth.uid == userId` (or an active Admin where explicitly allowed for user management). Private journal entries are never readable by any other user, not even admins.
2. **No Self-Privilege Escalation**: A non-admin user creating or updating `/users/{userId}` can only hold `role == 'learner'` and cannot create or modify documents in `/admins/{adminUid}`.
3. **Strict Schema & Boundary Validation**: Every document create and update validates exact required keys, allowed keys (`hasOnly`), string length limits, valid IDs (`^[a-zA-Z0-9_\-]+$`), and server timestamps (`request.time`).
4. **Public Educational Access vs Staff Governance**: Published `/cmsItems` (`status == 'published'`) and `/siteSettings` are readable without sign-in so visitors enjoy free open learning. Drafts, edits, deletions, and `/auditLogs` are restricted to verified staff roles (`admin`, `editor`, `content_manager`).
5. **Immutable Audit Trail**: `/auditLogs` allows `create` only by verified staff with `actorUid == request.auth.uid` and `createdAt == request.time`; updates and deletes are unconditionally denied.
6. **Certificate Authenticity**: `/certificates/{certificateId}` permits public `get` by exact ID for verification, restricts `list` to owner or admin, and enforces `uid == request.auth.uid`, valid score `0..100`, and `issuedAt == request.time` on creation.

## 2. Dirty Dozen Adversarial Payloads
1. Unauthenticated write to `/users/attacker/journalEntries/j1` -> `PERMISSION_DENIED`.
2. Authenticated User B reading User A's private journal `/users/userA/journalEntries/j1` -> `PERMISSION_DENIED`.
3. Learner setting `role: "admin"` during `/users/{uid}` creation -> `PERMISSION_DENIED`.
4. Learner adding shadow field `isVerified: true` on `/users/{uid}` update -> `PERMISSION_DENIED`.
5. Learner writing directly to `/admins/{uid}` -> `PERMISSION_DENIED`.
6. Unverified email (`email_verified: false`) attempting staff CMS write -> `PERMISSION_DENIED`.
7. Oversized `100KB` string injected into `title` or `content` -> `PERMISSION_DENIED`.
8. Malformed document ID with path traversal characters (`../bad`) -> `PERMISSION_DENIED`.
9. Client forging backdated `createdAt` timestamp instead of `request.time` -> `PERMISSION_DENIED`.
10. Non-staff user reading `draft` CMS items via `list` -> `PERMISSION_DENIED`.
11. Staff editor deleting an entry in `/auditLogs` -> `PERMISSION_DENIED`.
12. User creating a certificate with `uid` belonging to another user or score > 100 -> `PERMISSION_DENIED`.
