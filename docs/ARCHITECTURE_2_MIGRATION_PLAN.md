# StudentPath Architecture 2.0 Migration Plan

## Status

This is a read-only, repository-specific planning document for Phase 3A. No source files, imports, routes, database objects, authentication, RLS, Storage policies, or application behavior were modified while preparing this plan.

The plan is based on the current repository, the Phase 2 locked database baseline, and the existing Phase 1 security implementation. It does not invent feature implementations for domains that do not currently exist.

## 1. Executive summary

StudentPath is currently a Next.js App Router application with a flat route tree, a large shared `components/` directory, direct Supabase reads in route pages, server actions colocated under `app/admin`, and a small Phase 1 server-auth layer under `src/lib/auth/`.

Architecture 2.0 should be introduced incrementally around real ownership boundaries:

1. Preserve URLs and route entry points.
2. Establish shared infrastructure and type boundaries before moving domain UI.
3. Move public career and exam reads behind repositories/services one domain at a time.
4. Move admin mutations behind `server/actions`, authorization, validation, and repositories without weakening Phase 1 protections.
5. Separate domain-owned UI from genuinely shared layout/navigation/media/feedback UI.
6. Move AI and Storage integrations behind server-owned boundaries.
7. Add route groups only when they preserve the current URL contract and reduce ownership ambiguity.
8. Delete or retain legacy files only after import and runtime verification.

The first implementation slice should be the Careers domain because it is the largest real content boundary and exposes the current direct-data-access pattern. Authentication and admin authorization should be moved only after their Phase 1 behavior is covered by tests or manual checks.

## 2. Current architecture snapshot

### Framework and runtime

- Next.js App Router with React and TypeScript.
- Route files live directly under `src/app/`.
- Server pages query Supabase through `src/lib/supabase.ts`.
- Client components use `src/lib/auth.ts` for browser Auth calls.
- Server-only Auth uses `src/lib/auth/server.ts` and `src/lib/auth/authorization.ts`.
- Admin mutations are server actions in `src/app/admin/actions.ts`.
- API routes live under `src/app/api/`.
- Gemini is called directly from the mentor and admin AI route handlers.
- Tailwind/PostCSS styling is centralized in `src/app/globals.css` plus component-local class strings.

### Current architectural shape

```text
Route/page
  -> direct Supabase read in several pages
  -> shared component tree

Admin form/component
  -> src/app/admin/actions.ts
  -> Phase 1 authorization + validation
  -> Supabase server client

Client UI
  -> browser Auth client or fetch('/api/...')

Mentor/admin AI API
  -> Gemini SDK directly in route handler

Media UI
  -> public Storage URL reads
  -> /api/admin/media for protected mutations
```

### Current gaps

- There are no `features/`, `server/`, `config/`, `types/`, `hooks/`, or `tests/` directories in the current source tree.
- Public pages and admin pages still query Supabase directly.
- The domain model is represented by many globally named components rather than domain-owned feature modules.
- `src/lib/supabase.ts` is a generic public client and has no repository boundary.
- The Phase 1 server authorization boundary exists but is colocated under `lib` and is imported directly by the admin route layout/actions/API routes.
- There is no typed database contract generated from the live schema; the Phase 2 baseline intentionally leaves database metadata incomplete.
- `site_settings` is referenced by the admin UI/action but is absent from the locked live database baseline.
- No currently discovered `loading.tsx`, `error.tsx`, or `not-found.tsx` files exist in the source tree.

## 3. Actual source-tree inventory

### Root and application infrastructure

| Current file/directory | Classification | Current responsibility | Target direction |
|---|---|---|---|
| `src/app/layout.tsx` | Route/layout | Global HTML, metadata, body shell | Keep as root layout; shared metadata can later move to `config/site.ts` |
| `src/app/globals.css` | Style | Global Tailwind layers, body, utility classes, animations | Keep initially; later split only stable global styles into `styles/` |
| `src/app/page.tsx` | Route/page | Marketing landing page and authenticated redirect | `(marketing)/page.tsx` after route-group migration; preserve `/` |
| `src/app/robots.ts` | Route metadata | Robots metadata | Keep under `app` or move with SEO only after route tests |
| `src/app/sitemap.ts` | Route metadata | Sitemap metadata | Keep under `app`; data source may later use repositories |
| `middleware.ts` | Authorization boundary | Current matcher/pass-through middleware | Keep at root; only expand for explicit early routing, never replace server authorization |
| `next.config.ts` | Configuration | Next configuration | Keep root; target `config/` should not absorb framework config |
| `tailwind.config.js` | Configuration | Tailwind configuration | Keep root until a separate styling phase |
| `postcss.config.js` | Configuration | PostCSS configuration | Keep root |
| `tsconfig.json` | Configuration | TypeScript paths/compiler settings | Keep root |
| `eslint.config.mjs` | Configuration | ESLint configuration | Keep root |
| `package.json` | Configuration | Scripts and dependencies | Keep root |

### Additional current files

