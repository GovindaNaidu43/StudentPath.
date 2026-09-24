"use client";

import { useTransition, useState, useRef, useEffect } from "react";
import { deleteCareer } from "@/app/admin/actions";
import { MoreVertical, Pencil, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DeleteCareerButton({
  id,
  title,
  slug,
}: {
  id: string;
  title: string;
  slug?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close menu on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  function handleDelete() {
    startTransition(async () => {
      await deleteCareer(id);
    });
  }

  return (
    <>
      {/* Three-dot trigger */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen((o) => !o);
          }}
          className="
            w-8 h-8 rounded-lg
            flex items-center justify-center
            text-zinc-500 hover:text-white
            hover:bg-white/10
            transition-all duration-200
          "
        >
          <MoreVertical size={15} />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div
            className="
              absolute right-0 top-10 z-50
              w-48 py-1.5
              rounded-xl border border-white/10
              bg-zinc-900/95 backdrop-blur-xl
              shadow-2xl shadow-black/40
            "
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/admin/careers/${id}`}
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Pencil size={13} />
              Edit Career
            </Link>

            {slug && (
              <Link
                href={`/career/${slug}`}
                target="_blank"
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <ExternalLink size={13} />
                Preview
              </Link>
            )}

            <div className="my-1.5 border-t border-white/[0.06]" />

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setConfirmOpen(true);
              }}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={13} />
              Delete Career
            </button>
          </div>
        )}
      </div>

      {/* Confirmation dialog overlay */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            e.stopPropagation();
            if (!isPending) setConfirmOpen(false);
          }}
        >
          <div
            className="
              w-full max-w-md
              rounded-2xl border border-white/10
              bg-zinc-900 p-6
              shadow-2xl
            "
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
            <p className="text-white font-semibold mb-1">{title}</p>
            <p className="text-xs text-zinc-600 mb-6">
              This will also remove all related content (insights, scenes, roadmap, etc.)
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={isPending}
                className="
                  flex-1 py-2.5 rounded-xl
                  border border-white/10 bg-white/[0.04]
                  text-sm font-medium text-zinc-300
                  hover:bg-white/[0.08] transition-all
                  disabled:opacity-50
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="
                  flex-1 py-2.5 rounded-xl
                  bg-red-600 hover:bg-red-500
                  text-sm font-semibold text-white
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isPending ? "Deletingâ€¦" : "Delete Career"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
