"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  ChevronLeft,
  MapPin,
  Mail,
  User,
  Palette,
  Headphones,
  Settings,
  LogOut,
  ChevronRight,
  MessageCircle,
  Info,
  Shield,
  Check,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import { supabaseAuth } from "@/lib/auth";

export default function ProfilePage() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [showThemes,
    setShowThemes] =
    useState(false);

  const [showSupport,
    setShowSupport] =
    useState(false);

  const [showLogout,
    setShowLogout] =
    useState(false);

  const [selectedTheme,
    setSelectedTheme] =
    useState("purple");

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } =
        await supabaseAuth.auth
          .getUser();

      setUser(user);

    }

    getUser();

  }, []);

  const handleLogout =
    async () => {

      await supabaseAuth.auth
        .signOut();

      router.push("/");

    };

  const menuItems = [

    {
      title: "Edit Profile",
      icon: User,
    },

    {
      title: "Themes",
      icon: Palette,
    },

    {
      title: "Support",
      icon: Headphones,
    },

    {
      title: "Settings",
      icon: Settings,
    },

    {
      title: "Log Out",
      icon: LogOut,
      danger: true,
    },

  ];

  return (

    <main
      className="
      min-h-screen

      bg-black

      text-white

      overflow-x-hidden

      relative
      "
    >

      {/* BACKGROUND */}

      <div
        className="
        fixed inset-0

        pointer-events-none

        bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_30%)]
        "
      />

      <div
        className="
        fixed

        top-[-250px]
        right-[-150px]

        w-[500px]
        h-[500px]

        rounded-full

        bg-fuchsia-500/10

        blur-[140px]
        "
      />

      <div
        className="
        fixed

        bottom-[-250px]
        left-[-180px]

        w-[500px]
        h-[500px]

        rounded-full

        bg-cyan-500/10

        blur-[160px]
        "
      />

      {/* PAGE */}

      <section
        className="
        relative
        z-10

        px-5

        pt-6
        pb-32

        max-w-md
        md:max-w-2xl
        xl:max-w-3xl

        mx-auto
        "
      >

        {/* TOP BAR */}

        <div
          className="
          flex
          items-center
          justify-between

          mb-12
          "
        >

          <Link
            href="/explore"
            className="
            w-14 h-14

            rounded-[22px]

            border border-white/10

            bg-white/[0.04]

            backdrop-blur-xl

            flex
            items-center
            justify-center

            hover:scale-105

            transition-all

            duration-300
            "
          >

            <ChevronLeft size={28} />

          </Link>

          <div className="w-14" />

        </div>

        {/* PROFILE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >

          {/* AVATAR */}

          <div
            className="
            relative

            mx-auto

            w-40 h-40

            rounded-full

            bg-gradient-to-r
            from-fuchsia-500
            via-purple-500
            to-cyan-500

            p-[3px]

            shadow-[0_0_70px_rgba(217,70,239,0.45)]
            "
          >

            <div
              className="
              w-full
              h-full

              rounded-full

              bg-[#050816]

              overflow-hidden
              "
            >

              <img
                src="/images/default-avatar.jpg"
                alt="Profile"
                className="
                w-full
                h-full

                object-cover
                "
              />

            </div>

          </div>

          {/* NAME */}

          <h1
            className="
            mt-7

            text-[3rem]
            md:text-[4rem]

            font-black

            tracking-[-0.06em]

            leading-none
            "
          >

            GOVINDA

          </h1>

          {/* LOCATION */}

          <div
            className="
            mt-4

            flex
            items-center
            justify-center

            gap-2

            text-zinc-400
            "
          >

            <MapPin
              size={18}
              className="text-fuchsia-400"
            />

            <span className="text-lg">
              India
            </span>

          </div>

          {/* EMAIL */}

          <div
            className="
            mt-8

            rounded-[30px]

            border border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            px-5
            py-5

            flex
            items-center

            gap-4

            shadow-[0_0_40px_rgba(255,255,255,0.03)]
            "
          >

            <div
              className="
              w-14 h-14

              rounded-2xl

              bg-fuchsia-500/10

              flex
              items-center
              justify-center

              text-fuchsia-400
              "
            >

              <Mail size={24} />

            </div>

            <div className="text-left">

              <p
                className="
                text-zinc-500

                text-sm

                mb-1
                "
              >
                Email Address
              </p>

              <p
                className="
                text-base

                text-zinc-200
                "
              >

                {user?.email ||
                  "govinda@gmail.com"}

              </p>

            </div>

          </div>

        </motion.div>

        {/* SETTINGS */}

        <motion.section
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="
          mt-10

          rounded-[34px]

          border border-white/10

          bg-white/[0.04]

          backdrop-blur-2xl

          overflow-hidden

          shadow-[0_0_60px_rgba(168,85,247,0.08)]
          "
        >

          {menuItems.map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon;

              return (

                <button
                  key={item.title}
                  onClick={() => {

                    if (
                      item.title ===
                      "Themes"
                    ) {
                      setShowThemes(
                        !showThemes
                      );
                    }

                    if (
                      item.title ===
                      "Support"
                    ) {
                      setShowSupport(
                        !showSupport
                      );
                    }

                    if (
                      item.title ===
                      "Log Out"
                    ) {
                      setShowLogout(
                        true
                      );
                    }

                  }}
                  className={`
                  w-full

                  flex
                  items-center
                  justify-between

                  px-5
                  py-5

                  transition-all

                  duration-300

                  hover:bg-white/[0.04]

                  ${
                    index !==
                    menuItems.length - 1
                      ? "border-b border-white/5"
                      : ""
                  }
                  `}
                >

                  {/* LEFT */}

                  <div
                    className="
                    flex
                    items-center

                    gap-4
                    "
                  >

                    {/* ICON */}

                    <div
                      className={`
                      w-14 h-14

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      shadow-[0_0_25px_rgba(168,85,247,0.12)]

                      ${
                        item.danger
                          ? "bg-red-500/10 text-red-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                      }
                      `}
                    >

                      <Icon size={24} />

                    </div>

                    {/* TITLE */}

                    <span
                      className={`
                      text-[1.05rem]
                      font-medium

                      ${
                        item.danger
                          ? "text-red-400"
                          : "text-white"
                      }
                      `}
                    >

                      {item.title}

                    </span>

                  </div>

                  <ChevronRight
                    size={24}
                    className={
                      item.danger
                        ? "text-red-400"
                        : "text-zinc-500"
                    }
                  />

                </button>

              );

            }
          )}

        </motion.section>

        {/* THEMES */}

        <AnimatePresence>

          {showThemes && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              className="
              mt-6

              rounded-[34px]

              border border-white/10

              bg-white/[0.04]

              backdrop-blur-2xl

              p-6
              "
            >

              <div
                className="
                flex
                items-center

                gap-3

                mb-6
                "
              >

                <Palette
                  className="
                  text-fuchsia-400
                  "
                />

                <h2
                  className="
                  text-3xl

                  font-black

                  tracking-[-0.05em]
                  "
                >
                  Themes
                </h2>

              </div>

              <div
                className="
                flex
                gap-5
                "
              >

                {[
                  {
                    id: "purple",
                    color:
                      "from-fuchsia-500 to-purple-500",
                  },

                  {
                    id: "cyan",
                    color:
                      "from-cyan-400 to-blue-500",
                  },

                  {
                    id: "sunset",
                    color:
                      "from-orange-400 to-red-500",
                  },

                ].map(
                  (theme) => (

                    <button
                      key={theme.id}
                      onClick={() =>
                        setSelectedTheme(
                          theme.id
                        )
                      }
                      className={`
                      relative

                      w-24
                      h-24

                      rounded-[28px]

                      bg-gradient-to-br
                      ${theme.color}

                      shadow-[0_0_35px_rgba(255,255,255,0.12)]

                      transition-all

                      duration-300

                      hover:scale-105
                      `}
                    >

                      {selectedTheme ===
                        theme.id && (

                        <Check
                          className="
                          absolute

                          top-3
                          right-3

                          text-white
                          "
                        />

                      )}

                    </button>

                  )
                )}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* SUPPORT */}

        <AnimatePresence>

          {showSupport && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              className="
              mt-6

              rounded-[34px]

              border border-white/10

              bg-white/[0.04]

              backdrop-blur-2xl

              overflow-hidden
              "
            >

              {[
                {
                  title:
                    "Contact Us",
                  icon:
                    MessageCircle,
                },

                {
                  title:
                    "Feedback",
                  icon:
                    Headphones,
                },

                {
                  title:
                    "About StudentPath",
                  icon: Info,
                },

              ].map((item) => {

                const Icon =
                  item.icon;

                return (

                  <button
                    key={item.title}
                    className="
                    w-full

                    flex
                    items-center
                    justify-between

                    px-5
                    py-5

                    border-b
                    border-white/5

                    hover:bg-white/[0.03]

                    transition-all
                    "
                  >

                    <div
                      className="
                      flex
                      items-center

                      gap-4
                      "
                    >

                      <div
                        className="
                        w-14 h-14

                        rounded-2xl

                        bg-cyan-500/10

                        flex
                        items-center
                        justify-center

                        text-cyan-400
                        "
                      >

                        <Icon
                          size={24}
                        />

                      </div>

                      <span
                        className="
                        text-white
                        text-lg
                        "
                      >

                        {item.title}

                      </span>

                    </div>

                    <ChevronRight
                      size={24}
                      className="
                      text-zinc-500
                      "
                    />

                  </button>

                );

              })}

            </motion.div>

          )}

        </AnimatePresence>

      </section>

      {/* LOGOUT MODAL */}

      <AnimatePresence>

        {showLogout && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
            fixed inset-0

            bg-black/70

            backdrop-blur-md

            z-50

            flex
            items-center
            justify-center

            px-6
            "
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="
              w-full
              max-w-sm

              rounded-[34px]

              border border-white/10

              bg-[#0b1020]

              p-7

              shadow-[0_0_70px_rgba(168,85,247,0.25)]
              "
            >

              <div
                className="
                w-20
                h-20

                rounded-full

                mx-auto

                bg-red-500/10

                flex
                items-center
                justify-center

                text-red-400

                mb-6
                "
              >

                <Shield size={38} />

              </div>

              <h2
                className="
                text-3xl

                font-black

                text-center

                tracking-[-0.05em]
                "
              >

                Logout?

              </h2>

              <p
                className="
                text-zinc-400

                text-center

                mt-3

                leading-relaxed
                "
              >

                Are you sure you want
                to log out from your
                StudentPath account?

              </p>

              <div
                className="
                flex
                gap-4

                mt-8
                "
              >

                <button
                  onClick={() =>
                    setShowLogout(
                      false
                    )
                  }
                  className="
                  flex-1

                  h-14

                  rounded-2xl

                  border border-white/10

                  bg-white/[0.04]

                  font-semibold

                  hover:bg-white/[0.08]

                  transition-all
                  "
                >

                  Cancel

                </button>

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                  flex-1

                  h-14

                  rounded-2xl

                  bg-gradient-to-r
                  from-red-500
                  to-red-600

                  font-semibold

                  shadow-[0_0_30px_rgba(239,68,68,0.35)]

                  hover:scale-[1.02]

                  transition-all
                  "
                >

                  Logout

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

}