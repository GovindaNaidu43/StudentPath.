# STUDENTPATH - CURRENT ARCHITECTURE AUDIT

**Audit status:** Read-only audit completed. No project files were created, deleted, or modified during the audit itself. This document packages the audit findings for download and reuse with another AI assistant.

The repository contained pre-existing working-tree changes and untracked files before the audit.

## 1. Project Purpose

StudentPath is a Next.js career-discovery platform for students.

Current product areas include:

- Career discovery
- Career detail pages
- Career insights
- Career scenes
- Career future roles
- Career roadmap data
- Exam discovery
- Skills and colleges exploration pages
- AI mentor chat
- Student authentication
- Admin career management
- Admin exam management
- Admin media management
- Admin settings
- Admin Gemini AI testing

The application is primarily a cinematic, dark-themed public website backed by Supabase.

The project is not currently a complete personalized career decision engine. Several sections are visual, static, incomplete, or disconnected from their intended data flow.

## 2. Tech Stack

### Framework

| Technology | Version | Evidence |
|---|---:|---|
| Next.js | `^16.3.2` | `package.json` |
| React | `19.2.4` | `package.json` |
| React DOM | `19.2.4` | `package.json` |
| TypeScript | `^5` | `package.json`, `tsconfig.json` |
| Tailwind CSS | `^3.4.1` | `package.json`, `tailwind.config.js` |
| PostCSS | `^8.5.0` | `package.json`, `postcss.config.js` |

### Backend and services

- Next.js App Router server components
- Next.js route handlers
- Next.js server actions
- Supabase JavaScript client
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Google Gemini through `@google/generative-ai`
- Vercel is mentioned in the default README, but no Vercel configuration file exists.

### UI and interaction

- Tailwind CSS
- `framer-motion`
- `lucide-react`
- `lenis`
- React Three Fiber dependencies are installed, but no major current route was confirmed to use a Three.js scene.
- `@react-three/drei`
- `@react-three/fiber`
- `three`
- `maath`
- `leva`

## 3. Folder Structure

Actual source tree:

```text
studentpath/
├── .env.local
├── .gitignore
├── AdminCareerForm.txt
├── eslint.config.mjs
├── et --hard 84839ba
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── seed-ai-engineer.mjs
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── images/
│   │   ├── ai.jpg
│   │   ├── dashboard.png
│   │   ├── facicon.ico.jpeg
│   │   ├── landing-mobile.webp.webp
│   │   └── roadmap.png
│   ├── textures/
│   │   └── earth.jpg
│   └── videos/
│       ├── ai.mp4
│       └── landing-hero.mp4
└── src/
    ├── app/
    │   ├── about/page.tsx
    │   ├── auth/page.tsx
    │   ├── career/[slug]/page.tsx
    │   ├── exam/[slug]/page.tsx
    │   ├── explore/page.tsx
    │   ├── explore/colleges/page.tsx
    │   ├── explore/guide-path/page.tsx
    │   ├── explore/mentor/page.tsx
    │   ├── explore/skills/page.tsx
    │   ├── profile/page.tsx
    │   ├── test-ai/page.tsx
    │   ├── admin/actions.ts
    │   ├── admin/layout.tsx
    │   ├── admin/(dashboard)/layout.tsx
    │   ├── admin/(dashboard)/page.tsx
    │   ├── admin/(dashboard)/ai/page.tsx
    │   ├── admin/(dashboard)/careers/page.tsx
    │   ├── admin/(dashboard)/careers/CareersClient.tsx
    │   ├── admin/(dashboard)/exams/page.tsx
    │   ├── admin/(dashboard)/exams/[id]/page.tsx
    │   ├── admin/(dashboard)/media/page.tsx
    │   ├── admin/(dashboard)/settings/page.tsx
    │   ├── admin/(editor)/careers/[id]/page.tsx
    │   ├── api/mentor/route.ts
    │   ├── api/admin/login/route.ts
    │   ├── api/admin/ai-test/route.ts
    │   ├── favicon.ico
    │   ├── favicon1.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── components/
    │   ├── AdminCareerForm.tsx
    │   ├── AdminSidebar.tsx
    │   ├── AdminTopbar.tsx
    │   ├── CareerCard.tsx
    │   ├── CareerCTA.tsx
    │   ├── CareerDashboard.tsx
    │   ├── CareerFuture.tsx
    │   ├── CareerHero.tsx
    │   ├── CareerInsights.tsx
    │   ├── CareerJourneyRoad.tsx
    │   ├── CareerPaths.tsx
    │   ├── CareerRoadmap.tsx
    │   ├── CareerScenes.tsx
    │   ├── ContentRow.tsx
    │   ├── DashboardNavbar.tsx
    │   ├── DeleteCareerButton.tsx
    │   ├── DeleteExamButton.tsx
    │   ├── ExploreClient.tsx
    │   ├── ExploreFooter.tsx
    │   ├── Footer.tsx
    │   ├── ImageUpload.tsx
    │   ├── landingpage/Benefits.tsx
    │   ├── landingpage/CTA.tsx
    │   ├── landingpage/Features.tsx
    │   ├── landingpage/Footer.tsx
    │   ├── landingpage/Hero.tsx
    │   ├── landingpage/Icons.tsx
    │   ├── landingpage/Navbar.tsx
    │   ├── landingpage/Pricing.tsx
    │   ├── landingpage/Showcase.tsx
    │   ├── landingpage/SocialProof.tsx
    │   ├── landingpage/Testimonials.tsx
    │   ├── mentor/MentorChat.tsx
    │   ├── mentor/MentorInput.tsx
    │   ├── mentor/MentorLanding.tsx
    │   └── sections/CareersSection.tsx
    │       sections/ExamsSection.tsx
    ├── data/career.ts
    ├── lib/auth.ts
    ├── lib/supabase.ts
    ├── sections/LandingHero.tsx
    └── utils/cn.ts
```

