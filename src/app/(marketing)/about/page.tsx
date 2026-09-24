import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Compass,
  Eye,
  Flag,
  Map,
  MousePointerClick,
  Route,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

import Navbar from "@/components/navigation/Navbar";
import ExploreFooter from "@/components/layout/ExploreFooter";

export const metadata: Metadata = {
  title: "About StudentPath | Govinda Naidu",
  description:
    "Meet Govinda Naidu, the founder and builder behind StudentPath - a platform designed to help students discover careers, understand pathways, and take meaningful next steps.",
};

const journey = [
  { label: "Discover", icon: Compass, color: "text-fuchsia-300" },
  { label: "Understand", icon: Eye, color: "text-violet-300" },
  { label: "Evaluate", icon: Target, color: "text-cyan-300" },
  { label: "Plan", icon: Map, color: "text-emerald-300" },
  { label: "Act", icon: MousePointerClick, color: "text-amber-300" },
];

const principles = [
  ["01", "Clarity over confusion", "A useful answer should make the next question easier to ask."],
  ["02", "Depth over noise", "Students need context, not another endless feed of disconnected facts."],
  ["03", "Reality over hype", "Every path has opportunity, effort, uncertainty, and trade-offs."],
  ["04", "Pathways over information", "Information matters when it helps someone understand what to do next."],
  ["05", "Action over endless browsing", "Exploration should eventually become a meaningful first step."],
  ["06", "Students first", "The product is shaped around the questions students are actually carrying."],
];