| Current file | Classification | Current responsibility | Target direction |
|---|---|---|---|
| `src/sections/LandingHero.tsx` | Marketing feature UI | Landing-page hero composition | Keep route-owned or in a genuinely shared marketing component location; do not create `features/marketing` prematurely |
| `src/components/ExploreClient.tsx` | Platform feature UI | Client-side explore composition and filtering | `features/careers`/`features/exams` only after ownership is separated; do not move as a generic shared component |
| `src/components/QuickExplore.tsx` | Platform/shared UI candidate | Quick exploration controls used by Explore UI | Keep near Explore until demonstrated reuse justifies shared placement |
| `src/components/Scene.tsx` | Shared visual UI candidate | Scene/visual rendering support | Investigate usage before assigning to Careers or shared media |

### Public and account routes

| Current file | Classification | Current responsibility | Target location | Main dependency/risk |
|---|---|---|---|---|
| `src/app/about/page.tsx` | Route/page | Static about page with shared Navbar/Footer | `src/app/(marketing)/about/page.tsx` | Preserve `/about`; shared navigation imports |
| `src/app/auth/page.tsx` | Route/page | Email login/signup and Google OAuth UI | `src/app/(account)/auth/page.tsx` | Must preserve browser Auth client and callback URLs |
| `src/app/auth/callback/route.ts` | Route/API boundary | Exchanges Supabase Auth code and routes by profile role | `src/app/(account)/auth/callback/route.ts` or keep route path during transition | Must preserve `/auth/callback` and SSR cookie handling |
| `src/app/profile/page.tsx` | Route/page | Client profile display and logout | `src/app/(account)/profile/page.tsx` | Browser Auth client; profile domain ownership |
| `src/app/explore/page.tsx` | Route/page | Careers/exams public dashboard, direct reads, category grouping | `src/app/(platform)/explore/page.tsx` | First public route to split after Careers repository exists |
| `src/app/explore/skills/page.tsx` | Route/page | Static skills exploration view | `src/app/(platform)/explore/skills/page.tsx` then `features/skills` if data appears | Currently no live data boundary |
| `src/app/explore/colleges/page.tsx` | Route/page | Static colleges exploration view | `src/app/(platform)/explore/colleges/page.tsx` then `features/colleges` if data appears | Currently presentation-only |
| `src/app/explore/guide-path/page.tsx` | Route/page | Static/form-like guide path view | `src/app/(platform)/explore/guide-path/page.tsx` or `features/onboarding` after behavior exists | No persisted data flow currently verified |
| `src/app/explore/mentor/page.tsx` | Route/page | Mentor page composition and client chat state | `src/app/(platform)/explore/mentor/page.tsx` plus `features/mentor` | Must preserve public mentor access and API contract |
| `src/app/career/[slug]/page.tsx` | Route/page | Career aggregate read and detail composition | `src/app/(platform)/career/[slug]/page.tsx` plus `features/careers` | Several child table reads and duplicated CareerInsights read |
| `src/app/exam/[slug]/page.tsx` | Route/page | Exam and exam-details direct reads | `src/app/(platform)/exam/[slug]/page.tsx` plus `features/exams` | `exam_details.exam_id` remains application-level until database proof |
| `src/app/test-ai/page.tsx` | Route/page | Development/test page for mentor API | Keep as explicit test route or move to `tests/manual` later | Do not confuse with admin AI authorization |

### Admin routes and actions

| Current file | Classification | Target direction | Risk |
|---|---|---|---|
| `src/app/admin/layout.tsx` | Shared admin route layout | Keep under `app/admin`; retain shell boundary | Must not be moved before route behavior is covered |
| `src/app/admin/(dashboard)/layout.tsx` | Authorization boundary/layout | Keep admin route group; authorization may call `server/authorization` later | Phase 1 `requireAdmin()` must remain authoritative |
| `src/app/admin/(dashboard)/page.tsx` | Route/page | `app/admin/page.tsx` or retained group page plus admin dashboard feature | Direct career/exam/Storage reads should move behind admin repositories/services |
| `src/app/admin/(dashboard)/careers/page.tsx` | Route/page | `features/careers/admin` UI with `app/admin/careers/page.tsx` route wrapper | Direct `careers` query and server action import |
| `src/app/admin/(dashboard)/careers/CareersClient.tsx` | Feature UI | `features/careers/admin/CareersClient.tsx` | Imports admin action directly; preserve action contract during first move |
| `src/app/admin/(editor)/careers/[id]/page.tsx` | Route/page | `app/admin/careers/[id]/page.tsx` route wrapper plus `features/careers/admin` | Direct Supabase read and large form dependency |
| `src/app/admin/(dashboard)/exams/page.tsx` | Route/page | `features/exams/admin` UI with stable route wrapper | Direct `exams` query and action import |
| `src/app/admin/(dashboard)/exams/[id]/page.tsx` | Route/page | `features/exams/admin` UI with stable route wrapper | Direct Supabase read and action import |
| `src/app/admin/(dashboard)/media/page.tsx` | Route/page | Keep route under `app/admin`; reusable visual pieces belong in `components/media` | Uses public URL reads and protected media API |
| `src/app/admin/(dashboard)/settings/page.tsx` | Route/page | Keep under `app/admin` until an actual settings data model exists | `site_settings` is missing; do not create an admin-settings feature |
| `src/app/admin/(dashboard)/ai/page.tsx` | Route/page | `features/mentor/admin` or `features/ai` only after domain ownership is decided | Calls protected API; avoid coupling to public mentor feature |
| `src/app/admin/actions.ts` | Server action | All career/exam/settings mutations and related child-row writes | `src/server/actions/admin.ts` or domain-specific action files after repository layer exists |
| `src/app/api/admin/ai-test/route.ts` | API route/integration | `app/api/admin/ai-test/route.ts` remains route; Gemini call to `server/integrations/ai` | Preserve 401/403 and prompt validation |
| `src/app/api/admin/media/route.ts` | API route/integration | Route remains; Storage operations move to `server/services/storage` or repository | Preserve admin authorization and public bucket behavior |
| `src/app/api/admin/login/route.ts` | Legacy/obsolete API route | Remove only after all callers are proven absent and deployment behavior is checked | Phase 1 returns 410; deletion is cleanup, not first migration step |

