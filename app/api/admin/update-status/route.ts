import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Issue from "@/app/model/Issue";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const formData = await req.formData();
  const status = formData.get("status");

  if (!id || !status) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await connectDB();

  await Issue.findByIdAndUpdate(id, { status });

  return NextResponse.redirect(new URL("/admin", req.url));
}
