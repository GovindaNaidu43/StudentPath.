# StudentPath Database Baseline

## Scope

This is the Phase 2A baseline for the current StudentPath Supabase project. It documents verified live state without redesigning or modifying the database.

No live SQL was executed. No data, tables, columns, constraints, indexes, functions, triggers, RLS policies, Storage policies, or Auth settings were changed.

## Evidence labels

- **VERIFIED**: directly captured in the authenticated Supabase Dashboard or confirmed by the existing verified architecture report.
- **UNVERIFIED**: not captured with enough database metadata to reproduce safely.
- **APPLICATION-LEVEL ASSUMPTION**: inferred from application queries, forms, or comments; not a database guarantee.

## 1. Live database tables

The following tables were verified in the live `public` schema:

- `careers`
- `career_insights`
- `career_why_exists`
- `career_scenes`
- `career_path_steps`
- `career_future_roles`
- `exams`
- `exam_details`
- `profiles`

`public.site_settings` is **VERIFIED MISSING** from the live public-table inventory. It was not created.

## Authentication baseline

The project authentication settings were documented as follows:

- Email authentication: **ENABLED**.
- Google authentication: **ENABLED**.
- Sign-ups: **ENABLED**.
- Email confirmation: **ENABLED**.
- `/auth/callback`: **VERIFIED** as missing before Phase 1.
- Phase 1 subsequently added the application `/auth/callback` route.
- Auth redirect allow-list: **UNVERIFIED / NOT CAPTURED**.

## 2. Columns

These are observed application/live column names. Complete SQL metadata is not available, so types, defaults, nullability, and generated/identity properties remain **UNVERIFIED**.

| Table | Observed columns |
|---|---|
| `careers` | `id`, `title`, `slug`, `category`, `description`, `salary`, `demand`, `difficulty`, `future_scope`, `hero_image`, `hero_video`, `primary_color`, `secondary_color`, `universe_nodes`, `paths` |
| `career_insights` | `id`, `career_slug`, `small_heading`, `title`, `short_description`, `deep_details`, `card_order`, `position`, `tags` |
| `career_why_exists` | `career_slug`, `heading`, `content`, `display_order` |
| `career_scenes` | `career_slug`, `title`, `description`, `image_url`, `display_order` |
| `career_path_steps` | `career_slug`, `heading`, `percentage`, `short_description`, `display_order` |
| `career_future_roles` | `career_slug`, `role_name`, `short_description`, `image_url` |
| `exams` | `id`, `title`, `slug`, `category`, `description`, `exam_date`, `registration_link`, `official_website`, `eligibility`, `difficulty`, `created_at` |
| `exam_details` | `exam_id`, `overview`, `qualification`, `stream_requirement`, `attempts`, `age_limit`, `roadmap`, `competition_reality` |
| `profiles` | `id`, `role` |

The complete machine-readable inventory is [supabase/schema.inventory.json](../supabase/schema.inventory.json).

## 3. Relationships

No complete live foreign-key inventory was captured. The following are **APPLICATION-LEVEL ASSUMPTIONS**, not verified database foreign keys:

- `career_insights.career_slug -> careers.slug`
- `career_why_exists.career_slug -> careers.slug`
- `career_scenes.career_slug -> careers.slug`
- `career_path_steps.career_slug -> careers.slug`
- `career_future_roles.career_slug -> careers.slug`
- `exam_details.exam_id -> exams.id`
- `profiles.id -> auth.users.id`

No relationships were changed.

## 4. Constraints

Primary keys, unique constraints, CHECK constraints, NOT NULL constraints, defaults, identity columns, and generated columns are **UNVERIFIED**.

In particular, uniqueness of `careers.slug` and `exams.slug` is not proven by the available evidence. No constraints were created or altered.

## 5. Indexes

The complete index inventory is **UNVERIFIED**. No claim is made about indexes for:

- `careers.slug`
- `careers.category`
- child-table `career_slug` columns
- `exams.slug`
- `exam_details.exam_id`
- `profiles.id`

No indexes were created.

## 6. Functions

The complete live function inventory is **UNVERIFIED**. Function names, arguments, return types, language, volatility, and `SECURITY INVOKER`/`SECURITY DEFINER` mode were not captured.

No functions were created or modified.

## 7. Triggers

The complete live trigger inventory is **UNVERIFIED**. This includes triggers involving `auth.users` and `profiles`, trigger timing/events, called functions, function bodies, and security modes.

The application expects a profile-creation trigger, but that remains an **APPLICATION-LEVEL ASSUMPTION** until live trigger metadata is captured.

No triggers were created or modified.

## 8. RLS status

RLS enablement and policy definitions remain **UNVERIFIED**. This baseline does not infer policy names, roles, operations, `USING` expressions, or `WITH CHECK` expressions.

No RLS policy was changed.

## 9. Storage status

The `career-media` bucket was verified as follows:

| Item | Status |
|---|---|
| Bucket exists | VERIFIED |
| Visibility | VERIFIED: public |
| File-size display | VERIFIED: Dashboard showed `Unset (50 MB)` |
| MIME restrictions | VERIFIED: `Any` |
| Policy count | VERIFIED: Dashboard displayed `2` |
| Policy names/roles/operations/expressions | UNVERIFIED |

No bucket or Storage policy was changed.

## 10. Known mismatches

- `public.site_settings` is missing, while application code references it. It was not created.
- The application uses slug/id relationships that are not verified database foreign keys.
- No prior source-controlled Supabase migration directory was present in the repository.
- **UNVERIFIED / NOT CAPTURED:** live migration history was not captured in the local evidence set.
- The application expects a profile creation trigger whose live definition is not captured.

## 11. Unverified items

The following must be captured before an executable baseline migration is generated:

- Complete column types, defaults, nullability, and identity/generated metadata
- Primary keys, unique constraints, CHECK constraints, and NOT NULL constraints
- Foreign keys and `ON DELETE`/`ON UPDATE` behavior
- Index names, columns, uniqueness, composite/partial status
- Function definitions and security modes
- Trigger definitions and trigger function bodies/security modes
- RLS enablement and policy expressions
- Storage policy definitions
- Generated TypeScript database types from the complete live schema

## 12. Migration strategy for future phases

No executable migration was generated in Phase 2A. **UNVERIFIED / NOT CAPTURED:** live migration history was not captured in the local evidence set, and the available evidence is insufficient to reproduce exact DDL safely.

Future database work should:

1. Capture a complete read-only schema export from the live project.
2. Review that export against [supabase/schema.inventory.json](../supabase/schema.inventory.json).
3. Add a reviewed baseline migration representing only verified current state.
4. Validate the baseline against a disposable database before applying any migration workflow.
5. Keep later schema redesigns separate from the baseline migration.

The reserved migration directory contains only [supabase/migrations/README.md](../supabase/migrations/README.md) and no executable SQL.

## Generated TypeScript types

Types were **NOT GENERATED** in this phase. The complete live schema metadata required for accurate Supabase `Database` types was not captured, and generating types from application assumptions would falsely represent unverified database state.

## Validation

Required repository checks:

- `npx tsc --noEmit`
- `npm run build`

These validate the repository only; they do not prove unresolved live database metadata.
