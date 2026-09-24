"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Search,
  Bot,
  Compass,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

export default function MobileBottomNav() {

  const pathname = usePathname();

  const [showNav, setShowNav] =
    useState(true);

  const [lastScrollY, setLastScrollY] =
    useState(0);

  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY =
        window.scrollY;

      /* SHOW WHEN SCROLL UP */

      if (
        currentScrollY < lastScrollY
      ) {

        setShowNav(true);

      }

      /* HIDE WHEN SCROLL DOWN */

      else {

        setShowNav(false);

      }

      /* ALWAYS SHOW AT TOP */

      if (currentScrollY < 20) {

        setShowNav(true);

      }

      setLastScrollY(currentScrollY);

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [lastScrollY]);

  const navItems = [

    {
      name: "Home",
      icon: Search,
      href: "/explore",
    },

    {
      name: "AI Mentor",
      icon: Bot,
      href: "/explore/mentor",
    },

    {
      name: "Guide Path",
      icon: Compass,
      href: "/explore/guide-path",
    },

  ];

  return (

    <div
      className={`
      fixed

      bottom-5
      left-1/2

      -translate-x-1/2

      z-[999]

      w-[92%]
      max-w-[420px]

      md:hidden

      transition-all
      duration-500

      ${
        showNav
          ? "translate-y-0 opacity-100"
          : "translate-y-32 opacity-0"
      }
      `}
    >

      {/* GLOW */}

      <div
        className="
        absolute
        inset-0

        rounded-[34px]

        bg-gradient-to-r
        from-fuchsia-500/20
        via-purple-500/20
        to-cyan-500/20

        blur-2xl
        "
      />

      {/* NAVBAR */}

      <div
        className="
        relative

        overflow-hidden

        rounded-[34px]

        border border-white/10

        bg-white/[0.08]

        backdrop-blur-3xl

        shadow-[0_10px_60px_rgba(0,0,0,0.55)]

        px-3
        py-3

        flex
        items-center
        justify-between
        "
      >

        {/* TOP LIGHT */}

        <div
          className="
          absolute
          inset-x-0
          top-0

          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          "
        />

        {navItems.map((item) => {

          const active =
            item.href === "/explore" ?
              pathname === "/explore" :
              pathname.startsWith(item.href);
          const Icon =
            item.icon;

          return (

            <Link
              key={item.name}
              href={item.href}
              className="
              relative

              flex
              flex-col
              items-center
              justify-center

              flex-1

              py-2

              transition-all
              duration-300
              "
            >

              {/* ACTIVE BG */}

              {active && (

                <div
                  className="
                  absolute

                  inset-0

                  rounded-[24px]

                  bg-gradient-to-r
                  from-fuchsia-500/20
                  via-purple-500/20
                  to-cyan-500/20

                  border
                  border-fuchsia-400/20

                  shadow-[0_0_30px_rgba(217,70,239,0.25)]
                  "
                />

              )}

              {/* ICON */}

              <div
                className={`
                relative
                z-10

                transition-all
                duration-300

                ${
                  active
                    ? "text-fuchsia-400 scale-110"
                    : "text-zinc-400"
                }
                `}
              >

                <Icon size={24} />

              </div>

              {/* TEXT */}

              <p
                className={`
                relative
                z-10

                text-[11px]

                mt-1.5

                font-medium

                transition-all
                duration-300

                ${
                  active
                    ? "text-white"
                    : "text-zinc-500"
                }
                `}
              >

                {item.name}

              </p>

            </Link>

          );

        })}

      </div>

    </div>

  );

}