### Components

#### Shared layout, navigation, feedback, and media candidates

| Current files | Classification | Target direction |
|---|---|---|
| `Navbar.tsx`, `DashboardNavbar.tsx`, `MobileBottomNav.tsx` | Shared navigation | `components/navigation/` |
| `AdminSidebar.tsx`, `AdminTopbar.tsx` | Admin layout UI | `components/layout/admin/` or remain admin-owned until admin slice |
| `Footer.tsx`, `ExploreFooter.tsx` | Shared/layout UI | `components/layout/` |
| `Reveal.tsx`, `SmoothScroll.tsx` | Shared behavior/UI | `components/ui/` or `lib/ui/` after usage review |
| `ImageUpload.tsx` | Shared media UI with admin behavior | `components/media/`; its mutation API remains server-owned |
| `LivePreviewPanel.tsx` | Admin/editor UI | `features/careers/admin/` unless reused elsewhere |
| `ContentRow.tsx` | Shared data-display UI candidate | `components/data-display/` |
| `ProfilePanel.tsx` | Account/navigation UI | `features/profile/` if it remains profile-specific; otherwise navigation |

#### Career-owned components

- `CareerCard.tsx`
- `TrendingCareerCard.tsx`
- `CareerDashboard.tsx`
- `CareerHero.tsx`
- `CareerInsights.tsx`
- `CareerJourneyRoad.tsx`
- `CareerPaths.tsx`
- `CareerRoadmap.tsx`
- `CareerScenes.tsx`
- `CareerFuture.tsx`
- `CareerCTA.tsx`
- `WhyCareerExists.tsx`
- `components/sections/CareersSection.tsx`
- `AdminCareerForm.tsx`
- `DeleteCareerButton.tsx`

Target: `features/careers/` with `features/careers/components/` and `features/careers/admin/` as needed. `CareerInsights.tsx` currently performs its own browser Supabase read and should be converted to receive feature data or use a feature repository boundary.

#### Exam-owned components

- `components/exam/ExamHero.tsx`
- `components/exam/ExamOverview.tsx`
- `components/exam/ExamEligibility.tsx`
- `components/sections/ExamsSection.tsx`
- `DeleteExamButton.tsx`

Target: `features/exams/`. Keep genuinely generic cards/rows in shared components only after reuse is demonstrated.

#### Mentor-owned components

- `components/mentor/MentorLanding.tsx`
- `components/mentor/MentorChat.tsx`
- `components/mentor/MentorInput.tsx`

Target: `features/mentor/`. The API route remains under `app/api/mentor`; Gemini client construction and prompt policy should later move to `server/integrations/ai` or `lib/ai`.

#### Landing/marketing components

- `components/landingpage/Hero.tsx`
- `Benefits.tsx`
- `CTA.tsx`
- `Features.tsx`
- `Footer.tsx`
- `Icons.tsx`
- `Navbar.tsx`
- `Pricing.tsx`
- `Showcase.tsx`
- `SocialProof.tsx`
- `Testimonials.tsx`

Target: keep route-owned under `(marketing)` or in genuinely shared component locations until a concrete marketing domain boundary exists. Do not create a `features/marketing` domain merely for folder symmetry.

### Libraries and data

| Current file | Classification | Target direction |
|---|---|---|
| `src/lib/supabase.ts` | Data-access infrastructure | `src/lib/supabase/client.ts` or repository-only client boundary |
| `src/lib/auth.ts` | Browser Auth infrastructure | `src/lib/auth/browser.ts` |
| `src/lib/auth/server.ts` | Server infrastructure | `src/lib/supabase/server.ts` or retain under `lib/auth` with clear naming |
| `src/lib/auth/authorization.ts` | Authorization | `src/server/authorization/` after import migration and tests |
| `src/lib/server-validation.ts` | Validation | `src/server/validation/` after callers are migrated |
| `src/data/career.ts` | Static/domain data | `features/careers/data/` if still used; investigate current imports first |
| `src/utils/cn.ts` | Utility | `src/lib/utils/cn.ts` |

No `hooks/`, `types/`, `config/`, `server/`, or generated database types currently exist. They should be created only when an actual extracted responsibility requires them.

## 4. Domain boundaries

