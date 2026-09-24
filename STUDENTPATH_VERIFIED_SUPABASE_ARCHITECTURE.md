# StudentPath — Verified Supabase Architecture Report

## Inspection status

This report was produced from repository evidence plus a live authenticated Supabase Dashboard session. It is read-only and no database objects, policies, buckets, auth settings, or project settings were changed.

---

## 1. Executive Summary

- The live project is StudentPath and the project ref is `hiattulermsyqejkgloo`.
- The live project URL is `https://hiattulermsyqejkgloo.supabase.co`.
- The app’s Supabase client is configured from `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in [src/lib/supabase.ts](src/lib/supabase.ts) and [src/lib/auth.ts](src/lib/auth.ts).
- The live database contains public tables in the `public` schema, including at least: `careers`, `career_future_roles`, `career_insights`, `career_path_steps`, `career_scenes`, `career_why_exists`, `exams`, `exam_details`, and `profiles`.
- The live dashboard confirms the project is healthy and has no migrations recorded in the migration history view.
- The live project has Email and Google auth enabled, sign-ups enabled, and email confirmation enabled.
- The app-side admin flow is not protected by a real server-side auth check: [middleware.ts](middleware.ts) returns `NextResponse.next()` for all admin/explore traffic, and [src/app/admin/actions.ts](src/app/admin/actions.ts) performs writes through the anonymous client without demonstrated role enforcement.
- The live database schema should still be treated as application-backed and not fully source-controlled in the repo because there is no `supabase/` migrations directory in the project.

---

## 2. Project identity and live verification

| Item | Verified result | Evidence |
|---|---|---|
| Project name | Verified | StudentPath visible in live authenticated Supabase Dashboard |
| Project ref | Verified | `hiattulermsyqejkgloo` |
| Project URL | Verified | `https://hiattulermsyqejkgloo.supabase.co` |
| Repo URL match | Verified | Matches `NEXT_PUBLIC_SUPABASE_URL` in [.env.local](.env.local) and in [src/lib/supabase.ts](src/lib/supabase.ts) |
| Dashboard status | Verified | Project healthy and reachable |
| Migrations | Verified | No migrations present in the live project |

This report intentionally does not expose tokens or secrets. The anon key and admin secrets in [.env.local](.env.local) were not duplicated in the report.

---

## 3. Repository-to-live schema alignment

The app expects these tables and data contracts in the database:

- `careers`
- `career_insights`
- `career_why_exists`
- `career_scenes`
- `career_path_steps`
- `career_future_roles`
- `exams`
- `exam_details`
- `profiles`
- `site_settings` (used in admin code, but not present in the live schema inventory)

The live schema inventory confirms the actual public tables present include the core data tables above, and the app’s contract aligns with the live database for the public-facing tables. `site_settings` is absent from the live schema, which means the app appears to assume a table that is not live in the current production-like Supabase project.

### Application-side evidence

- [src/lib/supabase.ts](src/lib/supabase.ts): public client for read/write access
- [src/lib/auth.ts](src/lib/auth.ts): auth client using the same project URL and anon key
- [src/app/auth/page.tsx](src/app/auth/page.tsx): reads `profiles.role` and expects a trigger-created row for new auth users
- [src/app/admin/actions.ts](src/app/admin/actions.ts): inserts/updates/deletes across `careers`, child tables, `exams`, and other admin content
- [src/components/ImageUpload.tsx](src/components/ImageUpload.tsx): storage operations through the public client

### Live database evidence

The live dashboard/SQL metadata confirmed the following schema inventory in `public`:

- `careers`
- `career_future_roles`
- `career_insights`
- `career_path_steps`
- `career_scenes`
- `career_why_exists`
- `exams`
- `exam_details`
- `profiles`

The explicit absence of `site_settings` is a material mismatch from the app-side expectations, and it should be treated as a live configuration gap unless the admin code is being run against a different environment.

---

## 4. Column-level verification summary

The live schema metadata was inspected for the relevant table columns. The core app tables are present and the column structure aligns with the app’s data model for the key public-content tables.

### `careers`

The live `careers` table includes the expected content columns used by the app, such as:

