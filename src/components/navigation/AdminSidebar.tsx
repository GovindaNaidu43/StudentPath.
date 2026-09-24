"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Briefcase,
  GraduationCap,
  ImageIcon,
  BrainCircuit,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    name: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
  },

  {
    name: "Exams",
    href: "/admin/exams",
    icon: GraduationCap,
  },

  {
    name: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },

  {
    name: "AI",
    href: "/admin/ai",
    icon: BrainCircuit,
  },

  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const mobileItems = [
    items[0],
    items[1],
    items[2],
    items[4],
    items[5],
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}

      <aside
        className="
        hidden
        md:block

        fixed
        left-0
        top-0

        z-[100]

        h-screen

        group
        "
      >
        <div
          className="
          h-full

          w-[84px]
          hover:w-[280px]

          transition-all
          duration-500

          bg-black/70

          backdrop-blur-2xl

          border-r
          border-white/10

          overflow-hidden

          flex
          flex-col
          "
        >
          {/* LOGO */}

          <div
            className="
            relative

            h-[90px]

            flex
            items-center

            px-7

            border-b
            border-white/10

            overflow-hidden
            "
          >
            <div
              className="
              absolute
              inset-0

              bg-gradient-to-r
              from-fuchsia-500/10
              to-cyan-500/10
              "
            />

            <div
              className="
              relative
              z-10

              min-w-[28px]
              h-7

              rounded-lg

              bg-gradient-to-br
              from-fuchsia-500
              to-cyan-400

              shadow-[0_0_25px_rgba(217,70,239,0.6)]
              "
            />

            <h1
              className="
              relative
              z-10

              ml-5

              text-xl
              font-black

              whitespace-nowrap

              opacity-0
              group-hover:opacity-100

              transition-all
              duration-300
              "
            >
              StudentPath
            </h1>
          </div>

          {/* NAV */}

          <nav
            className="
            flex-1

            p-4

            space-y-3
            "
          >
            {items.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                  relative

                  flex
                  items-center

                  gap-5

                  h-[60px]

                  px-4

                  rounded-2xl

                  transition-all
                  duration-300

                  overflow-hidden

                  ${
                    active
                      ? `
                      text-white
                      bg-white/10
                      shadow-[0_0_40px_rgba(217,70,239,0.2)]
                      `
                      : `
                      text-zinc-400
                      hover:text-white
                      hover:bg-white/10
                      `
                  }
                  `}
                >
                  {active && (
                    <>
                      <div
                        className="
                        absolute
                        inset-0

                        bg-gradient-to-r
                        from-fuchsia-500/20
                        to-cyan-500/10
                        "
                      />

                      <div
                        className="
                        absolute

                        left-0
                        top-1/2

                        -translate-y-1/2

                        w-[4px]
                        h-10

                        rounded-r-full

                        bg-fuchsia-500
                        "
                      />
                    </>
                  )}

                  <div
                    className="
                    relative
                    z-10

                    min-w-[28px]

                    flex
                    justify-center
                    "
                  >
                    <Icon
                      size={24}
                      className={
                        active
                          ? "text-fuchsia-400"
                          : ""
                      }
                    />
                  </div>

                  <span
                    className="
                    relative
                    z-10

                    whitespace-nowrap

                    opacity-0
                    group-hover:opacity-100

                    transition-all
                    duration-300

                    text-lg
                    "
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}

      <div
        className="
        md:hidden

        fixed
        bottom-0
        left-0
        right-0

        z-[200]

        bg-black/90

        backdrop-blur-2xl

        border-t
        border-white/10
        "
      >
        <div
          className="
          grid
          grid-cols-5

          h-16
          "
        >
          {mobileItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                flex
                flex-col

                items-center
                justify-center

                gap-1
                "
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? "text-fuchsia-400"
                      : "text-zinc-500"
                  }
                />

                <span
                  className={`
                  text-[10px]

                  ${
                    active
                      ? "text-white"
                      : "text-zinc-500"
                  }
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}