| Domain | Exists today | Future ownership | Current boundary problem |
|---|---|---|---|
| Careers | Core table, career detail route, many components, admin editor/actions | `features/careers`, career repository/service/actions | Route, components, and actions all know database details; child reads use slugs directly |
| Exams | Core table/detail table, public route, admin CRUD, exam components | `features/exams`, exam repository/service/actions | Public/admin pages query directly; detail relationship is application-level |
| Skills | Static `/explore/skills` page only | `features/skills` when domain data/behavior exists | Currently presentation-only; do not invent repository or tables |
| Colleges | Static `/explore/colleges` page only | `features/colleges` when domain data/behavior exists | No data boundary currently exists |
| Roadmaps | Career path steps and static guide-path UI | Career-owned roadmap subdomain or future `features/roadmaps` | `career_path_steps` belongs to careers today; avoid premature extraction |
| Profile | Authenticated profile page, `profiles.role` read in auth flow | `features/profile` plus shared Auth services | Profile UI and Auth client usage are mixed; DB profile access is embedded in authorization |
| Mentor/AI | Public mentor page/API and admin AI test/API | `features/mentor`, `server/integrations/ai` | Prompt construction and Gemini client are route-owned; public and admin concerns differ |
| Admin | Admin routes, sidebar/topbar, actions, AI/media/settings | `app/admin` routes plus `server/actions/admin` and domain admin features | Admin pages directly query Supabase; settings depends on missing `site_settings` |
| Authentication | Auth page, callback, browser client, server authorization | `app/(account)` plus `lib/auth`/`server/authorization` | Phase 1 boundary exists but route group and naming are not yet unified |
| Media/Storage | Admin media page, reusable ImageUpload, media API, public bucket URLs | `components/media`, `lib/storage` or `server/services/storage` | Public reads and admin mutations cross client/server boundaries |
| Search | Query-string filtering in admin careers/exams only | `config`/feature search later | No standalone search domain exists; do not create one yet |
| Recommendations | No implementation found | Do not create until product behavior/data exists | Target architecture lists it, current code does not |
| Saved content | No implementation found | Do not create until product behavior/data exists | Target architecture lists it, current code does not |
| Progress | No implementation found | Do not create until product behavior/data exists | Target architecture lists it, current code does not |

## 5. Direct Supabase access inventory

These are current direct access points found in the source tree. They should be migrated behind repositories/services progressively, not all at once.

| Current access point | Access type | Current classification | Future boundary |
|---|---|---|---|
| `src/lib/supabase.ts` | `createClient` | Public client infrastructure | `lib/supabase` client boundary |
| `src/lib/auth.ts` | `createBrowserClient` | Browser Auth infrastructure | `lib/auth` |
| `src/lib/auth/server.ts` | `createServerClient` | Server session infrastructure | `lib/supabase`/`lib/auth` |
| `src/app/explore/page.tsx` | `careers`, `exams` SELECT | A: public read | Careers/exams repositories/services |
| `src/app/career/[slug]/page.tsx` | `careers`, child career tables SELECT | A: public read | Careers repository/service aggregate query |
| `src/app/exam/[slug]/page.tsx` | `exams`, `exam_details` SELECT | A: public read | Exams repository/service |
| `src/app/admin/(dashboard)/careers/page.tsx` | `careers` SELECT/filter | D: admin read | Admin career service/repository |
| `src/app/admin/(dashboard)/exams/page.tsx` | `exams` SELECT/filter | D: admin read | Admin exam service/repository |
| `src/app/admin/(dashboard)/page.tsx` | `careers`, `exams`, Storage list, recent careers | D: admin read and F: Storage | Admin dashboard service |
| `src/app/admin/(editor)/careers/[id]/page.tsx` | Career editor SELECT | D: admin read | Career admin repository/service |
| `src/app/admin/(dashboard)/settings/page.tsx` | `site_settings` SELECT | D: admin read; known missing dependency | Leave until schema decision; service should return unavailable state |
| `src/app/admin/actions.ts` | Career child INSERT/DELETE, career/exam/settings mutations | D: admin mutation | `server/actions`, validation, domain services/repositories |
| `src/app/api/admin/media/route.ts` | Storage list/upload/public URL/remove | F: Storage operation | `server/services/storage` behind route |
| `src/app/admin/(dashboard)/media/page.tsx` | Public URL generation; API fetch for mutations/list | F: Storage operation | Media feature + Storage service |
| `src/components/ImageUpload.tsx` | API fetch for upload/delete; public preview URL | F: Storage operation | Shared media UI calling media API |
| `src/app/auth/callback/route.ts` | Auth code exchange | B: authenticated session establishment | Auth service/callback route |
| `src/lib/auth/authorization.ts` | Auth user/profile queries | B: authenticated read and 8: authorization | `server/authorization` |
| Client components using `supabaseAuth.auth` (`Navbar`, `DashboardNavbar`, `ProfilePanel`, `profile/page.tsx`, `CareerInsights`) | Browser Auth/profile reads/signout | B: authenticated read/session UI | Feature/account client hooks; `CareerInsights` data read must leave browser direct access |

### Direct API/integration access

