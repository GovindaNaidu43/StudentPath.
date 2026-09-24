"use client";

import { useState } from "react";

import {
  Trash2,
  ImageIcon,
  Video,
} from "lucide-react";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}


type Props = {
  value?: string;

  onUpload: (url: string) => void;

  type?: "image" | "video";
};

export default function ImageUpload({
  value,
  onUpload,
  type = "image",
}: Props) {

  const [uploading, setUploading] =
    useState(false);

  const isVideo =
    type === "video";

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Clean filename to prevent issues
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${Date.now()}-${cleanName}`;

      const formData = new FormData();
      formData.append("file", file, fileName);
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      onUpload(result.url);
    } catch (err: unknown) {
      console.error("Upload Exception:", err);
      alert(`Upload failed: ${errorMessage(err)}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!value) return;

    try {
      // Ensure we strip query parameters if they exist
      const urlWithoutQuery = value.split("?")[0];
      const fileName = urlWithoutQuery.split("/").pop();

      if (!fileName) return;

      const response = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fileName }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Delete failed");

      onUpload("");
    } catch (err: unknown) {
      console.error("Delete Exception:", err);
      alert(`Delete failed: ${errorMessage(err)}`);
    }
  }

  return (

    <div className="space-y-5">

      {/* PREVIEW */}

      {value && (

        <div
          className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.04]
          "
        >

          {/* IMAGE */}

          {!isVideo && (

            <img
              src={value}
              alt="preview"
              className="
              w-full
              h-[320px]
              object-cover
              "
            />

          )}

          {/* VIDEO */}

          {isVideo && (

            <video
              src={value}
              controls
              className="
              w-full
              h-[320px]
              object-cover
              bg-black
              "
            />

          )}

          {/* DELETE BUTTON */}

          <button
            type="button"
            onClick={handleDelete}
            className="
            absolute
            top-4
            right-4
            w-12
            h-12
            rounded-2xl
            bg-red-500/90
            hover:bg-red-500
            flex
            items-center
            justify-center
            transition-all
            duration-300
            shadow-[0_0_30px_rgba(239,68,68,0.5)]
            "
          >

            <Trash2 size={20} />

          </button>

        </div>

      )}

      {/* UPLOAD AREA */}

      <label
        className="
        group
        relative
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-[220px]
        rounded-[32px]
        border
        border-dashed
        border-white/15
        bg-white/[0.03]
        hover:bg-white/[0.05]
        transition-all
        duration-500
        cursor-pointer
        "
      >

        {/* GLOW */}

        <div
          className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          bg-gradient-to-br
          from-fuchsia-500/10
          via-transparent
          to-cyan-500/10
          "
        />

        <input
          type="file"
          accept={
            isVideo
              ? "video/*"
              : "image/*"
          }
          className="hidden"
          onChange={handleUpload}
        />

        <div className="relative z-10 text-center">

          <div
            className="
            w-20
            h-20
            rounded-[24px]
            bg-white/10
            border
            border-white/10
            flex
            items-center
            justify-center
            mx-auto
            mb-6
            "
          >

            {isVideo ? (
              <Video size={34} />
            ) : (
              <ImageIcon size={34} />
            )}

          </div>

          <p
            className="
            text-xl
            font-semibold
            mb-2
            "
          >

            {uploading
              ? "Uploading..."
              : isVideo
              ? "Upload cinematic video"
              : "Upload cinematic image"}

          </p>

          <p className="text-zinc-500">

            Drag & drop or click to upload

          </p>

        </div>

      </label>

    </div>

  );

}