Generated/dependency directories:

- `node_modules/`: installed npm dependencies
- `.next/`: Next.js generated output
- `.git/`: Git metadata

Absent directories:

- `supabase/`
- `database/`
- `migrations/`
- `src/actions/`
- `src/types/`
- `vercel.json`

## 4. Route Structure

### Public routes

| URL | File | Rendering | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Landing page; redirects authenticated sessions to `/explore`. |
| `/about` | `src/app/about/page.tsx` | Server | Static founder and product story page. |
| `/auth` | `src/app/auth/page.tsx` | Client | Login, signup, and Google OAuth. |
| `/explore` | `src/app/explore/page.tsx` | Server + client child | Loads careers and exams from Supabase. |
| `/explore/skills` | `src/app/explore/skills/page.tsx` | Server | Hardcoded skills exploration page. |
| `/explore/colleges` | `src/app/explore/colleges/page.tsx` | Server | Hardcoded colleges exploration page. |
| `/explore/guide-path` | `src/app/explore/guide-path/page.tsx` | Server | Static form-like guide-path interface. |
| `/explore/mentor` | `src/app/explore/mentor/page.tsx` | Client | AI mentor chat. |
| `/career/[slug]` | `src/app/career/[slug]/page.tsx` | Server | Career detail experience. |
| `/exam/[slug]` | `src/app/exam/[slug]/page.tsx` | Server | Exam detail page. |
| `/profile` | `src/app/profile/page.tsx` | Client | User profile interface and logout. |
| `/test-ai` | `src/app/test-ai/page.tsx` | Client | AI test page using mentor API. |

### Admin routes

| URL | File | Purpose |
|---|---|---|
| `/admin` | `src/app/admin/(dashboard)/page.tsx` | Dashboard counts, recent careers, admin links. |
| `/admin/careers` | `src/app/admin/(dashboard)/careers/page.tsx` | Career list, search, filters, create/delete. |
| `/admin/careers/[id]` | `src/app/admin/(editor)/careers/[id]/page.tsx` | Career editor and related content loading. |
| `/admin/exams` | `src/app/admin/(dashboard)/exams/page.tsx` | Exam list, search, create, delete. |
| `/admin/exams/[id]` | `src/app/admin/(dashboard)/exams/[id]/page.tsx` | Exam editor. |
| `/admin/media` | `src/app/admin/(dashboard)/media/page.tsx` | Storage media browser, upload, copy URL, delete. |
| `/admin/ai` | `src/app/admin/(dashboard)/ai/page.tsx` | Gemini prompt testing. |
| `/admin/settings` | `src/app/admin/(dashboard)/settings/page.tsx` | Site settings read/upsert. |

### API routes

| Method | URL | File | Purpose |
|---|---|---|---|
| `POST` | `/api/mentor` | `src/app/api/mentor/route.ts` | Sends recent chat messages to Gemini `gemini-2.5-flash`. |
| `POST` | `/api/admin/login` | `src/app/api/admin/login/route.ts` | Compares credentials and sets `admin_session`. |
| `POST` | `/api/admin/ai-test` | `src/app/api/admin/ai-test/route.ts` | Sends prompt to Gemini `gemini-1.5-flash`. |