- `src/app/api/mentor/route.ts`: Gemini integration, public API, validated message input.
- `src/app/api/admin/ai-test/route.ts`: Gemini integration, admin authorization, prompt validation.
- `src/app/test-ai/page.tsx` and mentor UI call API routes through `fetch`.
- No service/repository abstraction currently owns Gemini calls.

## 6. Security boundary inventory

### Current authorization

- `middleware.ts` has an admin matcher but currently passes through; it is only an early routing hook, not the authority.
- `src/app/admin/(dashboard)/layout.tsx` calls `requireAdmin()` server-side.
- `src/app/admin/actions.ts` calls `requireAdmin()` inside every mutation.
- Admin AI and media API routes call `requireAdmin()`.
- `src/lib/auth/authorization.ts` obtains the Supabase Auth user server-side, loads `profiles`, and requires `role === "admin"`.
- `src/app/auth/callback/route.ts` exchanges the code and routes admins to `/admin` only when the profile role is admin.
- `admin_session` is no longer the authorization source; the legacy login route returns 410.
- Mentor remains public, with request-shape and length validation.

### Target authorization

```text
Route/page or API
  -> server action/service
  -> server authorization
  -> server validation
  -> repository/service
  -> Supabase
```

The Phase 1 authorization implementation must be moved or renamed only after equivalent tests/manual checks exist. A route-group move must not change the cookie adapter, profile-role lookup, status codes, or callback behavior.

### Server Action boundary requirement

When server-side services or repositories are extracted from current Server Actions, Client Components must continue calling valid Next.js Server Action entry points:

```text
Client Component
  -> Server Action wrapper
  -> Authorization
  -> Validation
  -> Service
  -> Repository
  -> Supabase
```

A generic service or repository must not be imported directly by a Client Component. The existing client-callable consumers include `AdminCareerForm.tsx`, `CareersClient.tsx`, `DeleteCareerButton.tsx`, and `DeleteExamButton.tsx`; the full import set must be rechecked during implementation. The wrapper must remain a legitimate Server Action boundary after extraction.

### Security migration risks

- Moving `requireAdmin()` into a new folder can accidentally create a client import or lose the `server-only` boundary.
- Moving admin actions without preserving the `requireAdmin()` call at the mutation boundary could reopen the Phase 1 vulnerability.
- Moving public Storage reads into a private server service could break the intentionally public `career-media` rendering behavior.
- Moving `CareerInsights` into a server-only feature without replacing its current client lifecycle could change rendering and loading behavior.
- Moving `src/app/auth/callback/route.ts` into a route group must preserve the public callback URL and Supabase redirect configuration.

## 7. Route ownership map

URLs must remain unchanged. Route groups are organizational and should not change the URL path.

| Current URL | Current owner | Proposed route group/domain | URL preservation requirement |
|---|---|---|---|
| `/` | `src/app/page.tsx` | `(marketing)` | Must remain `/` |
| `/about` | `src/app/about/page.tsx` | `(marketing)` | Must remain `/about` |
| `/auth` | `src/app/auth/page.tsx` | `(account)` | Must remain `/auth` |
| `/auth/callback` | `src/app/auth/callback/route.ts` | `(account)` callback | Must remain `/auth/callback` |
| `/explore` | `src/app/explore/page.tsx` | `(platform)` | Must remain `/explore` |
| `/explore/skills` | `src/app/explore/skills/page.tsx` | `(platform)` + skills | Must remain `/explore/skills` |
| `/explore/colleges` | `src/app/explore/colleges/page.tsx` | `(platform)` + colleges | Must remain `/explore/colleges` |
| `/explore/guide-path` | `src/app/explore/guide-path/page.tsx` | `(platform)` + onboarding/roadmaps | Must remain `/explore/guide-path` |
| `/explore/mentor` | `src/app/explore/mentor/page.tsx` | `(platform)` + mentor | Must remain `/explore/mentor` |
| `/career/[slug]` | `src/app/career/[slug]/page.tsx` | `(platform)` + careers | Must remain `/career/[slug]` |
| `/exam/[slug]` | `src/app/exam/[slug]/page.tsx` | `(platform)` + exams | Must remain `/exam/[slug]` |
| `/profile` | `src/app/profile/page.tsx` | `(account)` + profile | Must remain `/profile` |
| `/test-ai` | `src/app/test-ai/page.tsx` | Explicit test route | Keep until a replacement test surface exists |
| `/admin/*` | `src/app/admin/**` | `app/admin` | Must remain every admin URL |
| `/api/mentor` | `src/app/api/mentor/route.ts` | `app/api/mentor` | Preserve request/response contract |
| `/api/admin/ai-test` | `src/app/api/admin/ai-test/route.ts` | `app/api/admin/ai-test` | Preserve 401/403 and response contract |
| `/api/admin/media` | `src/app/api/admin/media/route.ts` | `app/api/admin/media` | Preserve upload/list/delete contract |
| `/api/admin/login` | Legacy route | Keep until removal is explicitly approved | Currently returns 410 |

## 8. Shared-component analysis

### Genuinely shared candidates

