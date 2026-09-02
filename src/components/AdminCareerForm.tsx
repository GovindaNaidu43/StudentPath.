"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import { updateCareer, deleteCareer } from "@/app/admin/actions";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  LayoutDashboard,
  Image as ImageIcon,
  Lightbulb,
  HelpCircle,
  Film,
  Map,
  Rocket,
  ChevronLeft,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */

type Props = {
  career: any;
};

type SectionId =
  | "overview"
  | "media"
  | "insights"
  | "why"
  | "scenes"
  | "roadmap"
  | "future";

/* ─────────────────────────────────────────
   SECTION REGISTRY
───────────────────────────────────────── */

const SECTIONS: {
  id: SectionId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  desc: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    shortLabel: "Overview",
    icon: LayoutDashboard,
    desc: "Core identity, metrics, description & colors",
  },
  {
    id: "media",
    label: "Hero Media",
    shortLabel: "Media",
    icon: ImageIcon,
    desc: "Hero image and cinematic video",
  },
  {
    id: "insights",
    label: "Insights",
    shortLabel: "Insights",
    icon: Lightbulb,
    desc: "Premium insight cards",
  },
  {
    id: "why",
    label: "Why It Exists",
    shortLabel: "Why",
    icon: HelpCircle,
    desc: "Educational origin sections",
  },
  {
    id: "scenes",
    label: "Career Scenes",
    shortLabel: "Scenes",
    icon: Film,
    desc: "Real-world visual moments",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    shortLabel: "Roadmap",
    icon: Map,
    desc: "Student journey path steps",
  },
  {
    id: "future",
    label: "Future Roles",
    shortLabel: "Future",
    icon: Rocket,
    desc: "Where this career leads",
  },
];

/* ─────────────────────────────────────────
   SHARED UI PRIMITIVES
───────────────────────────────────────── */

const inputCls =
  "w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-500/80 focus:bg-white/[0.07] transition-all duration-200 text-sm placeholder-zinc-600";

const textareaCls =
  "w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-500/80 focus:bg-white/[0.07] transition-all duration-200 text-sm leading-relaxed resize-none placeholder-zinc-600";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
      {children}
    </label>
  );
}

function SectionHeader({
  label,
  desc,
}: {
  label: string;
  desc: string;
}) {
  return (
    <div className="mb-8 pb-6 border-b border-white/[0.06]">
      <p className="uppercase tracking-[0.3em] text-fuchsia-400 text-[10px] font-semibold mb-2">
        {label}
      </p>
      <p className="text-zinc-500 text-sm">{desc}</p>
    </div>
  );
}

function SubSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="uppercase tracking-[0.25em] text-zinc-500 text-[10px] font-semibold mb-5">
      {children}
    </p>
  );
}

function DividerLine() {
  return <div className="border-t border-white/[0.06] my-8" />;
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-4 rounded-xl border border-dashed border-fuchsia-500/30 bg-fuchsia-500/[0.05] hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 transition-all duration-200 text-sm font-medium text-fuchsia-400 flex items-center justify-center gap-2"
    >
      <Plus size={15} />
      {children}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 text-xs font-medium"
    >
      <Trash2 size={12} />
      Remove
    </button>
  );
}