### Metadata routes

| URL | File | Behavior |
|---|---|---|
| `/robots.txt` | `src/app/robots.ts` | Allows all crawlers and advertises sitemap. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Returns only `https://studentpath.in`. |

## 5. Layouts and Middleware

### Root layout

`src/app/layout.tsx`:

- Imports global CSS.
- Defines global title, description, keywords, and Open Graph metadata.
- Applies `bg-black text-white min-h-screen` to the body.
- Does not globally enforce authentication.

### Admin layouts

`src/app/admin/layout.tsx`:

- Visual admin shell.
- Adds black background, glow, and grid background.
- Does not authenticate visitors.

`src/app/admin/(dashboard)/layout.tsx`:

- Mounts `AdminSidebar`.
- Provides dashboard visual structure.
- Does not authenticate visitors.

### Middleware

`middleware.ts` matches:

- `/admin/:path*`
- `/explore/:path*`
- `/dashboard/:path*`

It always returns `NextResponse.next()`. It reads no cookies, checks no Supabase session, checks no admin role, and performs no redirect.

## 6. Component Architecture

### Navigation and shells

| Component | File | Boundary | Main behavior |
|---|---|---|---|
| `Navbar` | `src/components/Navbar.tsx` | Client | Landing/about navbar, scroll state, user lookup, mobile menu, logout. |
| `DashboardNavbar` | `src/components/DashboardNavbar.tsx` | Client | Explore navbar, search across passed careers/exams, user/profile state. |
| `MobileBottomNav` | `src/components/MobileBottomNav.tsx` | Client | Mobile navigation and hide-on-scroll behavior. |
| `AdminSidebar` | `src/components/AdminSidebar.tsx` | Client | Admin navigation and active pathname styling. |
| `AdminTopbar` | `src/components/AdminTopbar.tsx` | Client | Admin header and optional create action. |
| `ExploreFooter` | `src/components/ExploreFooter.tsx` | Server | Shared footer and navigation/social links. |
| `Footer` | `src/components/Footer.tsx` | Server | Alternate simple footer. |
| `ProfilePanel` | `src/components/ProfilePanel.tsx` | Client | Profile drawer and logout. |

### Explore and career components

| Component | File | Main behavior |
|---|---|---|
| `ExploreClient` | `src/components/ExploreClient.tsx` | Section switching and search. |
| `QuickExplore` | `src/components/QuickExplore.tsx` | Careers, Exams, Colleges, Skills navigation. |
| `CareersSection` | `src/components/sections/CareersSection.tsx` | Six categorized career rows. |
| `ExamsSection` | `src/components/sections/ExamsSection.tsx` | Exam content row. |
| `ContentRow` | `src/components/ContentRow.tsx` | Horizontal content cards. |
| `CareerCard` | `src/components/CareerCard.tsx` | Career card linking to `/career/[slug]`. |
| `TrendingCareerCard` | `src/components/TrendingCareerCard.tsx` | Trending/rotating career card. |
| `CareerHero` | `src/components/CareerHero.tsx` | Career hero image/video and metrics. |
| `WhyCareerExists` | `src/components/WhyCareerExists.tsx` | Career origin/purpose blocks. |
| `CareerScenes` | `src/components/CareerScenes.tsx` | Visual career scenes. |
| `CareerInsights` | `src/components/CareerInsights.tsx` | Client-side `career_insights` query. |
| `CareerFuture` | `src/components/CareerFuture.tsx` | Future-role cards. |
| `CareerPaths` | `src/components/CareerPaths.tsx` | Presentational path component; not currently active. |
| `CareerJourneyRoad` | `src/components/CareerJourneyRoad.tsx` | Interactive roadmap; invocation commented out. |
| `CareerDashboard` | `src/components/CareerDashboard.tsx` | Metrics component; no current usage found. |
| `CareerRoadmap` | `src/components/CareerRoadmap.tsx` | Roadmap component; no current usage found. |
| `CareerCTA` | `src/components/CareerCTA.tsx` | Static career CTA. |

### Mentor components

- `src/components/mentor/MentorLanding.tsx`: preset prompts.
- `src/components/mentor/MentorChat.tsx`: message display.
- `src/components/mentor/MentorInput.tsx`: message input and submit.

### Admin components