- Navigation: `Navbar`, `DashboardNavbar`, `MobileBottomNav`.
- Layout: `Footer`, `ExploreFooter`, `AdminTopbar`, `AdminSidebar` within their respective layout scopes.
- Media: `ImageUpload` is reusable UI, but its authorization must stay in the API route.
- Feedback/data display: `ContentRow`, `Reveal`, and possibly `SmoothScroll` after usage review.
- Utility: `src/utils/cn.ts` should become `lib/utils/cn.ts` only when imports are migrated.

### Feature-owned candidates

- All `Career*` components, `WhyCareerExists`, `CareerCard`, `TrendingCareerCard`, career sections, and `AdminCareerForm` belong to Careers.
- `components/exam/*`, `ExamsSection`, and `DeleteExamButton` belong to Exams.
- `components/mentor/*` belongs to Mentor.
- `components/landingpage/*` belongs to Marketing, not global shared UI.
- `ProfilePanel` should remain account/profile-owned unless its actual reuse expands.

Do not move a component into `components/ui/` merely because it is a React component. Shared placement should follow demonstrated reuse and stable responsibility.

## 9. Dependency risks

| Risk | Evidence | Mitigation |
|---|---|---|
| Feature-to-route coupling | Feature-like components are imported directly by pages and some import actions/data clients | Create feature public entry points; keep route files thin |
| Component-to-Supabase coupling | `CareerInsights` imports browser Auth client; pages import public Supabase client | Move reads into repositories/services and pass data into components |
| Admin action coupling | `AdminCareerForm`, `CareersClient`, delete buttons import `src/app/admin/actions.ts` | Preserve an action adapter during migration, then split by domain |
| Server/client boundary leakage | Browser components and server route modules coexist in global folders | Keep server-only code under `server/` or explicit server modules; verify `"use client"` boundaries |
| Auth boundary regression | `requireAdmin()` is directly imported by layout/actions/APIs | Add authorization tests/manual matrix before moving helper |
| Database contract uncertainty | Phase 2 baseline leaves types/FKs/indexes/RLS unresolved | Avoid schema-driven abstractions and generated types until baseline is complete |
| Missing settings table | Admin settings references `site_settings`, which is absent | Keep unavailable-state behavior; do not create a feature repository yet |
| Duplicate reads | Career detail page reads child tables while `CareerInsights` performs another client read | Consolidate only after measuring behavior and loading requirements |
| Route group URL changes | Moving pages physically can alter callbacks or route ownership | Verify Next.js route output and HTTP URLs after each move |
| Legacy endpoint removal | `/api/admin/login` is retained as a 410 endpoint | Search all callers, then remove in a dedicated cleanup slice |

## 10. Current-to-target migration map

| Current file/group | Current responsibility | Proposed target | Reason | Dependencies | Risk |
|---|---|---|---|---|---|
| `src/lib/supabase.ts` | Public Supabase client | `src/lib/supabase/client.ts` | Name the client boundary | All public reads | Medium |
| `src/lib/auth.ts` | Browser Auth client | `src/lib/auth/browser.ts` | Separate browser/server Auth clearly | Auth UI and client components | High |
| `src/lib/auth/server.ts` | Cookie SSR client | `src/lib/supabase/server.ts` or retained `lib/auth/server.ts` | Clarify session/data responsibility | Callback and authorization | High |
| `src/lib/auth/authorization.ts` | Profile-role authorization | `src/server/authorization/` | Make server authorization ownership explicit | Admin layout/actions/APIs | High |
| `src/lib/server-validation.ts` | Server input validation | `src/server/validation/` | Centralize validation by server boundary | Admin actions and APIs | Medium |
| `src/app/explore/page.tsx` | Aggregate public dashboard | Thin route + `features/careers`/`features/exams` | Remove direct data access | Repositories/services first | Medium |
| `src/app/career/[slug]/page.tsx` | Career aggregate page | Thin route + `features/careers` | Domain ownership and aggregate read | Career repository/service | High |
| `src/components/Career*.tsx` and related career files | Career UI | `src/features/careers/` | Keep domain UI together | Page imports and data props | Medium |
| `src/app/exam/[slug]/page.tsx` and `components/exam/*` | Exam page/UI | `src/features/exams/` | Keep exam display and data contract together | Exam repository/service | Medium |
| `src/app/admin/actions.ts` | All admin mutations | Thin client-callable Server Action wrappers in `src/server/actions/careers.ts`, `exams.ts`, and `admin.ts` | Reduce mixed-domain action file without exposing services to Client Components | Authorization, validation, repositories | High |
| `src/app/api/mentor/route.ts` | Public Gemini API | Route + `src/server/integrations/ai/mentor.ts` | Separate HTTP validation from AI integration | Public API contract | Medium |
| `src/app/api/admin/ai-test/route.ts` | Admin Gemini API | Route + `src/server/integrations/ai/admin-test.ts` | Preserve admin boundary while extracting provider call | `requireAdmin`, validation | Medium |
| `src/app/api/admin/media/route.ts` | Admin Storage API | Route + `src/server/services/storage.ts` | Centralize bucket operations | Storage policy behavior | High |
| `src/components/ImageUpload.tsx` | Media mutation UI | `src/components/media/ImageUpload.tsx` | Shared media UI with stable API | Media API route | Low |
| `src/app/admin/**` | Admin route ownership | Retain `src/app/admin/**` | Admin is a stable security boundary | Phase 1 checks | High |
| `src/app/auth/**` and profile | Account routes | `(account)` route group + `features/profile` | Organize account behavior without URL change | Auth callback/session | High |
| `src/app/about/page.tsx` and landing components | Marketing | `(marketing)` route-owned pages/components | Separate public marketing from platform without creating a speculative feature domain | Metadata/navigation | Medium |
| `src/app/explore/skills`, `colleges`, guide path | Static platform routes | `(platform)`; feature folders only when behavior exists | Reflect current platform scope without inventing data | None currently | Low |
| `src/data/career.ts` | Static career data | Investigate, then `features/careers/data` if still used | Avoid moving dead/unused code blindly | Import search | Low |
| `src/utils/cn.ts` | Utility | `src/lib/utils/cn.ts` | Align utility namespace | All imports | Low |

