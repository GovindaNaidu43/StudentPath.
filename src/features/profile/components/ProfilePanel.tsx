"use client";

import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Bookmark,
  LogOut,
  Palette,
  Sparkles,
  Rocket,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfilePanel({
  open,
  onClose,
}: Props) {

  async function handleLogout() {

    const { supabaseAuth } = await import("@/lib/auth");

    await supabaseAuth.auth.signOut();

    window.location.href = "/";

  }

  return (

    <AnimatePresence>

      {open && (

        <>

          {/* BACKDROP */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="
            fixed inset-0

            bg-black/50

            backdrop-blur-md

            z-[90]
            "
          />

          {/* PANEL */}

          <motion.div
            initial={{
              x: 500,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: 500,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            className="
            fixed top-0 right-0

            h-screen

            w-full
            sm:w-[420px]

            z-[100]

            border-l border-white/10

            bg-[#050816]/85

            backdrop-blur-2xl

            overflow-y-auto
            scrollbar-hide
            "
          >

            {/* GLOW */}

            <div
              className="
              absolute top-[-120px] right-[-80px]

              w-[280px] h-[280px]

              bg-fuchsia-500/20

              blur-[120px]
              "
            />

            <div
              className="
              absolute bottom-[-100px] left-[-80px]

              w-[240px] h-[240px]

              bg-blue-500/20

              blur-[120px]
              "
            />

            {/* CONTENT */}

            <div className="relative z-10 p-6 sm:p-8 pb-32">

              {/* TOP */}

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                    text-zinc-400

                    text-sm
                    "
                  >
                    StudentPath Profile
                  </p>

                  <h2
                    className="
                    text-3xl

                    font-black

                    mt-1
                    "
                  >
                    Govinda
                  </h2>

                </div>

                <button
                  onClick={onClose}
                  className="
                  w-12
                  h-12

                  rounded-full

                  bg-white/5

                  border border-white/10

                  flex items-center justify-center

                  hover:bg-white/10

                  transition
                  "
                >

                  <X size={20} />

                </button>

              </div>

              {/* AVATAR */}

              <motion.div
                whileHover={{
                  rotate: 4,
                  scale: 1.03,
                }}
                className="mt-10 flex justify-center"
              >

                <div
                  className="
                  relative

                  w-36 h-36
                  sm:w-40 sm:h-40

                  rounded-full

                  bg-gradient-to-r
                  from-fuchsia-600
                  to-purple-600

                  p-[3px]
                  "
                >

                  <div
                    className="
                    w-full h-full

                    rounded-full

                    bg-black

                    flex items-center justify-center

                    text-5xl
                    sm:text-6xl

                    font-black
                    "
                  >
                    G
                  </div>

                  {/* ORBIT */}

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-12px]"
                  >

                    <div
                      className="
                      absolute top-0 left-1/2

                      -translate-x-1/2

                      w-5 h-5

                      rounded-full

                      bg-fuchsia-400

                      shadow-[0_0_20px_rgba(217,70,239,1)]
                      "
                    />

                  </motion.div>

                </div>

              </motion.div>

              {/* STREAM */}

              <div className="mt-8 text-center">

                <h3
                  className="
                  text-2xl

                  font-bold
                  "
                >
                  Future AI Engineer ðŸš€
                </h3>

                <p
                  className="
                  text-zinc-400

                  mt-2
                  "
                >
                  CSE Core Engineering Student
                </p>

              </div>

              {/* SPACE TIME */}

              <div
                className="
                mt-10

                rounded-[30px]

                border border-white/10

                bg-white/[0.04]

                p-6
                "
              >

                <div className="flex items-center gap-3 mb-5">

                  <Sparkles className="text-fuchsia-400" />

                  <h3
                    className="
                    text-2xl

                    font-black
                    "
                  >
                    Space-Time
                  </h3>

                </div>

                <div
                  className="
                  text-5xl

                  font-black
                  "
                >
                  07:45
                </div>

                <p
                  className="
                  text-zinc-400

                  mt-3
                  "
                >
                  Monday â€¢ Punjab, India
                </p>

              </div>

              {/* ACTIVE PATH */}

              <div
                className="
                mt-8

                rounded-[30px]

                border border-white/10

                bg-white/[0.04]

                p-6
                "
              >

                <div className="flex items-center gap-3 mb-6">

                  <Rocket className="text-fuchsia-400" />

                  <h3
                    className="
                    text-2xl

                    font-black
                    "
                  >
                    Active Path
                  </h3>

                </div>

                <div className="space-y-5">

                  {[
                    "Learn Advanced React",
                    "Master AI & ML",
                    "Build StudentPath",
                  ].map((step, index) => (

                    <div
                      key={index}
                      className="
                      flex items-center gap-4

                      p-4

                      rounded-2xl

                      bg-white/[0.03]

                      border border-white/10
                      "
                    >

                      <div
                        className="
                        w-10 h-10

                        rounded-full

                        bg-gradient-to-r
                        from-fuchsia-600
                        to-purple-600

                        flex items-center justify-center

                        font-bold
                        "
                      >
                        {index + 1}
                      </div>

                      <div>

                        <h4 className="font-semibold">
                          {step}
                        </h4>

                        <p
                          className="
                          text-zinc-400

                          text-sm

                          mt-1
                          "
                        >
                          Current mission milestone
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* PROGRESS */}

                <div className="mt-6">

                  <div className="flex justify-between mb-3">

                    <p
                      className="
                      text-zinc-400

                      text-sm
                      "
                    >
                      Progress
                    </p>

                    <p className="font-bold">
                      72%
                    </p>

                  </div>

                  <div
                    className="
                    h-3

                    rounded-full

                    bg-white/10

                    overflow-hidden
                    "
                  >

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ duration: 1.2 }}
                      className="
                      h-full

                      rounded-full

                      bg-gradient-to-r
                      from-fuchsia-500
                      to-purple-500
                      "
                    />

                  </div>

                </div>

              </div>

              {/* SAVED */}

              <div
                className="
                mt-8

                rounded-[30px]

                border border-white/10

                bg-white/[0.04]

                p-6
                "
              >

                <div className="flex items-center gap-3 mb-6">

                  <Bookmark className="text-fuchsia-400" />

                  <h3
                    className="
                    text-2xl

                    font-black
                    "
                  >
                    Saved
                  </h3>

                </div>

                <div className="space-y-4">

                  {[
                    "AI Engineer",
                    "JEE Advanced",
                    "Cyber Security",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="
                      p-4

                      rounded-2xl

                      bg-white/[0.03]

                      border border-white/10
                      "
                    >
                      {item}
                    </div>

                  ))}

                </div>

              </div>

              {/* THEMES */}

              <div
                className="
                mt-8

                rounded-[30px]

                border border-white/10

                bg-white/[0.04]

                p-6
                "
              >

                <div className="flex items-center gap-3 mb-6">

                  <Palette className="text-fuchsia-400" />

                  <h3
                    className="
                    text-2xl

                    font-black
                    "
                  >
                    Themes
                  </h3>

                </div>

                <div className="flex gap-4">

                  {[
                    "from-fuchsia-500 to-purple-600",
                    "from-cyan-500 to-blue-600",
                    "from-orange-500 to-red-600",
                  ].map((theme, index) => (

                    <button
                      key={index}
                      className={`
                      w-16 h-16

                      rounded-2xl

                      bg-gradient-to-r ${theme}

                      border border-white/10

                      hover:scale-110

                      transition
                      `}
                    />

                  ))}

                </div>

              </div>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="
                mt-8

                w-full

                py-5

                rounded-[24px]

                border border-red-500/20

                bg-red-500/10

                text-red-400

                font-semibold

                hover:bg-red-500/20

                transition

                flex items-center justify-center gap-3
                "
              >

                <LogOut size={20} />

                Logout

              </button>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>

  );

}