- `src/components/AdminCareerForm.tsx`: complete career editor.
- `src/app/admin/(dashboard)/careers/CareersClient.tsx`: career list controls.
- `src/components/DeleteCareerButton.tsx`: career edit/preview/delete menu.
- `src/components/DeleteExamButton.tsx`: exam delete confirmation.
- `src/components/ImageUpload.tsx`: Storage upload/delete component.
- `src/components/LivePreviewPanel.tsx`: editor preview; no current usage found.

## 7. Page-to-Component Relationships

### Landing

```text
/ -> page.tsx
   ├── SmoothScroll
   ├── Navbar
   ├── LandingHero
   ├── SocialProof
   ├── Features
   ├── Showcase
   ├── Benefits
   ├── Testimonials
   ├── CTA
   └── ExploreFooter
```

### Explore

```text
/explore -> page.tsx
   ├── Supabase careers query
   ├── Supabase exams query
   ├── TrendingCareerCard
   ├── DashboardNavbar
   ├── ExploreClient
   │   ├── QuickExplore
   │   ├── CareersSection -> ContentRow -> CareerCard
   │   └── ExamsSection -> ContentRow
   ├── ExploreFooter
   └── MobileBottomNav
```

### Career detail

```text
/career/[slug]
   ├── CareerHero
   ├── WhyCareerExists
   ├── CareerScenes
   ├── CareerInsights
   ├── CareerFuture
   └── CareerCTA
```

The route fetches roadmap data but does not render it.

### Exam detail

```text
/exam/[slug]
   ├── ExamHero
   ├── ExamOverview
   ├── ExamEligibility
   ├── Roadmap section
   └── Competition Reality section
```

### Admin career editor

```text
/admin/careers/[id]
   ├── careers query
   ├── career_insights query
   ├── career_why_exists query
   ├── career_scenes query
   ├── career_path_steps query
   ├── career_future_roles query
   └── AdminCareerForm
       ├── Overview
       ├── Hero Media -> ImageUpload
       ├── Insights
       ├── Why It Exists
       ├── Career Scenes -> ImageUpload
       ├── Roadmap
       └── Future Roles -> ImageUpload
```

## 8. Database Architecture

No SQL schema, migration, Supabase configuration, RLS policy, trigger, foreign-key definition, or index definition exists in the repository.

Therefore:

- Supabase/PostgreSQL usage is confirmed.
- Exact production schema is not determined from current project files.
- RLS status is not determined from current project files.
- Foreign-key relationships are not determined from current project files.
- Several relationships are application-level slug or ID lookups.

### Tables referenced by code

#### `careers`

Observed fields:

`id`, `title`, `slug`, `category`, `description`, `salary`, `demand`, `difficulty`, `future_scope`, `hero_image`, `hero_video`, `primary_color`, `secondary_color`, `universe_nodes`, `paths`.

Used by explore, career detail, admin dashboard, editor, actions, and seed script.

#### `career_insights`

Observed fields:

`id`, `career_slug`, `small_heading`, `title`, `short_description`, `deep_details`, `card_order`, `position`, `tags`.

Relationship is application-level:

```text
career_insights.career_slug -> careers.slug
```

#### `career_why_exists`

Observed fields:

`career_slug`, `heading`, `content`, `display_order`.

#### `career_scenes`

Observed fields:

`career_slug`, `title`, `description`, `image_url`, `display_order`.

#### `career_path_steps`

Observed fields:

`career_slug`, `heading`, `percentage`, `short_description`, `display_order`.

#### `career_future_roles`

Observed fields:

`career_slug`, `role_name`, `short_description`, `image_url`.

#### `exams`

Observed fields:

`id`, `title`, `slug`, `category`, `description`, `exam_date`, `registration_link`, `official_website`, `eligibility`, `difficulty`, `created_at`.

#### `exam_details`

Observed fields:

`exam_id`, `overview`, `qualification`, `stream_requirement`, `attempts`, `age_limit`, `roadmap`, `competition_reality`.

Application-level relationship:

```text
exam_details.exam_id -> exams.id
```

#### `profiles`

Observed fields:

`id`, `role`.

`full_name` is referenced in comments as being populated by an expected auth trigger.

Expected roles are `admin` and `student`.

#### `site_settings`

Observed fields:

`id`, `site_name`, `admin_name`, `contact_email`, `tagline`, `maintenance_mode`, `updated_at`.

### Relationship map