## 11. Recommended migration order

Every slice below must be independently understandable, reversible where practical, behavior-preserving, and validated with typecheck/build plus the relevant route or manual checks.

### Slice 0: Guardrails and migration verification rules

- Document import-boundary rules and route-output checks.
- Record public URL, Auth, admin authorization, API, and media verification cases.
- No source movement.

### Slice 1: One infrastructure boundary at a time

- Choose one concrete current consumer before extracting any infrastructure boundary.
- Do not move Supabase and Auth infrastructure together.
- Do not move `cn` merely for folder symmetry.
- Preserve compatibility imports only where they serve an active migration.

### Slice 2: Careers public-read boundary

- Focus only on public Careers reads used by `/explore` and `/career/[slug]`.
- Do not combine admin reads, admin mutations, route groups, shared UI, or unrelated infrastructure.
- Preserve response shapes, slugs, ordering, fallbacks, and public URLs.

### Slice 3: Careers repository/service extraction

- Separate repository, service, authorization, and validation only where the current Careers code demonstrates that boundary.
- Keep public reads distinct from admin reads.
- Preserve application-level slug relationships without inventing database constraints.

### Slice 4: Careers Server Action wrappers

- Extract server implementation while preserving thin, valid client-callable Server Action wrappers.
- Keep the wrapper sequence: authorization -> validation -> service -> repository.
- Validate `AdminCareerForm.tsx`, `CareersClient.tsx`, `DeleteCareerButton.tsx`, and all other actual action imports.

### Slice 5: Careers admin reads and mutations

- Handle Careers admin reads separately from public reads.
- Preserve `requireAdmin()`, profile-role authorization, protected actions, and existing admin UI behavior.

### Slice 6: Exams public-read boundary

- Focus only on public reads for `/exam/[slug]` and relevant platform views.
- Keep `exam_details.exam_id` as an application-level relationship; do not add an FK.

### Slice 7: Exams repository/service/action boundary

- Separate Exams public reads from admin operations.
- Preserve thin Server Action wrappers for all existing client consumers.
- Validate public and admin behavior independently.

### Slice 8: Shared UI extraction

- Move only genuinely shared navigation, layout, feedback, or media UI.
- Keep domain-owned components in their domain feature.
- Do not combine this slice with route-group migration.

### Slice 9: Route-group migration

- Move route files into `(marketing)`, `(platform)`, and `(account)` only after component and dependency boundaries are stable.
- Preserve `/`, `/about`, `/auth`, `/career/[slug]`, `/exam/[slug]`, `/explore`, `/explore/skills`, `/explore/colleges`, `/explore/guide-path`, `/explore/mentor`, `/profile`, `/test-ai`, `/admin/*`, and `/api/*` exactly.
- Verify Auth callback and SSR cookie behavior after each route-group batch.

### Slice 10: Storage boundary

- Migrate Storage separately from AI.
- Keep reusable visual/media UI under `components/media/`.
- Keep Storage data access under an appropriate server/lib boundary.
- Preserve public `career-media` reads and server-owned privileged mutations.

### Slice 11: AI integration boundary

- Migrate Mentor/Gemini and admin AI-test concerns separately from Storage.
- Preserve existing API contracts, public mentor behavior, admin authorization, and server-only API key usage.

### Slice 12: Admin UI ownership

- Move Careers admin UI independently from Exams admin UI.
- Preserve `requireAdmin()`, profile-role authorization, protected Server Actions/APIs, and SSR Auth/cookie behavior.
- Leave admin settings where it is until an actual settings data model exists; do not create an admin-settings feature for missing `site_settings`.

### Slice 13: Cleanup

- Remove compatibility files/imports only after all consumers are migrated and validation passes.
- Remove the legacy 410 login route only after caller and deployment review.
- Do not remove `test-ai` until an approved replacement exists.

## 12. Anti-overengineering rule

Architecture 2.0 does not require immediate creation of:

- generic repositories for every domain
- generic services for every domain
- a global config layer without real consumers
- a global types layer without concrete shared types
- empty feature directories
- empty hooks directories
- a dependency-injection framework
- a state-management framework
- a barrel-file architecture
- generic wrappers around every Supabase call

Create an abstraction only when the current code demonstrates a concrete responsibility boundary, a real consumer, and a validation path. A folder should not be created merely because it appears in the target tree.

