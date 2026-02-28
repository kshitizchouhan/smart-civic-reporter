import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Issue from "@/app/model/Issue";
import { detectIssueWithOpenAI } from "@/lib/openai-vision";
import { fallbackDetectIssue } from "@/lib/fallback-ai";
import { currentUser } from "@clerk/nextjs/server";


/* =======================
   POST: CREATE ISSUE
   ======================= */
export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
      


    const body = await req.json();
    await connectDB();

    let issueType = "Other";

    try {
      issueType = await detectIssueWithOpenAI(body.imageBase64);
    } catch {
      issueType = fallbackDetectIssue(body.description);
    }

    await Issue.create({
      description: body.description,
      location: body.location,
      issueType,
      status: "Submitted",
      userId: user.id, // ✅ NO red underline (string)
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, issueType });
  } catch (error) {
    console.error("POST /api/report ERROR:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

/* =======================
   GET: FETCH USER ISSUES
   ======================= */
export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const issues = await Issue.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(issues);
  } catch (error) {
    console.error("GET /api/report ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}