```text
careers
├── career_insights       via career_slug
├── career_why_exists     via career_slug
├── career_scenes         via career_slug
├── career_path_steps     via career_slug
└── career_future_roles   via career_slug

exams
└── exam_details          via exam_id

auth.users
└── profiles              expected profiles.id correspondence
```

Database foreign keys cannot be confirmed from this repository.

## 9. Storage

The only referenced bucket is:

```text
career-media
```

Used by:

- `src/components/ImageUpload.tsx`
- `src/app/admin/(dashboard)/media/page.tsx`
- `src/app/admin/(dashboard)/page.tsx`

### Upload flow

```text
AdminCareerForm
 -> ImageUpload
 -> file input
 -> career-media.upload()
 -> getPublicUrl()
 -> editor state
 -> hidden form field
 -> updateCareer
 -> database media URL column
```

`ImageUpload` names files using:

```text
<Date.now()>-<sanitized-original-name>
```

The Media Studio uses a similar timestamp-based name but does not sanitize the filename in the same way.

The application expects public URLs. Actual bucket privacy and policies are not determined from repository files.

Storage deletion occurs through `remove([fileName])`. Career deletion does not remove related stored media.

## 10. Authentication

### Student authentication

Implemented in `src/app/auth/page.tsx`:

- Email/password login
- Email/password signup
- Google OAuth
- `auth.getUser()` lookup
- `profiles.role` lookup
- Admin role redirects to `/admin`
- Other users redirect to `/explore`
- Logout through `auth.signOut()`

### Signup flow

```text
/auth
 -> Supabase signUp()
 -> full_name stored in auth metadata
 -> expected database trigger creates profiles row
 -> email redirect configured to /auth/callback
```

No `/auth/callback` route exists.

### Root behavior

`src/app/page.tsx` calls `auth.getSession()` and redirects authenticated users to `/explore`.

### Profile behavior

`src/app/profile/page.tsx` calls `auth.getUser()` client-side but does not redirect unauthenticated users.

### Admin authentication

`src/app/api/admin/login/route.ts`:

- Reads `ADMIN_EMAIL`
- Reads `ADMIN_PASSWORD`
- Reads `ADMIN_SECRET`
- Compares credentials
- Sets an HttpOnly `admin_session` cookie
- Uses a seven-day lifetime
- Uses secure cookies in production
- Uses `sameSite: "lax"`

The cookie is not checked anywhere else in the application.

The Supabase student authentication system and custom admin cookie system are separate and disconnected.

## 11. Admin Architecture

```text
/admin
├── Dashboard
├── Careers
│   ├── List
│   ├── Search
│   ├── Filter
│   ├── Sort
│   ├── Create
│   ├── Delete
│   └── Edit
├── Exams
│   ├── List
│   ├── Search
│   ├── Create
│   ├── Update
│   └── Delete
├── Media
│   ├── List
│   ├── Filter
│   ├── Upload
│   ├── Copy URL
│   └── Delete
├── AI
└── Settings
```

### Server actions

`src/app/admin/actions.ts` exports:

- `createCareer`
- `updateCareer`
- `deleteCareer`
- `createExam`
- `updateExam`
- `deleteExam`
- `saveSettings`

All use the anonymous Supabase client and have no application-level authorization check.

### Career update behavior

1. Read scalar form values.
2. Parse hidden JSON arrays.
3. Update the core career row.
4. Delete all related rows by slug.
5. Reinsert insights.
6. Reinsert why-exists sections.
7. Reinsert scenes.
8. Reinsert roadmap steps.
9. Reinsert future roles.
10. Revalidate paths.

Related insert errors are not individually checked and the operation is not transactional.

## 12. Career Editor Deep Audit

Route: `src/app/admin/(editor)/careers/[id]/page.tsx`

Loads the career by ID and related records by career slug, then passes them to `AdminCareerForm`.

Form sections:

1. Overview
2. Hero Media
3. Insights
4. Why It Exists
5. Career Scenes
6. Roadmap
7. Future Roles

Core fields:

- Title
- Slug
- Category
- Salary
- Demand
- Difficulty
- Description
- Primary color
- Secondary color
- Hero image
- Hero video

Repeatable content:

- Insights
- Why-exists blocks
- Scenes
- Roadmap steps
- Future roles

Behavior:

- Local React state
- Hidden JSON form fields
- `useTransition` for save/delete
- Save status UI
- Delete confirmation
- No formal schema validation
- Multiple `any` types
- JSON parsing can throw
- Slug changes can orphan old slug-related records
- Media uploads are separate from database save
- Deleting a career does not delete storage objects

## 13. Career Detail Page

