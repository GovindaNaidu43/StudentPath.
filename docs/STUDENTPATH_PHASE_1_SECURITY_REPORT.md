# StudentPath Phase 1 Security Report

## Status

**IMPLEMENTED:** Supabase SSR session handling, server-side profile-role authorization, protected admin layout/actions/APIs, callback route, validated mentor requests, and server-side Storage mutations.

**NOT IMPLEMENTED:** Database migrations, schema changes, RLS changes, Storage policy changes, bucket visibility changes, trigger/function changes, and broad architecture refactoring.

**REQUIRES MANUAL VERIFICATION:** Supabase Auth redirect allow-list, existing profile trigger behavior, RLS policy behavior, and the two existing `career-media` Storage policies.

## Files changed

- `package.json`, `package-lock.json`: added `@supabase/ssr`.
- `src/lib/auth.ts`: changed the browser auth client to Supabase SSR browser storage.
- `src/lib/auth/server.ts`: added cookie-backed server Supabase client.
- `src/lib/auth/authorization.ts`: added `getCurrentUser`, `getCurrentProfile`, `requireAuthenticatedUser`, and `requireAdmin`.
- `src/lib/server-validation.ts`: added bounded string, ID, JSON-array, and request-string validation.
- `src/app/page.tsx`: uses server-side user detection for the landing redirect.
- `src/app/auth/page.tsx`: routes email and Google flows through `/auth/callback`.
- `src/app/auth/callback/route.ts`: exchanges the Auth code for a session and routes the user safely.
- `src/app/admin/(dashboard)/layout.tsx`: rejects unauthenticated and non-admin users server-side.
- `src/app/admin/actions.ts`: authorizes and validates every admin mutation; related mutation failures are no longer silently ignored.
- `src/app/api/admin/ai-test/route.ts`: requires admin authorization and validates prompt input.
- `src/app/api/admin/login/route.ts`: removed the unverified `admin_session` cookie behavior; endpoint now reports that Supabase Auth is authoritative.
- `src/app/api/admin/media/route.ts`: added authenticated server-side list/upload/delete operations for `career-media`.
- `src/app/api/mentor/route.ts`: validates message structure, roles, count, and content length; preserves public mentor access.
- `src/components/ImageUpload.tsx`: uses the authorized media API for upload/delete.
- `src/app/admin/(dashboard)/media/page.tsx`: uses the authorized media API for list/upload/delete while retaining public URL reads.
- `src/app/admin/(dashboard)/settings/page.tsx`: uses the server client and disables saving when `site_settings` is missing; removed schema-creation instructions.

## Authentication architecture

The authoritative flow is now:

`Supabase Auth session -> server getUser() -> profiles.id/role -> authorization decision`.

The application does not use email, request data, local storage flags, or `admin_session` for admin authorization. The existing `profiles.role` values `student` and `admin` are used without adding roles.

The browser auth client uses `createBrowserClient`; server-rendered and server-mutation paths use the cookie-backed SSR client. The callback exchanges the Auth `code` and permits `/admin` only when the resulting profile role is `admin`; all other users go to `/explore`.

## Admin authorization

The shared admin dashboard layout calls `requireAdmin()`. Every action in `src/app/admin/actions.ts` calls `requireAdmin()` inside the mutation path, including career, exam, and settings operations. The admin AI route and media route use the same authorization helper.

This is defense in depth: layout protection improves routing behavior, but actions and APIs independently enforce authorization.

## API protection and validation

- Admin AI: unauthenticated requests receive `401`; authenticated non-admin requests receive `403`; prompt must be a non-empty string no longer than 12,000 characters.
- Mentor: remains public to preserve the existing product behavior, but rejects malformed bodies, non-array messages, more than 20 messages, invalid roles, empty content, and content over 4,000 characters.
- Server errors return generic client-safe messages. Detailed database errors are logged server-side only.

## Storage handling

The `career-media` bucket remains public as verified. No bucket or policy was changed. Public URL reads remain compatible with the existing UI. Upload, list, and delete operations now go through `/api/admin/media`, which requires a verified admin session. The route rejects non-image/video files and files over the Dashboard’s 50 MB default.

**REQUIRES SUPABASE POLICY CHANGE:** None was performed or assumed. Whether the existing Storage policies permit the new server-side operations still requires manual verification because their exact definitions were not captured.

## Site settings

`public.site_settings` was verified missing in the live schema. It was not created. The settings page displays an unavailable-state notice, reads through the authenticated server client, and disables the save button when no row is available.

## Callback and profile trigger

The missing `/auth/callback` route is implemented using `exchangeCodeForSession`. Email confirmation and Google OAuth are directed through it. The Supabase Dashboard Auth redirect allow-list must still be manually confirmed.

No profile trigger was created or modified. The existing trigger/profile-row behavior remains a **REQUIRES MANUAL VERIFICATION** dependency. If the trigger is absent, the application will route a newly authenticated user to `/explore` rather than granting admin access.

## Tests executed

- `npx tsc --noEmit`: **PASS** after the final changes.
- `npm run build`: **PASS**. Next.js generated the new `/auth/callback` and `/api/admin/media` routes successfully.
- Focused ESLint on the Phase 1 security files: **PASS with one existing warning** for raw `<img>` usage in `ImageUpload.tsx`; no errors in the new security helpers or protected server paths.
- Full `npm run lint`: **NOT PASSING** because the repository already contains unrelated lint errors across existing components, including explicit `any` usage and React hook ordering issues. Those unrelated files were not changed.

## Known limitations

- RLS definitions were not changed and their complete live behavior remains a Supabase Dashboard verification dependency.
- Storage policy definitions were not changed and their exact operation/role expressions remain a manual verification dependency.
- The profile creation trigger was not created or changed.
- Existing admin page data reads outside the settings page still use the project’s existing public client where they predated this phase; mutation authorization is server-side.
- No automated browser test suite was present, so manual auth/admin/media flows still require execution with real student and admin accounts.

## Supabase Dashboard changes required

None were performed in this phase.

Before production, manually verify:

- Auth Site URL and redirect allow-list include the deployed `/auth/callback` URL.
- The existing `profiles` creation trigger exists and creates the expected row.
- RLS allows the authenticated admin server client to perform the required content mutations.
- The two existing `career-media` policies allow only the intended authenticated admin operations.

## Intentionally not changed

- No tables, columns, constraints, foreign keys, indexes, migrations, functions, or triggers.
- No RLS policies.
- No Storage policies or bucket visibility.
- No service-role credentials.
- No broad source-tree or Architecture 2.0 migration.
- No new product features or UI redesign.
