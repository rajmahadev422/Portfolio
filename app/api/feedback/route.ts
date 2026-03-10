import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/feedback — Save new feedback
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, emoji, rating } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        emoji: emoji ?? null,
        rating: rating ? Number(rating) : null,
        source: "portfolio",
      },
    });

    return NextResponse.json(
      { success: true, id: feedback.id, message: "Feedback saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/feedback] Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// GET /api/feedback — Retrieve all feedback (add auth in production!)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const skip = (page - 1) * limit;

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          emoji: true,
          rating: true,
          createdAt: true,
        },
      }),
      prisma.feedback.count(),
    ]);

    return NextResponse.json({
      feedbacks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/feedback] Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