`src/app/career/[slug]/page.tsx` renders:

1. `CareerHero`
2. `WhyCareerExists`
3. `CareerScenes`
4. `CareerInsights`
5. `CareerFuture`
6. `CareerCTA`

It fetches but does not render `career_path_steps`.

`CareerJourneyRoad` is commented out.

`CareerPaths` and `CareerUniverse` imports are not active in the rendered page.

`CareerInsights` independently fetches `career_insights` client-side, duplicating server-side data access patterns.

`CareerHero` defaults to `/images/default.jpg` and `/videos/default.mp4`, which are absent from `public/`.

## 14. Explore System

`src/app/explore/page.tsx`:

1. Loads all careers from Supabase.
2. Loads all exams from Supabase.
3. Filters careers into six category strings.
4. Passes arrays to `ExploreClient`.
5. Renders trending career content.
6. Renders dashboard navigation.
7. Renders mobile navigation.
8. Renders footer.

`ExploreClient` provides:

- Active section state
- In-memory search
- Careers section
- Exams section
- Colleges placeholder section
- Skills section

The college and skills content is hardcoded rather than database-backed.

### Confirmed explore issue

`TrendingCareerCard` links using `career.id`, while `/career/[slug]` searches by `career.slug`. These links can fail when IDs and slugs differ.

## 15. API Layer

### `POST /api/mentor`

Expected body:

```json
{
  "messages": [
    { "role": "user", "content": "..." }
  ]
}
```

Behavior:

- Takes the last six messages.
- Builds a prompt.
- Uses Gemini `gemini-2.5-flash`.
- Returns `{ reply }`.

Issues:

- No authentication.
- No schema validation.
- Missing/non-array `messages` can throw.
- Message interpolation uses literal quoted placeholders instead of template interpolation.

### `POST /api/admin/login`

Body:

```json
{
  "email": "...",
  "password": "..."
}
```

Compares environment credentials and sets `admin_session`.

It does not create a Supabase session and the cookie is not subsequently verified.

### `POST /api/admin/ai-test`

Body:

```json
{
  "prompt": "..."
}
```

Validates the prompt, calls Gemini `gemini-1.5-flash`, and returns `{ text }`.

No admin authentication check is present.

## 16. Data Flow

### Public career browsing

```text
User
 ↓
/explore
 ↓
Server component
 ↓
Supabase careers + exams
 ↓
Category filtering
 ↓
ExploreClient
 ↓
ContentRow
 ↓
CareerCard / exam card
 ↓
/career/[slug] or /exam/[slug]
```

### Career save

```text
AdminCareerForm
 ↓
Local React state
 ↓
Hidden JSON inputs
 ↓
updateCareer server action
 ↓
Update careers row
 ↓
Delete related rows
 ↓
Insert related arrays
 ↓
revalidatePath()
```

### Media upload

```text
File input
 ↓
ImageUpload
 ↓
Supabase Storage career-media.upload()
 ↓
getPublicUrl()
 ↓
Editor state
 ↓
Database URL field
```

### Student login

```text
/auth
 ↓
Supabase password or Google OAuth
 ↓
auth.getUser()
 ↓
profiles.role
 ↓
/admin or /explore
```

### AI mentor

```text
MentorInput
 ↓
/api/mentor
 ↓
Gemini
 ↓
{ reply }
 ↓
MentorChat
```

## 17. Styling System

`src/app/globals.css` provides:

- Tailwind directives
- Black body background
- White text
- System font stack
- Scrollbar hiding utility
- Gradient text utility
- Glass utility
- Rainbow-border animation

`tailwind.config.js` defines:

- Purple `brand` color scale
- Cyan `accent` color scale
- Dark `ink` colors
- `Inter` display font configuration
- Float animations
- Marquee animation

The configured `Inter` family is not imported through `next/font`; the global body uses a system stack.

Common visual patterns:

- Black backgrounds
- Fuchsia, pink, purple, and cyan accents
- Translucent white borders
- Large rounded cards
- Backdrop blur
- Radial glows
- Cinematic images and video
- Framer Motion entrance animations
- Horizontal content rows
- Fixed navigation

## 18. Environment Variables

Only names are documented here:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anonymous key. |
| `GEMINI_API_KEY` | Gemini API access. |
| `ADMIN_EMAIL` | Custom admin login email. |
| `ADMIN_PASSWORD` | Custom admin login password. |
| `ADMIN_SECRET` | Value stored in admin session cookie. |

No secret values are included.