- `id`
- `title`
- `slug`
- `category`
- `description`
- `salary`
- `demand`
- `difficulty`
- `future_scope`
- `hero_image`
- `hero_video`
- `primary_color`
- `secondary_color`
- `universe_nodes`
- `paths`

### `exams`

Live `exams` table includes the app-used columns, including:

- `id`
- `title`
- `slug`
- `category`
- `description`
- `exam_date`
- `registration_link`
- `official_website`
- `eligibility`
- `difficulty`

### `profiles`

The live `profiles` table includes the application-relevant identity and role columns used when redirecting after login.

### Child tables

The child tables (`career_insights`, `career_why_exists`, `career_scenes`, `career_path_steps`, `career_future_roles`, `exam_details`) are present and use the application-style slug/id joins expected by the app.

---

## 5. Foreign keys, indexes, and constraints

### Live verification status

The live dashboard metadata was queried and the public schema structure was checked. The project has the relevant tables, but the live inspection did not reveal the full set of foreign-key and index metadata in the final report context needed for a full constraint inventory.

### What is verified

- The relationship pattern in the app strongly indicates joins by `career_slug` and `exam_id`.
- The `profiles` table is the auth identity linkage table.
- The app’s route/page logic assumes these joins are valid.

### What is not yet fully verified in this final report

- Full foreign key inventory
- Full index inventory
- Primary key declarations beyond the live table presence
- Unique constraint list
- Check constraints
- Trigger internals and function bodies

The repository itself does not include the migration definitions, so a full database constraint audit requires the live Dashboard metadata or a schema dump.

---

## 6. RLS and security posture

### Live verification status

RLS policy details were not exhaustively reproduced in this final pass from the dashboard UI, so the final status is based on the application’s actual code and the database schema state that was verified.

### Verified application risk

The following are confirmed by code inspection:

- [middleware.ts](middleware.ts) returns `NextResponse.next()` without checking user authentication or role.
- [src/app/admin/actions.ts](src/app/admin/actions.ts) performs create/update/delete operations on protected content using the public Supabase client.
- [src/app/api/admin/login/route.ts](src/app/api/admin/login/route.ts) creates an `admin_session` cookie, but no later server-side verification was found in the repo.
- The app defines the Supabase client without an explicit service-role or server-only admin path in the inspected code.

### Security conclusion

The admin panel is not protected by a verified, server-side authorization mechanism in the code inspected. Any live RLS policy status must still be checked in the Supabase dashboard, but the app path itself is not hardened against unauthorized admin access.

---

## 7. Storage

### Verified application usage

The app uses a storage bucket named `career-media` in:

- [src/components/ImageUpload.tsx](src/components/ImageUpload.tsx)
- [src/app/admin/(dashboard)/media/page.tsx](src/app/admin/(dashboard)/media/page.tsx)
- [src/app/admin/(dashboard)/page.tsx](src/app/admin/(dashboard)/page.tsx)

### Live verification status

The bucket metadata and its Storage policies were not fully reproduced in this final report from the dashboard UI. Therefore the live bucket existence, public/private state, allowed MIME types, object size limits, and CRUD policy definitions remain to be confirmed in the dashboard.

### Risk note

Because the app uses the anonymous client for upload/list/delete flows, a permissive Storage policy would create a direct write exposure path.

---

## 8. Authentication and profile flow

### Verified live auth settings

The live project has these auth features enabled:

- Email authentication enabled
- Google authentication enabled
- Sign-ups enabled
- Email confirmation enabled

The app code expects:

- `auth.users` to create a `profiles` row automatically
- `profiles.role` to determine whether the user is redirected to `/admin` or `/explore`
- Google sign-in to redirect to `${window.location.origin}/explore`
- Email sign-up to redirect to `${window.location.origin}/auth/callback`

### Important mismatch

The route `/auth/callback` is referenced in [src/app/auth/page.tsx](src/app/auth/page.tsx), but the current app tree does not include a matching callback route. This is an application-side redirection mismatch that must be checked in the live Auth settings and route configuration before production reliance.

### Profile trigger note

The app comments explicitly mention a trigger `on_auth_user_created` to populate the `profiles` table automatically. This trigger was not fully reproduced in the final dashboard metadata summary, so it needs explicit verification if profile-based role logic is relied upon for authorization.

---

## 9. Functions and triggers

