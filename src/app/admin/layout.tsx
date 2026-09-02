export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      "
    >
      <main className="relative min-h-screen">
        {/* BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none">
          {/* GLOW */}
          <div
            className="
            absolute
            top-[-300px]
            right-[-200px]
            w-[900px]
            h-[900px]
            rounded-full
            bg-fuchsia-500/10
            blur-[180px]
            "
          />

          {/* GRID */}
          <div
            className="
            absolute
            inset-0
            opacity-[0.05]
            bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            bg-[size:80px_80px]
            "
          />
        </div>

        {/* PAGE */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}