const currentProduct = [
  { title: "Career discovery", text: "Explore a growing universe of careers and the questions behind each path.", icon: Compass },
  { title: "Career experiences", text: "Career detail pages bring together insights, reality, scenes, paths, and future roles.", icon: Sparkles },
  { title: "Roadmaps and skills", text: "See the skills, exams, and steps that can turn interest into a direction.", icon: Route },
  { title: "Explore ecosystem", text: "Move between careers, exams, skills, colleges, and a student-focused mentor experience.", icon: BrainCircuit },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <section className="relative isolate flex min-h-[760px] items-end overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 sm:px-10 lg:min-h-[850px] lg:px-16 lg:pb-28">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_20%,rgba(217,70,239,0.2),transparent_27%),radial-gradient(circle_at_18%_70%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(135deg,#030303_0%,#08040f_48%,#02070b_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute right-[-12rem] top-24 -z-10 h-[34rem] w-[34rem] rounded-full border border-fuchsia-400/10 bg-fuchsia-500/10 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-300">
              <span className="h-px w-10 bg-fuchsia-400" /> The story behind StudentPath
            </p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-8xl lg:text-[9rem]">
              Building <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">StudentPath.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-300 sm:text-2xl">
              Helping students discover what they can become - and understand how to get there.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/explore" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-black transition hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-black">
                Explore StudentPath <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="#founder" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition hover:border-fuchsia-300/70 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-black">
                Meet the founder <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-24 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
            <span className="h-10 w-px bg-gradient-to-b from-fuchsia-400 to-transparent" /> Scroll through the idea
          </div>
        </div>
      </section>

      <section id="founder" className="mx-auto grid max-w-7xl gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-16 lg:py-36">
        <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0910] p-8 sm:p-12">
          <Image
            src="/images/govinda-naidu.jpg"
            alt="Govinda Naidu, founder of StudentPath"
            fill
            priority
            className="object-contain bg-black"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
          <div className="relative z-10 flex h-full min-h-[325px] flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/70">
              <span>Founder profile</span><UserRound size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="mt-[-1rem] text-2xl font-bold text-white">Govinda Naidu</p>
              <p className="mt-2 text-sm text-fuchsia-200">Founder &amp; Builder - StudentPath</p>
            </div>
          </div>
        </div>
        <div className="self-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">01 / Who I am</p>
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">Hi, I&apos;m Govinda.</h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-300">
            <p>I&apos;m a Computer Science and Engineering student, builder, and the founder of StudentPath.</p>
            <p>I&apos;m learning software engineering, product development, and entrepreneurship by building real products. I&apos;m not building from a place of having everything figured out. I&apos;m learning by doing.</p>
            <p>StudentPath is one of the ideas I chose to build around a problem that feels real to me: helping students understand where their future could lead.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07070a] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-300">02 / The question</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">I started with a question.</h2>
            <p className="mt-7 text-xl leading-relaxed text-zinc-300">Why does choosing a career so often feel like guessing?</p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {["Too many options", "Scattered information", "Unclear roadmaps", "Pressure without context"].map((item, index) => (
              <div key={item} className="bg-[#07070a] p-7 sm:p-9">
                <span className="text-sm text-fuchsia-300">0{index + 1}</span>
                <h3 className="mt-14 text-xl font-bold text-white">{item}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">The student is left to connect the pieces alone.</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-4 text-xl font-medium text-zinc-400 sm:grid-cols-2 lg:grid-cols-3">
            {["What should I choose?", "Am I suited for it?", "What does it really feel like?", "Which exams matter?", "What skills do I need?", "What should I do next?"] .map((question) => (
              <p key={question} className="border-l border-fuchsia-400/50 pl-4">&ldquo;{question}&rdquo;</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">03 / The idea</p>
          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Choosing a future shouldn&apos;t feel like guessing.</h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300">That&apos;s where StudentPath begins. Not as a list of hundreds of careers, but as a way to move from a spark of interest to a decision you can explain.</p>
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["This is the career", "Understand the work, context, and possibility."],
              ["This is what it feels like", "Meet the reality behind the title."],
              ["This is what it requires", "See skills, learning, and trade-offs."],
              ["This is what you can do next", "Leave with a first step, not just a bookmark."],
            ].map(([title, text], index) => (
              <div key={title} className="group border-t border-white/20 pt-5 transition hover:border-fuchsia-300">
                <span className="text-sm text-zinc-600">0{index + 1}</span>
                <h3 className="mt-10 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-gradient-to-br from-[#120617] via-black to-[#031015] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-300">04 / What it is</p>
              <h2 className="text-4xl font-black tracking-tight sm:text-6xl">A Career Decision &amp; Pathway Platform.</h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-300">StudentPath is being shaped to help a student discover a career, understand it, evaluate the fit, see the path, and know what to do next. The destination is clarity, not endless browsing.</p>
          </div>
          <div className="mt-20 grid gap-3 md:grid-cols-5">
            {journey.map(({ label, icon: Icon, color }, index) => (
              <div key={label} className="relative border border-white/10 bg-black/40 p-6">
                <Icon className={color} size={25} aria-hidden="true" />
                <p className="mt-12 text-lg font-bold">{label}</p>
                {index < journey.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden text-white/30 md:block" size={20} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-violet-300">05 / The career experience</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">A career page should help you decide.</h2>
            <p className="mt-7 text-lg leading-relaxed text-zinc-300">The Career Detail Page is designed as a decision engine: a connected experience that gives a student more than a definition.</p>
          </div>
          <div className="mt-16 grid gap-0 border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {["Career Hero", "Why This Career Exists", "Career DNA", "Reality Check", "Student Roadmap", "Future Outlook", "First Step Today", "A clearer decision"].map((item, index) => (
              <div key={item} className="border-b border-r border-white/10 p-7 sm:p-9">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-12 text-lg font-bold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07070a] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-amber-300">06 / What we believe</p>
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">The principles are simple. The work is not.</h2>
          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map(([number, title, text]) => (
              <div key={number}>
                <span className="text-sm text-amber-300">{number}</span>
                <h3 className="mt-5 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">07 / What exists today</p>
              <h2 className="text-4xl font-black tracking-tight sm:text-6xl">The pieces are becoming a system.</h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-zinc-400">The current product already has a connected foundation. It is growing one useful part at a time.</p>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {currentProduct.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-5 border border-white/10 bg-white/[0.03] p-7 transition hover:border-emerald-300/40 hover:bg-white/[0.05] sm:p-9">
                <Icon className="mt-1 shrink-0 text-emerald-300" size={24} aria-hidden="true" />
                <div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 max-w-md leading-relaxed text-zinc-400">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-gradient-to-r from-[#100513] to-[#030b10] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">08 / Still building</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">This is an evolving product.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300">I&apos;m continuously learning, building, testing, fixing, redesigning, and improving StudentPath. The fact that it is being built by a student is part of the story - not something to hide behind polished language.</p>
          </div>
          <div className="border-l border-cyan-300/40 pl-7 text-xl leading-relaxed text-zinc-400">Learning technology by building real things. Building anyway, before everything feels finished.</div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 border-b border-white/10 pb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-300">09 / The foundation</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">Technology in service of the story.</h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">Next.js, React, TypeScript, Supabase, PostgreSQL, and Vercel form the foundation. They help StudentPath stay modular, searchable, dynamic, and connected to the content students need.</p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 pt-12 sm:grid-cols-3 lg:grid-cols-6">
          {["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"].map((technology) => <div key={technology} className="border border-white/10 px-4 py-5 text-center text-sm font-bold text-zinc-300">{technology}</div>)}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#08050c] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.16),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-300">10 / Future vision</p>
          <h2 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">This is only the beginning.</h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300">The long-term direction is a deeper, more personal pathway system: richer career experiences, better exam and skill discovery, student progress, community, intelligent guidance, and personalized exploration.</p>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-zinc-600">Future vision - not all of these are available today.</p>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Deeper discovery", "Personalized exploration", "Student progress", "Intelligent guidance", "Better pathway systems", "Community", "Richer experiences", "Skill roadmaps"].map((item) => <div key={item} className="border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <Flag className="mx-auto text-fuchsia-300" size={30} aria-hidden="true" />
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-fuchsia-300">11 / A founder note</p>
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">Why I&apos;m building this.</h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-zinc-300">I&apos;m still a student. I&apos;m still learning. I&apos;m still figuring things out. But I believe students deserve a clearer way to understand their future, and I want to build toward that belief instead of only talking about it.</p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">StudentPath is part of that journey: one real product, built honestly, improved continuously.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-950/50 via-[#08030b] to-cyan-950/40 px-6 py-28 text-center sm:px-10 lg:px-16 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.22),transparent_45%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">12 / Start somewhere</p>
          <h2 className="mt-6 text-5xl font-black tracking-[-0.04em] sm:text-7xl">Your future is worth exploring.</h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-300">Start discovering the paths that could take you there.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/explore" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-black transition hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-[#08030b]">Explore careers <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/explore/guide-path" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-bold transition hover:border-cyan-300/70 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#08030b]">Find your path <Route size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <ExploreFooter />
    </main>
  );
}