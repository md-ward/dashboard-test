import { connectDB } from "@/lib/db.util";
import { PostModel } from "@/models/post.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;

  if (limit < 1 || page < 1) {
    return NextResponse.json(
      { error: "Page not found, limit or page less than 1" },
      { status: 400 }
    );
  }

  const totalCount = await PostModel.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
  const posts = await PostModel.find()
    .sort({ createdAt: -1 }) // optional: latest first
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json(
    { currentPage: page, posts, totalPages, totalCount },
    { status: 200 }
  );
}

// POST: /api/posts
export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const { title, body: content, userName, picture } = body;
  console.log(body);

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { message: "Missing title or content" },
      { status: 400 }
    );
  }

  const newPost = await PostModel.create({
    title,
    body: content,
    userName,
    picture,
  });
  return NextResponse.json(newPost.toJSON(), { status: 201 });
}