## 19. Configuration

| File | Role |
|---|---|
| `package.json` | Scripts and dependencies. |
| `package-lock.json` | Locked dependency tree. |
| `next.config.ts` | Empty/default Next configuration. |
| `tsconfig.json` | Strict TypeScript and `@/*` alias. |
| `tailwind.config.js` | Tailwind theme and content paths. |
| `postcss.config.js` | Tailwind and Autoprefixer. |
| `eslint.config.mjs` | Next Core Web Vitals and TypeScript ESLint. |
| `middleware.ts` | Pass-through route matcher. |
| `.gitignore` | Dependency/build/env/log ignores. |
| `README.md` | Mostly default create-next-app documentation. |
| `seed-ai-engineer.mjs` | Direct Supabase AI Engineer seed/update script. |
| `AdminCareerForm.txt` | Root text artifact; role not determined. |
| `et --hard 84839ba` | Git reflog text artifact, not application code. |

## 20. SEO

Implemented:

- Root metadata
- About page metadata
- Open Graph root metadata
- Robots route
- Sitemap route

Incomplete:

- Sitemap includes only the home page.
- Career and exam dynamic routes are absent from sitemap.
- No dynamic metadata for careers or exams was confirmed.
- No canonical metadata was confirmed.
- No structured data was confirmed.
- No route-specific Open Graph images were confirmed.

## 21. Error Handling

Present:

- Inline career/exam not-found messages
- Explore query failure message
- Server-action thrown errors
- API JSON error responses
- Auth form error state
- Career editor save status
- Media upload alerts
- Generic AI unavailable response

Weak areas:

- No `error.tsx`
- No `loading.tsx`
- No `not-found.tsx`
- Related Supabase errors are often ignored.
- JSON parsing is not locally guarded.
- API validation is inconsistent.
- `test-ai` does not handle non-OK responses.
- Storage errors are mostly logged or alerted.

## 22. Confirmed Issues

### Security and authorization

1. Middleware does not authenticate `/admin`.
2. Admin layouts and pages do not authenticate visitors.
3. Server actions do not verify authentication or authorization.
4. `/api/admin/ai-test` is unauthenticated.
5. Storage mutations use the public anonymous client.
6. `/api/mentor` is unauthenticated.
7. `/api/mentor` has no input schema validation.
8. `admin_session` is never verified.
9. No rate limiting was found.
10. Actual RLS status cannot be verified from repository files.

### Broken or missing routes

11. Navbar links to missing `/mentor`.
12. Navbar links to missing `/future`.
13. Landing CTA links to missing `/mentor`.
14. Signup redirects to missing `/auth/callback`.
15. Footer generates missing root `/careers`, `/exams`, `/colleges`, and `/skills` routes.
16. Implemented college and skills routes are under `/explore/`.

### Data and behavior

17. `/test-ai` sends `{ message }`, while `/api/mentor` expects `{ messages }`.
18. Mentor message interpolation produces literal placeholder text.
19. Roadmap data is fetched but not rendered.
20. `CareerPaths` and `CareerJourneyRoad` are inactive on public career pages.
21. Career insights are fetched through a separate client query.
22. Trending cards use IDs while the detail route searches by slug.
23. Career hero fallback media files are missing.
24. Guide Path is visual-only.
25. Settings environment status values are hardcoded.
26. Sitemap coverage is incomplete.
27. `AdminTopbar.subtitle` is ignored.
28. Related update errors are ignored.
29. Career update is not transactional.
30. Career deletion does not delete media.
31. Slug changes can orphan related rows.
32. The seed script contains hardcoded Supabase configuration rather than reading environment variables.

## 23. Possible Risks

These depend on external Supabase/deployment configuration:

- Anonymous Supabase access may allow admin mutations if RLS permits them.
- Public storage URLs may expose uploaded media.
- Storage deletion may fail for nested paths.
- External database triggers or tables may exist but are not represented in the repo.
- OAuth redirect configuration may differ from the code.
- Email confirmation may fail because the callback route is absent.
- `any` usage reduces type safety.
- Raw image/video usage may reduce performance.
- Unauthenticated AI endpoints can create usage costs.

## 24. Currently Implemented

- Next.js App Router structure
- Landing page
- About page
- Supabase integration
- Student authentication UI
- Google OAuth initiation
- Session-aware landing redirect
- Explore page with database careers and exams
- Career detail page
- Exam detail page
- Career scenes, insights, and future roles
- Admin dashboard
- Admin career list/editor/actions
- Admin exam list/editor/actions
- Admin media browser
- Supabase Storage uploads/deletes
- Admin settings form
- Gemini mentor UI/API
- Admin Gemini test UI/API
- Robots route
- Basic sitemap
- Responsive Tailwind UI
- Framer Motion animations

