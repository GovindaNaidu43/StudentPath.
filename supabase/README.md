# StudentPath Supabase Baseline

This directory is the source-controlled home for the StudentPath database baseline.

## Current phase

Phase 2A is baseline-only. The files here document the currently verified live project without changing it.

- No live SQL was executed from this repository.
- No executable migration is included because the complete live DDL was not captured.
- No prior source-controlled Supabase migration directory was present in the repository.
- No table, column, constraint, index, function, trigger, RLS policy, Storage policy, or data was modified.
- `site_settings` is intentionally absent because it was verified missing from the live public schema.

## Authentication baseline

- Email authentication: **ENABLED**.
- Google authentication: **ENABLED**.
- Sign-ups: **ENABLED**.
- Email confirmation: **ENABLED**.
- `/auth/callback`: missing before Phase 1; Phase 1 subsequently added the application callback route.
- Auth redirect allow-list: **UNVERIFIED / NOT CAPTURED**.

## Evidence states

- **VERIFIED**: directly captured from the authenticated Supabase Dashboard or existing verified report.
- **UNVERIFIED**: not captured sufficiently to reproduce safely.
- **APPLICATION-LEVEL ASSUMPTION**: inferred from application queries, forms, or comments; not a database guarantee.

See:

- [`schema.inventory.json`](schema.inventory.json) for the source-controlled inventory.
- [`../docs/DATABASE_BASELINE.md`](../docs/DATABASE_BASELINE.md) for the narrative baseline and readiness boundary.
- [`migrations/README.md`](migrations/README.md) for why no executable baseline migration was generated.

## Future workflow

Before creating executable migrations, capture a complete schema dump from the live project and reconcile it against `schema.inventory.json`. That capture must include constraints, indexes, functions, triggers, RLS policies, and Storage policies. This phase deliberately does not perform that reconciliation or any live database write.