The repository contains no checked-in Supabase SQL migrations or function definitions. The live dashboard does show the project is not using visible migration history in the project metadata, but the final report did not include a full trigger/function inventory list.

The app assumes a trigger named `on_auth_user_created` to create profile rows. That trigger should be treated as inferred application behavior until live SQL or trigger metadata confirms it.

---

## 10. Migration history and source control state

### Verified outcome

- The repo contains no `supabase/` folder or migration directory.
- The live Supabase dashboard confirms there are no recorded migrations for the project.

### Conclusion

This means the database schema is effectively unmanaged in version control within the app repo. The live schema is therefore the source of truth, but the project itself is not currently storing its database schema in a migration repo that can be rebuilt from source.

---

## 11. Verified mismatch inventory

| Area | Status | Finding |
|---|---|---|
| Project identity | Verified | Project name/ref/URL all match live dashboard |
| DB schema inventory | Verified | Core tables are live and present |
| `site_settings` table | Verified absent live | App references it, but live schema does not have it |
| Auth providers | Verified enabled | Email and Google enabled |
| Sign-ups | Verified enabled | Sign-ups are active |
| Email confirmation | Verified enabled | Needed for signup flow |
| Migrations | Verified absent | No migration history in project |
| Admin auth | Verified weak in app | Middleware and actions do not enforce server-side auth |
| Callback route | Verified mismatch | `/auth/callback` referenced but not found in app routes |

---

## 12. Final conclusion

StudentPath is a real Supabase project with a healthy live database and an app configuration that aligns with the project URL and anon key. The live database contains the major public content tables and the auth system is enabled. The most important unresolved risk is not schema absence but application security design: the admin panel and data-mutating actions are not protected by a verified auth/role check in the inspected code path.

The repository also does not carry a source-controlled Supabase migration set, and the live schema includes a `site_settings` gap relative to the app code. That means the app is now dependent on the live database schema rather than on a declarative migration history kept in the repo.

This phase was read-only and ended with the verified architecture report, as required.

---

## 13. Final security/database verification pass

This final pass was limited to the unresolved security and database metadata requested by the follow-up verification brief. The authenticated Dashboard session confirmed that the `career-media` Storage bucket exists and is public, with an unset file-size override (Dashboard displays the 50 MB default) and no MIME restriction (`Any`). The Storage bucket list displayed `2` policies for `career-media`; the policy detail page did not render the policy definitions during this session, so their names, roles, operations, `USING`, and `WITH CHECK` expressions remain **UNVERIFIED**.

The Supabase SQL editor and Table Editor were reachable, but the browser automation session could not reliably submit catalog queries through the Monaco editor. Consequently, the following items must not be represented as complete or verified from this pass:

- Complete RLS policy inventory for the nine requested tables
- Exact RLS `USING` and `WITH CHECK` expressions
- Complete Storage policy definitions
- Complete foreign-key list and `ON DELETE`/`ON UPDATE` actions
- Complete primary, unique, check, NOT NULL, default, and identity metadata
- Complete index list, including partial/composite status
- Complete function signatures, languages, and security modes
- Complete `auth.users`/`profiles` trigger inventory and trigger function bodies

### Storage evidence captured

| Item | Verified result |
|---|---|
| `career-media` exists | YES |
| Public/private | PUBLIC |
| File-size limit | Dashboard shows `Unset (50 MB)` |
| MIME restrictions | `Any` |
| Policy count shown by Dashboard | `2` |
| Policy operation/role/expressions | UNVERIFIED; policy detail did not render |

Because the bucket is public, anonymous read access to objects is expected by the bucket configuration. Anonymous upload, replace, delete, and list access cannot be concluded from the bucket visibility alone and remain **UNVERIFIED** until the two Storage policy definitions are captured.

### Requested database inventory status

| Area | Final status |
|---|---|
| RLS on `careers`, child career tables, `exams`, `exam_details`, `profiles` | UNVERIFIED in this pass |
| RLS policy names/operations/roles/expressions | UNVERIFIED in this pass |
| Foreign keys | UNVERIFIED in this pass; application relationships remain distinct from database FKs |
| Primary/unique/check constraints | UNVERIFIED in this pass |
| Slug uniqueness | UNVERIFIED in this pass; application use does not prove a unique constraint |
| Indexes | UNVERIFIED in this pass |
| Functions and security mode | UNVERIFIED in this pass |
| Auth/profile triggers and function bodies | UNVERIFIED in this pass |
| `public.site_settings` | MISSING from the previously verified live public-table inventory |