function CardShell({
  badge,
  onRemove,
  children,
}: {
  badge: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md">
          {badge}
        </span>
        <RemoveButton onClick={onRemove} />
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function AdminCareerForm({ career }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function handleDelete() {
    startDeleteTransition(async () => {
      await deleteCareer(career.id);
    });
  }

  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  /* ─── Form state (unchanged) ────────── */

  const [formData, setFormData] = useState({
    title: career.title || "",
    slug: career.slug || "",
    category: career.category || "",
    salary: career.salary || "",
    demand: career.demand || "",
    difficulty: career.difficulty || "",
    description: career.description || "",
    primary_color: career.primary_color || "#d946ef",
    secondary_color: career.secondary_color || "#9333ea",
    hero_image: career.hero_image || "",
    hero_video: career.hero_video || "",
    insights: career.career_insights || [],
    whyExists: career.career_why_exists || [],
    scenes: career.career_scenes || [],
    pathSteps: career.career_path_steps || [],
    future_roles: career.future_roles || [],
  });

  /* ─── Field helpers (unchanged) ─────── */

  function updateField(key: string, value: string) {
    setSaveStatus("idle");
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  /* ─── Insights (unchanged) ──────────── */

  function updateInsight(index: number, key: string, value: string) {
    setSaveStatus("idle");
    setFormData((prev) => {
      const updated = [...prev.insights];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, insights: updated };
    });
  }

  function addInsight() {
    setFormData((prev) => ({
      ...prev,
      insights: [
        ...prev.insights,
        {
          small_heading: "",
          title: "",
          short_description: "",
          deep_details: "",
          card_order: prev.insights.length + 1,
        },
      ],
    }));
  }

  function removeInsight(index: number) {
    setFormData((prev) => ({
      ...prev,
      insights: prev.insights.filter((_: any, i: number) => i !== index),
    }));
  }

  /* ─── Why Exists (unchanged) ─────────── */

  function updateWhyBlock(index: number, key: string, value: string) {
    setSaveStatus("idle");
    setFormData((prev) => {
      const updated = [...prev.whyExists];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, whyExists: updated };
    });
  }

  function addWhyBlock() {
    setFormData((prev) => ({
      ...prev,
      whyExists: [
        ...prev.whyExists,
        {
          heading: "",
          content: "",
          display_order: prev.whyExists.length + 1,
        },
      ],
    }));
  }

  function removeWhyBlock(index: number) {
    setFormData((prev) => ({
      ...prev,
      whyExists: prev.whyExists.filter((_: any, i: number) => i !== index),
    }));
  }

  /* ─── Scenes (unchanged) ─────────────── */

  function updateScene(index: number, key: string, value: string) {
    setSaveStatus("idle");
    setFormData((prev) => {
      const updated = [...prev.scenes];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, scenes: updated };
    });
  }

  function addScene() {
    setFormData((prev) => ({
      ...prev,
      scenes: [
        ...prev.scenes,
        {
          title: "",
          description: "",
          image_url: "",
          display_order: prev.scenes.length + 1,
        },
      ],
    }));
  }

  function removeScene(index: number) {
    setFormData((prev) => ({
      ...prev,
      scenes: prev.scenes.filter((_: any, i: number) => i !== index),
    }));
  }

  /* ─── Path Steps (unchanged) ─────────── */

  function updatePathStep(index: number, key: string, value: any) {
    setSaveStatus("idle");
    setFormData((prev) => {
      const updated = [...prev.pathSteps];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, pathSteps: updated };
    });
  }

  function addPathStep() {
    setFormData((prev) => ({
      ...prev,
      pathSteps: [
        ...prev.pathSteps,
        {
          heading: "",
          percentage: 0,
          short_description: "",
          display_order: prev.pathSteps.length + 1,
        },
      ],
    }));
  }

  function removePathStep(index: number) {
    setFormData((prev) => ({
      ...prev,
      pathSteps: prev.pathSteps.filter((_: any, i: number) => i !== index),
    }));
  }

  /* ─── Future Roles (unchanged) ──────── */

  function updateFutureRole(index: number, key: string, value: string) {
    setSaveStatus("idle");
    setFormData((prev) => {
      const updated = [...prev.future_roles];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, future_roles: updated };
    });
  }

  function addFutureRole() {
    setFormData((prev) => ({
      ...prev,
      future_roles: [
        ...prev.future_roles,
        { role_name: "", short_description: "", image_url: "" },
      ],
    }));
  }

  function removeFutureRole(index: number) {
    setFormData((prev) => ({
      ...prev,
      future_roles: prev.future_roles.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  }

  /* ─── Form submit (unchanged) ────────── */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaveStatus("idle");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await updateCareer(fd);
        setSaveStatus("success");
      } catch {
        setSaveStatus("error");
      }
    });
  }

  /* ─── Save status UI helpers ─────────── */

  const SaveStatusIndicator = () => {
    if (isPending) {
      return (
        <span className="flex items-center gap-1.5 text-fuchsia-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          Saving…
        </span>
      );
    }
    if (saveStatus === "success") {
      return (
        <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
          <CheckCircle size={12} />
          Saved successfully
        </span>
      );
    }
    if (saveStatus === "error") {
      return (
        <span className="flex items-center gap-1.5 text-red-400 text-xs font-medium">
          <AlertCircle size={12} />
          Save failed
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        All changes saved
      </span>
    );
  };

  /* ─── Save button ────────────────────── */

  const SaveButton = ({ className = "" }: { className?: string }) => (
    <button
  type="submit"
  form="career-editor-form"
  disabled={isPending}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-xl
        bg-fuchsia-600 hover:bg-fuchsia-500 active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 font-semibold text-sm
        shadow-[0_0_24px_rgba(217,70,239,0.35)]
        ${className}
      `}
    >
      {isPending && <Loader2 size={14} className="animate-spin" />}
      {isPending ? "Saving…" : "Save Changes"}
    </button>
  );

  /* ─── Render ─────────────────────────── */

  return (
    <div className="flex flex-col h-full">

      {/* ══════════════════════════════════════
          STICKY TOP HEADER
      ══════════════════════════════════════ */}

      <header className="sticky top-0 z-50 shrink-0 border-b border-white/[0.07] bg-black/70 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 h-14">

          {/* Left: back + identity */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/admin/careers"
              className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-200 shrink-0 text-sm"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Careers</span>
            </Link>

            <div className="w-px h-5 bg-white/10 shrink-0" />

            <div className="min-w-0">
              <p className="uppercase tracking-[0.25em] text-fuchsia-400 text-[9px] font-semibold leading-none mb-0.5">
                Career Editor
              </p>
              <p className="text-sm font-bold text-white truncate leading-tight">
                {formData.title || "Untitled Career"}
              </p>
            </div>
          </div>

          {/* Right: status + save */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:block">
              <SaveStatusIndicator />
            </div>
            <SaveButton />
          </div>
        </div>

        {/* Mobile tab bar */}
        <nav className="lg:hidden flex overflow-x-auto scrollbar-none border-t border-white/[0.06] bg-black/40">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={`
                  flex items-center gap-1.5 shrink-0 px-4 py-2.5 text-xs font-medium
                  border-b-2 transition-all duration-200 whitespace-nowrap
                  ${active
                    ? "border-fuchsia-500 text-fuchsia-300 bg-fuchsia-500/[0.07]"
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }
                `}
              >
                <Icon size={13} />
                {s.shortLabel}
              </button>
            );
          })}
          <div className="w-[1px] h-4 bg-white/10 my-auto mx-1 shrink-0" />
          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="
              flex items-center gap-1.5 shrink-0 px-4 py-2.5 text-xs font-medium
              border-b-2 border-transparent text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 whitespace-nowrap
            "
          >
            <Trash2 size={13} />
            Delete
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════
          BODY: SIDEBAR + CONTENT
      ══════════════════════════════════════ */}

      <div className="flex flex-1 min-h-0">

        {/* ── DESKTOP LEFT SIDEBAR ───────────── */}

        <aside className="hidden lg:flex flex-col w-56 xl:w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-white/[0.06] bg-black/20 backdrop-blur-xl overflow-y-auto">
          <div className="p-4 pt-6">

            {/* Section nav */}
            <p className="uppercase tracking-[0.25em] text-[9px] font-semibold text-zinc-600 mb-4 px-2">
              Career Content
            </p>

            <nav className="space-y-0.5">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const active = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSection(s.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-left transition-all duration-200 group
                      ${active
                        ? "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                      }
                    `}
                  >
                    <Icon
                      size={15}
                      className={active ? "text-fuchsia-400" : "text-zinc-600 group-hover:text-zinc-400"}
                    />
                    <span className="text-sm font-medium">{s.label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="border-t border-white/[0.06] my-6" />

            {/* Quick stats */}
            <p className="uppercase tracking-[0.25em] text-[9px] font-semibold text-zinc-600 mb-4 px-2">
              Content Summary
            </p>

            <div className="space-y-2 px-2">
              {[
                { label: "Insights", value: formData.insights.length },
                { label: "Why Sections", value: formData.whyExists.length },
                { label: "Scenes", value: formData.scenes.length },
                { label: "Roadmap Steps", value: formData.pathSteps.length },
                { label: "Future Roles", value: formData.future_roles.length },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-zinc-600">{item.label}</span>
                  <span className="font-bold text-zinc-300 tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Color preview */}
            <div className="border-t border-white/[0.06] my-6" />

            <div className="px-2">
              <p className="uppercase tracking-[0.25em] text-[9px] font-semibold text-zinc-600 mb-3">
                Brand Colors
              </p>
              <div
                className="h-10 rounded-xl mb-3"
                style={{
                  background: `linear-gradient(135deg, ${formData.primary_color}, ${formData.secondary_color})`,
                }}
              />
              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-600">
                <div>
                  <p className="mb-0.5">Primary</p>
                  <p className="font-mono text-zinc-400">
                    {formData.primary_color}
                  </p>
                </div>
                <div>
                  <p className="mb-0.5">Secondary</p>
                  <p className="font-mono text-zinc-400">
                    {formData.secondary_color}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="mt-auto p-4 border-t border-red-500/10 bg-red-500/[0.02]">
            <p className="uppercase tracking-[0.25em] text-[9px] font-semibold text-red-500/50 mb-3 px-2">
              Danger Zone
            </p>
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 size={15} />
              <span className="text-sm font-medium">Delete Career</span>
            </button>
          </div>
        </aside>

        {/* ══════════════════════════════════════
            MAIN CONTENT PANEL — SINGLE FORM
        ══════════════════════════════════════ */}

        <main className="flex-1 min-w-0 overflow-y-auto">
          <form
  id="career-editor-form"
  onSubmit={handleSubmit}
>

            {/* ── ALWAYS-MOUNTED HIDDEN FIELDS ── */}
            <input type="hidden" name="id" value={career.id} />
            <input
              type="hidden"
              name="insights"
              value={JSON.stringify(formData.insights)}
            />
            <input
              type="hidden"
              name="whyExists"
              value={JSON.stringify(formData.whyExists)}
            />
            <input
              type="hidden"
              name="scenes"
              value={JSON.stringify(formData.scenes)}
            />
            <input
              type="hidden"
              name="pathSteps"
              value={JSON.stringify(formData.pathSteps)}
            />
            <input
              type="hidden"
              name="future_roles"
              value={JSON.stringify(formData.future_roles)}
            />

            {/* ════════════════════════════════════
                SECTION 1 — OVERVIEW
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "overview" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Overview"
                desc="Core identity, metrics, description and visual identity of this career."
              />

              {/* Career Identity */}
              <SubSectionLabel>Career Identity</SubSectionLabel>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <FieldLabel>Slug</FieldLabel>
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    className={`${inputCls} font-mono`}
                    placeholder="e.g. software-engineer"
                  />
                </div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Technology"
                  />
                </div>
              </div>

              <DividerLine />

              {/* Career Metrics */}
              <SubSectionLabel>Career Metrics</SubSectionLabel>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div>
                  <FieldLabel>Salary Range</FieldLabel>
                  <input
                    name="salary"
                    value={formData.salary}
                    onChange={(e) => updateField("salary", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. ₹6L – ₹20L"
                  />
                </div>
                <div>
                  <FieldLabel>Demand Level</FieldLabel>
                  <input
                    name="demand"
                    value={formData.demand}
                    onChange={(e) => updateField("demand", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. High"
                  />
                </div>
                <div>
                  <FieldLabel>Difficulty</FieldLabel>
                  <input
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => updateField("difficulty", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Medium"
                  />
                </div>
              </div>

              <DividerLine />

              {/* Description */}
              <SubSectionLabel>Career Description</SubSectionLabel>
              <div className="mb-8">
                <FieldLabel>Short Description</FieldLabel>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={6}
                  className={textareaCls}
                  placeholder="Describe the emotional vision, mission, and future potential of this career…"
                />
              </div>

              <DividerLine />

              {/* Visual Identity */}
              <SubSectionLabel>Visual Identity</SubSectionLabel>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>Primary Color</FieldLabel>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="primary_color"
                      value={formData.primary_color}
                      onChange={(e) =>
                        updateField("primary_color", e.target.value)
                      }
                      className="h-10 w-14 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      value={formData.primary_color}
                      onChange={(e) =>
                        updateField("primary_color", e.target.value)
                      }
                      className={`${inputCls} font-mono`}
                      placeholder="#d946ef"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Secondary Color</FieldLabel>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="secondary_color"
                      value={formData.secondary_color}
                      onChange={(e) =>
                        updateField("secondary_color", e.target.value)
                      }
                      className="h-10 w-14 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                    />
                    <input
                      value={formData.secondary_color}
                      onChange={(e) =>
                        updateField("secondary_color", e.target.value)
                      }
                      className={`${inputCls} font-mono`}
                      placeholder="#9333ea"
                    />
                  </div>
                </div>
              </div>

              {/* Color preview bar */}
              <div
                className="h-8 rounded-xl mt-4 opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${formData.primary_color}, ${formData.secondary_color})`,
                }}
              />
            </div>

            {/* ════════════════════════════════════
                SECTION 2 — HERO MEDIA
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "media" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Hero Media"
                desc="Upload and manage the hero image and cinematic video for this career."
              />

              {/* Hero Image */}
              <SubSectionLabel>Hero Image</SubSectionLabel>
              <input
                type="hidden"
                name="hero_image"
                value={formData.hero_image}
              />
              <div className="mb-8">
                <ImageUpload
                  value={formData.hero_image}
                  onUpload={(url) =>
                    setFormData((prev) => ({ ...prev, hero_image: url }))
                  }
                  type="image"
                />
              </div>

              <DividerLine />

              {/* Hero Video */}
              <SubSectionLabel>Hero Video</SubSectionLabel>
              <input
                type="hidden"
                name="hero_video"
                value={formData.hero_video}
              />
              <ImageUpload
                value={formData.hero_video}
                onUpload={(url) =>
                  setFormData((prev) => ({ ...prev, hero_video: url }))
                }
                type="video"
              />
            </div>

            {/* ════════════════════════════════════
                SECTION 3 — INSIGHTS
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "insights" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Career Insights"
                desc="Manage premium insight cards shown inside the public career experience."
              />

              <div className="space-y-4">
                {formData.insights.map((insight: any, index: number) => (
                  <CardShell
                    key={index}
                    badge={`Insight ${String(index + 1).padStart(2, "0")}`}
                    onRemove={() => removeInsight(index)}
                  >
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <FieldLabel>Small Heading</FieldLabel>
                        <input
                          value={insight.small_heading || ""}
                          onChange={(e) =>
                            updateInsight(index, "small_heading", e.target.value)
                          }
                          className={inputCls}
                          placeholder="e.g. What You Build"
                        />
                      </div>
                      <div>
                        <FieldLabel>Main Title</FieldLabel>
                        <input
                          value={insight.title || ""}
                          onChange={(e) =>
                            updateInsight(index, "title", e.target.value)
                          }
                          className={inputCls}
                          placeholder="e.g. Real-World Products"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <FieldLabel>Short Description</FieldLabel>
                      <textarea
                        value={insight.short_description || ""}
                        onChange={(e) =>
                          updateInsight(
                            index,
                            "short_description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className={textareaCls}
                        placeholder="Brief description visible on the card…"
                      />
                    </div>
                    <div>
                      <FieldLabel>Deep Details</FieldLabel>
                      <textarea
                        value={insight.deep_details || ""}
                        onChange={(e) =>
                          updateInsight(index, "deep_details", e.target.value)
                        }
                        rows={5}
                        className={textareaCls}
                        placeholder="Full expanded detail shown when the card is opened…"
                      />
                    </div>
                  </CardShell>
                ))}

                <AddButton onClick={addInsight}>Add Insight</AddButton>
              </div>
            </div>

            {/* ════════════════════════════════════
                SECTION 4 — WHY IT EXISTS
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "why" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Why This Career Exists"
                desc="Educational content explaining the origin and purpose of this career."
              />

              <div className="space-y-4">
                {formData.whyExists.map((block: any, index: number) => (
                  <CardShell
                    key={index}
                    badge={`Section ${String(index + 1).padStart(2, "0")}`}
                    onRemove={() => removeWhyBlock(index)}
                  >
                    <div className="mb-4">
                      <FieldLabel>Heading</FieldLabel>
                      <input
                        value={block.heading || ""}
                        onChange={(e) =>
                          updateWhyBlock(index, "heading", e.target.value)
                        }
                        className={inputCls}
                        placeholder="e.g. The Age of Software"
                      />
                    </div>
                    <div>
                      <FieldLabel>Content</FieldLabel>
                      <textarea
                        value={block.content || ""}
                        onChange={(e) =>
                          updateWhyBlock(index, "content", e.target.value)
                        }
                        rows={6}
                        className={textareaCls}
                        placeholder="Explain why this career matters and how it came to be…"
                      />
                    </div>
                  </CardShell>
                ))}

                <AddButton onClick={addWhyBlock}>Add Section</AddButton>
              </div>
            </div>

            {/* ════════════════════════════════════
                SECTION 5 — CAREER SCENES
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "scenes" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Career Scenes"
                desc="Real-world visual moments students experience inside this career."
              />

              <div className="space-y-4">
                {formData.scenes.map((scene: any, index: number) => (
                  <CardShell
                    key={index}
                    badge={`Scene ${String(index + 1).padStart(2, "0")}`}
                    onRemove={() => removeScene(index)}
                  >
                    <div className="mb-4">
                      <FieldLabel>Title</FieldLabel>
                      <input
                        value={scene.title || ""}
                        onChange={(e) =>
                          updateScene(index, "title", e.target.value)
                        }
                        className={inputCls}
                        placeholder="e.g. Morning Standup"
                      />
                    </div>
                    <div className="mb-5">
                      <FieldLabel>Description</FieldLabel>
                      <textarea
                        value={scene.description || ""}
                        onChange={(e) =>
                          updateScene(index, "description", e.target.value)
                        }
                        rows={4}
                        className={textareaCls}
                        placeholder="Describe the scene students will visualize…"
                      />
                    </div>
                    <div>
                      <FieldLabel>Scene Image</FieldLabel>
                      <ImageUpload
                        value={scene.image_url || ""}
                        type="image"
                        onUpload={(url) => updateScene(index, "image_url", url)}
                      />
                    </div>
                  </CardShell>
                ))}

                <AddButton onClick={addScene}>Add Scene</AddButton>
              </div>
            </div>

            {/* ════════════════════════════════════
                SECTION 6 — ROADMAP
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "roadmap" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Student Roadmap"
                desc="Define the progressive path students should follow to enter this career."
              />

              <div className="space-y-4">
                {formData.pathSteps.map((step: any, index: number) => (
                  <CardShell
                    key={index}
                    badge={`Step ${String(index + 1).padStart(2, "0")}`}
                    onRemove={() => removePathStep(index)}
                  >
                    <div className="grid sm:grid-cols-[1fr_140px] gap-4 mb-4">
                      <div>
                        <FieldLabel>Step Heading</FieldLabel>
                        <input
                          value={step.heading || ""}
                          onChange={(e) =>
                            updatePathStep(index, "heading", e.target.value)
                          }
                          className={inputCls}
                          placeholder="e.g. Learn Programming Fundamentals"
                        />
                      </div>
                      <div>
                        <FieldLabel>Completion %</FieldLabel>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={step.percentage ?? 0}
                          onChange={(e) =>
                            updatePathStep(
                              index,
                              "percentage",
                              Number(e.target.value)
                            )
                          }
                          className={inputCls}
                          placeholder="60"
                        />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Short Description</FieldLabel>
                      <textarea
                        value={step.short_description || ""}
                        onChange={(e) =>
                          updatePathStep(
                            index,
                            "short_description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className={textareaCls}
                        placeholder="Describe what students do in this step…"
                      />
                    </div>
                  </CardShell>
                ))}

                <AddButton onClick={addPathStep}>Add Roadmap Step</AddButton>
              </div>
            </div>

            {/* ════════════════════════════════════
                SECTION 7 — FUTURE ROLES
            ════════════════════════════════════ */}

            <div
              style={{ display: activeSection === "future" ? "block" : "none" }}
              className="p-5 md:p-8 max-w-3xl"
            >
              <SectionHeader
                label="Future Roles"
                desc="Show students where this career can take them in the future."
              />

              <div className="space-y-4">
                {formData.future_roles.map((role: any, index: number) => (
                  <CardShell
                    key={index}
                    badge={`Role ${String(index + 1).padStart(2, "0")}`}
                    onRemove={() => removeFutureRole(index)}
                  >
                    <div className="mb-4">
                      <FieldLabel>Role Name</FieldLabel>
                      <input
                        value={role.role_name || ""}
                        onChange={(e) =>
                          updateFutureRole(index, "role_name", e.target.value)
                        }
                        className={inputCls}
                        placeholder="e.g. AI Engineer"
                      />
                    </div>
                    <div className="mb-5">
                      <FieldLabel>Short Description</FieldLabel>
                      <textarea
                        value={role.short_description || ""}
                        onChange={(e) =>
                          updateFutureRole(
                            index,
                            "short_description",
                            e.target.value
                          )
                        }
                        rows={4}
                        className={textareaCls}
                        placeholder="Describe this future opportunity…"
                      />
                    </div>
                    <div>
                      <FieldLabel>Role Image</FieldLabel>
                      <ImageUpload
                        value={role.image_url || ""}
                        type="image"
                        onUpload={(url) =>
                          updateFutureRole(index, "image_url", url)
                        }
                      />
                    </div>
                  </CardShell>
                ))}

                <AddButton onClick={addFutureRole}>Add Future Role</AddButton>
              </div>
            </div>

          </form>
        </main>
      </div>

      {/* ══════════════════════════════════════
          DELETE CONFIRMATION MODAL
      ══════════════════════════════════════ */}
      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => {
            e.stopPropagation();
            if (!isDeleting) setIsDeleteDialogOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Career?</h3>
                <p className="text-zinc-500 text-xs">This cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-2">
              You are about to permanently delete:
            </p>
            <p className="text-white font-semibold mb-1">
              {career.title || "Untitled Career"}
            </p>
            <p className="text-xs text-zinc-600 mb-6">
              This will also remove all related content (insights, scenes,
              roadmap, etc.)
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-zinc-300 hover:bg-white/[0.08] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting…" : "Delete Career"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}