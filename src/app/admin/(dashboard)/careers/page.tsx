import Link from "next/link";
import DeleteCareerButton from "@/features/careers/admin/DeleteCareerButton";
import { getAdminCareers } from "@/features/careers/admin-repository";
import { createCareer } from "@/app/admin/actions";
import CareersClient from "./CareersClient";

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const { data: careers, error } = await getAdminCareers(q);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-white">
        Failed to load careers.
      </div>
    );
  }

  /* â”€â”€ Compute real statistics â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const total = careers?.length ?? 0;
  const categories = Array.from(
    new Set((careers || []).map((c: any) => c.category).filter(Boolean))
  ) as string[];
  const highDemandCount = (careers || []).filter(
    (c: any) =>
      c.demand &&
      ["high", "very high", "growing"].includes(c.demand.toLowerCase())
  ).length;

  return (
    <main className="min-h-screen text-white">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PAGE HEADER
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-black/70 backdrop-blur-2xl">
        <div className="px-4 md:px-8 py-4 md:py-5 flex items-center justify-between gap-4">

          {/* Left: title */}
          <div className="min-w-0">
            <p className="uppercase tracking-[0.25em] text-fuchsia-400 text-[10px] font-semibold mb-1">
              StudentPath Admin
            </p>
            <h1 className="text-xl md:text-2xl font-black tracking-tight truncate">
              Career Management
            </h1>
          </div>

          {/* Right: create button */}
          <form action={createCareer}>
            <button
              type="submit"
              className="
                flex items-center gap-2
                h-10 px-4 md:px-5
                rounded-xl
                bg-fuchsia-600 hover:bg-fuchsia-500
                transition-all duration-200
                font-semibold text-sm
                shadow-[0_0_20px_rgba(217,70,239,0.3)]
                shrink-0
              "
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">New Career</span>
            </button>
          </form>
        </div>
      </header>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          BODY
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      <div className="p-4 md:p-6 lg:p-8">

        {/* â”€â”€ Statistics strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Careers", value: total, accent: false },
            { label: "High Demand", value: highDemandCount, accent: highDemandCount > 0 },
            { label: "Categories", value: categories.length, accent: false },
            { label: "Search Active", value: q ? `"${q}"` : "â€”", accent: !!q },
          ].map((stat) => (
            <div
              key={stat.label}
              className="
                rounded-xl border border-white/[0.07]
                bg-white/[0.02] px-4 py-3
              "
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                {stat.label}
              </p>
              <p className={`text-lg font-bold tabular-nums truncate ${stat.accent ? "text-fuchsia-400" : "text-white"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* â”€â”€ Client wrapper handles search, filter, sort, view â”€â”€ */}
        <CareersClient
          careers={careers || []}
          categories={categories}
          initialQuery={q || ""}
        />
      </div>
    </main>
  );
}
