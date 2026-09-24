"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteCareerButton from "@/features/careers/admin/DeleteCareerButton";
import { createCareer } from "@/app/admin/actions";
import {
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ArrowRight,
  Rocket,
} from "lucide-react";

type Career = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  salary: string;
  demand: string;
  difficulty: string;
  hero_image: string;
  primary_color: string;
  secondary_color: string;
  created_at?: string;
  [key: string]: any;
};

type Props = {
  careers: Career[];
  categories: string[];
  initialQuery: string;
};

type SortMode = "newest" | "oldest" | "title-az" | "title-za";

export default function CareersClient({
  careers,
  categories,
  initialQuery,
}: Props) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortMode>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  /* â”€â”€ Filtered + sorted list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

  const filtered = useMemo(() => {
    let result = [...careers];

    // Local search (in addition to server-side ?q=)
    if (localSearch && !initialQuery) {
      const q = localSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q) ||
          c.slug?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((c) => c.category === category);
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "title-az":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "title-za":
        result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
        break;
    }

    return result;
  }, [careers, localSearch, initialQuery, category, sort]);

  /* â”€â”€ Search submission (server-side) â”€â”€ */

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(`/admin/careers?q=${encodeURIComponent(localSearch.trim())}`);
    } else {
      router.push("/admin/careers");
    }
  }

  return (
    <>
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TOOLBAR â€” search, filter, sort, view
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 mb-6">
        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 flex items-center gap-2 h-10 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] focus-within:border-fuchsia-500/40 transition-colors"
          >
            <Search size={14} className="text-zinc-500 shrink-0" />
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search careers by title, category or slugâ€¦"
              className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-600"
            />
            {(localSearch || initialQuery) && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  if (initialQuery) router.push("/admin/careers");
                }}
                className="text-zinc-500 hover:text-white transition text-xs shrink-0"
              >
                Clear
              </button>
            )}
          </form>

          {/* Category filter */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                h-10 pl-3 pr-8
                rounded-lg border border-white/[0.08]
                bg-white/[0.03] text-sm text-zinc-300
                appearance-none cursor-pointer outline-none
                focus:border-fuchsia-500/40 transition-colors
                w-full md:w-auto
              "
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="
                h-10 pl-3 pr-8
                rounded-lg border border-white/[0.08]
                bg-white/[0.03] text-sm text-zinc-300
                appearance-none cursor-pointer outline-none
                focus:border-fuchsia-500/40 transition-colors
                w-full md:w-auto
              "
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-az">Title A â†’ Z</option>
              <option value="title-za">Title Z â†’ A</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
          </div>

          {/* View toggle */}
          <div className="hidden md:flex items-center rounded-lg border border-white/[0.08] overflow-hidden shrink-0">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`h-10 w-10 flex items-center justify-center transition-colors ${
                view === "grid"
                  ? "bg-fuchsia-500/15 text-fuchsia-400"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`h-10 w-10 flex items-center justify-center transition-colors ${
                view === "list"
                  ? "bg-fuchsia-500/15 text-fuchsia-400"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Search results count */}
      {initialQuery && (
        <p className="text-zinc-500 text-xs mb-4">
          Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{initialQuery}&quot;
        </p>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CAREER GRID / LIST
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      {filtered.length > 0 ? (
        view === "grid" ? (
          /* â”€â”€ GRID VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((career) => (
              <Link
                key={career.id}
                href={`/admin/careers/${career.id}`}
                className="
                  group relative overflow-hidden
                  rounded-2xl border border-white/[0.07]
                  bg-white/[0.02]
                  hover:border-fuchsia-500/25
                  hover:-translate-y-0.5
                  transition-all duration-300
                  flex flex-col
                "
              >
                {/* Image area */}
                <div className="relative h-36 overflow-hidden shrink-0">
                  {career.hero_image &&
                  !career.hero_image.includes("default") ? (
                    <img
                      src={career.hero_image}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(135deg, ${career.primary_color || "#d946ef"}, ${career.secondary_color || "#9333ea"})`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="
                      inline-block px-2.5 py-1 rounded-md
                      bg-black/50 backdrop-blur-md border border-white/10
                      text-[10px] uppercase tracking-wider font-semibold text-fuchsia-400
                    ">
                      {career.category || "Uncategorized"}
                    </span>
                  </div>

                  {/* Three-dot menu */}
                  <div
                    className="absolute top-2.5 right-2.5"
                    onClick={(e) => e.preventDefault()}
                  >
                    <DeleteCareerButton
                      id={String(career.id)}
                      title={career.title}
                      slug={career.slug}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-4 pt-3">
                  <h3 className="text-base font-bold leading-snug mb-1.5 group-hover:text-fuchsia-300 transition-colors line-clamp-1">
                    {career.title}
                  </h3>

                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                    {career.description || "No description available."}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider mb-4">
                    {career.demand && (
                      <span className={`
                        px-2 py-0.5 rounded
                        ${["high", "very high", "growing"].includes(career.demand.toLowerCase())
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/[0.04] text-zinc-500 border border-white/[0.06]"
                        }
                      `}>
                        {career.demand}
                      </span>
                    )}
                    {career.difficulty && (
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-zinc-500 border border-white/[0.06]">
                        {career.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Edit link */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 group-hover:text-fuchsia-400 transition-colors">
                    Edit Career
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* â”€â”€ LIST VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          <div className="space-y-2">
            {filtered.map((career) => (
              <Link
                key={career.id}
                href={`/admin/careers/${career.id}`}
                className="
                  group flex items-center gap-4
                  rounded-xl border border-white/[0.07]
                  bg-white/[0.02] p-3
                  hover:border-fuchsia-500/25
                  hover:bg-white/[0.03]
                  transition-all duration-200
                "
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  {career.hero_image &&
                  !career.hero_image.includes("default") ? (
                    <img
                      src={career.hero_image}
                      alt={career.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(135deg, ${career.primary_color || "#d946ef"}, ${career.secondary_color || "#9333ea"})`,
                      }}
                    />
                  )}
                </div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate group-hover:text-fuchsia-300 transition-colors">
                    {career.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-wider text-fuchsia-400/70">
                      {career.category || "Uncategorized"}
                    </span>
                    {career.demand && (
                      <>
                        <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                        <span className="text-[10px] text-zinc-500">
                          {career.demand}
                        </span>
                      </>
                    )}
                    {career.difficulty && (
                      <>
                        <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                        <span className="text-[10px] text-zinc-500">
                          {career.difficulty}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Salary */}
                <div className="hidden md:block text-xs text-zinc-500 shrink-0">
                  {career.salary || "â€”"}
                </div>

                {/* Actions */}
                <div
                  className="shrink-0"
                  onClick={(e) => e.preventDefault()}
                >
                  <DeleteCareerButton
                    id={String(career.id)}
                    title={career.title}
                    slug={career.slug}
                  />
                </div>

                <ArrowRight
                  size={14}
                  className="text-zinc-600 group-hover:text-fuchsia-400 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>
            ))}
          </div>
        )
      ) : (
        /* â”€â”€ EMPTY STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-6">
            <Rocket size={28} className="text-fuchsia-400" />
          </div>

          <h3 className="text-xl font-bold mb-2">
            {initialQuery || localSearch ? "No careers found" : "No careers yet"}
          </h3>

          <p className="text-zinc-500 text-sm mb-6 max-w-sm">
            {initialQuery || localSearch
              ? `No careers match your search. Try a different query.`
              : "Start building the StudentPath career ecosystem."}
          </p>

          {!(initialQuery || localSearch) && (
            <form action={createCareer}>
              <button
                type="submit"
                className="
                  flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-fuchsia-600 hover:bg-fuchsia-500
                  transition-all duration-200
                  font-semibold text-sm
                  shadow-[0_0_20px_rgba(217,70,239,0.3)]
                "
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Create First Career
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