## 13. Risk register

| Risk | Severity | Detection | Response |
|---|---|---|---|
| Auth callback breaks after route-group move | Critical | OAuth/email manual test and route output | Revert slice; retain callback at stable path |
| Admin authorization bypass introduced | Critical | Unauthenticated/student/admin matrix | Keep `requireAdmin()` in action/API boundaries |
| Public reads become authenticated-only | High | Public route smoke tests | Preserve public client/RLS-compatible read path |
| Storage uploads/deletes stop working | High | Admin media manual test | Preserve API contract and server Storage client |
| Child career content changes shape/order | High | Career detail comparison | Keep repository return shape compatible first |
| Missing `site_settings` causes new failure | Medium | Admin settings test | Preserve unavailable state; no schema assumptions |
| Route group changes URLs | High | Next route manifest and HTTP checks | Use route groups only; do not rename URL segments |
| Client imports server-only modules | High | Typecheck/build/runtime import error | Enforce server/client import boundaries |
| Unverified DB metadata encoded in types | High | Review generated types/diff | Defer generated types until schema is captured |
| Dead code moved and accidentally activated | Low | Import search/build | Investigate before moving `src/data/career.ts` and test pages |

## 14. Files that must not move in the first migration slices

- `middleware.ts`: root Next.js convention and security-adjacent boundary.
- `src/app/layout.tsx`: root layout and metadata.
- `src/app/globals.css`: global style dependency until styling is separately audited.
- `src/app/admin/**`: retain the route/security boundary while extracting internals.
- `src/app/api/**`: retain URL contracts while extracting services.
- `src/app/auth/callback/route.ts`: retain the callback URL until redirect behavior is tested.
- `src/lib/auth/server.ts` and `src/lib/auth/authorization.ts`: do not move together with behavior changes.
- `src/lib/supabase.ts`: retain a compatibility export during repository migration.
- `src/components/AdminCareerForm.tsx`: large, high-risk editor; move only in a dedicated tested slice.
- `src/app/admin/actions.ts`: do not delete until all action callers are migrated.
- `src/app/test-ai/page.tsx`: do not delete without an approved replacement.

## 15. Files requiring investigation

- `src/data/career.ts`: determine whether it is live, duplicated, or obsolete before moving.
- `src/components/CareerInsights.tsx`: resolve its client-side data fetch versus page-provided data.
- `src/app/admin/(dashboard)/page.tsx`: determine whether Storage list access should remain in the dashboard service.
- `src/app/admin/(dashboard)/settings/page.tsx`: `site_settings` is absent from the locked baseline.
- `src/app/api/admin/login/route.ts`: verify no external caller remains before eventual deletion; current route returns 410.
- `src/components/ProfilePanel.tsx`, `Navbar.tsx`, and `DashboardNavbar.tsx`: clarify shared account/session responsibilities.
- `src/app/explore/guide-path/page.tsx`: determine whether it is onboarding, roadmap, or static marketing UI.
- `src/app/test-ai/page.tsx`: classify as supported diagnostic surface or legacy page.
- All existing direct Supabase reads: confirm required return shapes before repository extraction.

## 16. Proposed Phase 3 implementation slices

1. **Architecture guardrails:** document import rules and establish smoke-test commands; no moves.
2. **Careers repository/service:** extract public career reads and preserve page contracts.
3. **Careers feature ownership:** move career components and admin editor in separate commits/slices.
4. **Exams repository/service:** extract public/admin exam reads and preserve detail behavior.
5. **Account route grouping:** move Auth/profile routes only with callback and session tests.
6. **Shared component grouping:** move navigation/layout/media candidates after ownership is proven.
7. **Server action split:** separate career/exam/admin actions while retaining authorization and validation.
8. **AI integration extraction:** separate Gemini provider calls from public/admin HTTP routes.
9. **Storage service extraction:** centralize Storage operations without changing bucket or policies.
10. **Cleanup and compatibility removal:** remove adapters/legacy files only after import, build, and route verification.

Domains with no current implementation, including recommendations, saved content, progress, search, resources, and compare, should not receive folders or code until a product/data responsibility exists.

## 17. Definition of done

Architecture 2.0 migration planning is complete when the eventual implementation can demonstrate:

- All existing public and admin URLs still resolve.
- Email, Google, callback, logout, and profile-role behavior remain intact.
- Admin layout, actions, APIs, and Storage mutations remain server-authorized.
- Public career/exam reads return equivalent data and ordering.
- No component imports server-only modules.
- No route or component directly queries Supabase where a migrated repository/service is supposed to own the access.
- Domain UI is owned by `features/<domain>` only where the domain exists.
- Shared components contain only genuinely shared responsibilities.
- No unverified database constraints, relationships, RLS, Storage policy, or Auth configuration is encoded as certainty.
- `npx tsc --noEmit`, `npm run lint`, build, route smoke tests, Auth tests, admin authorization tests, API tests, and media tests pass for each migration slice.
- Compatibility exports and legacy files are removed only after all imports and runtime paths are verified.

"PHASE 3A COMPLETE — ARCHITECTURE MIGRATION PLAN READY FOR REVIEW."