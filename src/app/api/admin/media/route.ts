import { NextRequest, NextResponse } from "next/server";
import { AuthorizationError, requireAdmin } from "@/lib/auth/authorization";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET = "career-media";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function errorResponse(error: unknown) {
  if (error instanceof AuthorizationError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Admin media error:", error);
  return NextResponse.json({ error: "Unable to complete media request" }, { status: 500 });
}

export async function GET() {
  try {
    await requireAdmin();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: 200,
      sortBy: { column: "updated_at", order: "desc" },
    });
    if (error) throw error;
    return NextResponse.json({ files: data ?? [] });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Invalid or oversized file" }, { status: 400 });
    }
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      return NextResponse.json({ error: "Only image and video files are allowed" }, { status: 400 });
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const path = `${Date.now()}-${cleanName}`;
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, name: path });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const body: unknown = await request.json();
    const name = body && typeof body === "object" && "name" in body
      ? (body as { name?: unknown }).name
      : null;
    if (typeof name !== "string" || !/^[a-zA-Z0-9._/-]+$/.test(name) || name.length > 500) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}