## 25. Partially Implemented

- Career roadmap data exists but public rendering is disabled.
- Career path components exist but are not connected.
- Guide Path UI exists but has no generation logic.
- Colleges and skills pages are primarily hardcoded.
- AI mentor UI exists but API formatting and validation have defects.
- Admin login endpoint exists but does not protect admin routes.
- Profile page exists but is not route-protected.
- Signup expects a missing callback route.
- Dynamic pages lack dynamic SEO metadata.
- Media management lacks confirmed authorization.
- Settings environment status is static.

## 26. Referenced / Planned / Not Implemented

- `/mentor`
- `/future`
- `/auth/callback`
- Root `/careers`
- Root `/exams`
- Root `/colleges`
- Root `/skills`
- Functional Guide Path generation
- Public career roadmap visualization
- Full personalized pathway system
- Community features
- Student progress tracking
- Personalized exploration
- Intelligent guidance beyond the current mentor endpoint
- Database migrations and schema source control
- Supabase RLS policy source control
- Dedicated error/loading/not-found route states

## 27. Architecture Diagram

```text
                         STUDENTPATH
                              │
              ┌───────────────┴────────────────┐
              │                                │
        PUBLIC EXPERIENCE                    ADMIN
              │                                │
     ┌────────┼─────────┐             ┌───────┼────────┐
     │        │         │             │       │        │
  Landing   Explore   Auth          Careers  Exams   Media
     │        │         │             │       │        │
  About   Career     Profile       Editor  Editor   Storage
             │
       ┌─────┼──────────────┐
       │     │              │
    Careers Exams       AI Mentor
       │     │              │
       └─────┴──────┬───────┘
                    │
              Next.js App Router
                    │
        ┌───────────┼───────────┐
        │           │           │
   Server Pages  Server       Client
                 Actions      Components
        │           │           │
        └───────────┴───────────┘
                    │
                Supabase
        ┌───────────┼───────────┐
        │           │           │
    PostgreSQL    Auth        Storage
        │           │           │
   Careers       Profiles   career-media
   Exams
   Career content
   Exam details
   Site settings
                    │
                 Gemini API
```

## 28. Validation Observations

- `npx tsc --noEmit` produced no output during the audit.
- A production build had previously completed successfully and generated `/about`.
- Existing lint diagnostics were observed, including `any` usage, unused variables, and raw image warnings.
- Runtime database policies and external Supabase configuration could not be verified from repository files.

## 29. Recommended Next Investigation

1. Export the actual Supabase database schema.
2. Export RLS policies.
3. Export Storage bucket policies.
4. Verify the `profiles` creation trigger.
5. Verify Supabase Auth redirect URLs.
6. Test anonymous client mutation permissions.
7. Confirm whether `/mentor` and `/future` aliases are intended.
8. Decide whether relationships remain slug-based or become foreign-key-based.
9. Decide whether admin authentication uses Supabase roles or the custom cookie.
10. Verify every navigation target against the route inventory.

# MASTER SUMMARY

StudentPath is a Next.js 16 App Router application using React 19, TypeScript, Tailwind, Supabase, Supabase Auth, Supabase Storage, and Gemini.

Its main implemented systems are:

- Public landing and About pages
- Supabase-backed explore page
- Career and exam detail pages
- Student authentication UI
- AI mentor UI/API
- Admin career, exam, media, AI, and settings interfaces

The content model is centered around `careers`, with slug-based related tables for insights, why-exists sections, scenes, roadmap steps, and future roles. Exams use `exams` and `exam_details`.

The most important architectural limitation is that database schema, migrations, RLS policies, Storage policies, and auth triggers are not stored in the repository. External Supabase configuration is required for a complete runtime audit.

The highest-priority confirmed problems are:

- Admin routes and mutations are not protected.
- The custom admin cookie is never verified.
- Several navigation links point to missing routes.
- `/test-ai` sends the wrong API payload.
- Mentor prompt interpolation is broken.
- Career roadmap data is fetched but not rendered.
- Trending career links use IDs while detail pages query slugs.
- The signup callback route is missing.
- Sitemap coverage is incomplete.
- Guide Path is currently visual-only.
- Related career updates are non-transactional and ignore several errors.