### Security verdict based only on verified evidence

**CRITICAL**

- **Cause:** Admin middleware does not authenticate or authorize requests, and admin server actions use the public client without a demonstrated role check.
- **Affected component:** [middleware.ts](middleware.ts), [src/app/admin/actions.ts](src/app/admin/actions.ts), [src/app/api/admin/login/route.ts](src/app/api/admin/login/route.ts).
- **Impact:** An attacker who reaches the admin routes may be able to invoke content mutation paths; the impact depends on the live RLS policies, which are not verified here.
- **Evidence:** `middleware.ts` returns `NextResponse.next()` unconditionally; admin actions call Supabase writes directly; the custom `admin_session` cookie was not found being verified elsewhere.
- **Recommended fix:** Require authenticated server-side role authorization for every admin page, route handler, server action, and Storage mutation before production. This is a recommendation only; no fix was implemented.

**HIGH**

- **Cause:** The app references `/auth/callback`, but no matching route is present in the current app tree.
- **Affected component:** [src/app/auth/page.tsx](src/app/auth/page.tsx).
- **Impact:** Email confirmation may return users to a missing route or fail to establish the expected client session flow.
- **Evidence:** `emailRedirectTo` is `${window.location.origin}/auth/callback`; the repository has no `src/app/auth/callback` route.
- **Recommended fix:** Add and test the callback flow, or change the redirect to a verified route and align the Supabase Auth allow-list. No fix was implemented.

**HIGH**

- **Cause:** The live Storage bucket is public and the app uses the anonymous client for media mutations; the two Storage policies were not available for inspection.
- **Affected component:** `career-media`, [src/components/ImageUpload.tsx](src/components/ImageUpload.tsx).
- **Impact:** If either policy grants anonymous mutation access, unauthenticated users could upload, replace, delete, or enumerate media.
- **Evidence:** Dashboard shows `career-media` as PUBLIC with two policies; policy expressions were not rendered.
- **Recommended fix:** Verify and restrict Storage policies to authenticated administrators before production. No fix was implemented.

**MEDIUM**

- **Cause:** The app references `site_settings`, but it is absent from the verified live public table inventory.
- **Affected component:** [src/app/admin/actions.ts](src/app/admin/actions.ts) and admin settings UI.
- **Impact:** Settings writes can fail at runtime or leave the admin settings workflow nonfunctional.
- **Evidence:** Live inventory did not contain `public.site_settings`; admin code calls `.from("site_settings")`.
- **Recommended fix:** Reconcile the code and live schema deliberately in a later change. Do not create the table as part of this report.

**INFORMATIONAL**

- No source-controlled Supabase migrations exist in the repository, and the live project has no recorded migration history. This makes schema reproducibility and drift detection difficult.
- Application-level joins using `career_slug` and `exam_id` are not proof of database foreign keys.

### Architecture readiness answers

**A. Application architecture refactoring:** Yes, for non-security-sensitive refactoring, provided the live metadata gaps are documented. Do not treat authorization behavior as production-ready.

**B. Database migration creation:** Not safely from assumptions alone. First capture the complete live schema/constraints/functions/triggers, then baseline it before generating migrations.

**C. RLS redesign:** No. The current policy inventory and expressions are still missing from this verification record.

**D. Storage policy redesign:** No. The bucket is confirmed, but the two existing policy definitions are not captured.

**E. Information still missing:** The exact RLS policies, Storage policies, FKs, constraints, indexes, functions, trigger definitions, trigger function bodies/security modes, and Auth/profile trigger behavior.

**F. Must be fixed before production:** Enforce server-side admin authorization; verify or restrict Storage mutations; repair the email callback route; reconcile the missing `site_settings` dependency; capture and review the missing live security metadata.

**G. Can wait until later:** Migration source-control cleanup, index tuning after query-plan review, and non-critical schema naming/documentation improvements.

No database, Storage, Auth, RLS, trigger, function, migration, data, or application changes were made during this pass.
