import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await props.params;

  if (!id || typeof id !== "string") {
    return new NextResponse("Invalid media ID", { status: 400 });
  }

  // 1. Fetch from Supabase portfolio_content table
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolio_content")
          .select("data")
          .eq("id", id)
          .single();

        if (!error && data?.data) {
          const { mime, base64 } = data.data;
          if (base64) {
            const buffer = Buffer.from(base64, "base64");
            return new NextResponse(buffer, {
              status: 200,
              headers: {
                "Content-Type": mime || "image/webp",
                "Cache-Control": "public, max-age=31536000, immutable",
                "Content-Length": buffer.length.toString(),
              },
            });
          }
        }
      }
    } catch (err) {
      console.error("Failed fetching media from Supabase:", err);
    }
  }

  return new NextResponse("Media not found", { status: 404 });
}
