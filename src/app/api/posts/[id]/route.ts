import { connectDB } from "@/lib/db.util";
import { PostModel } from "@/models/post.schema";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const post = await PostModel.findById(id.toString()).lean();
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

// PUT /api/posts/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  console.log({id});
  const postId = id.toString();
  
  const { title, body } = await req.json();

  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json(
      { message: "Missing title or body" },
      { status: 400 }
    );
  }

  try {
    const updated = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { title, body },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const deleted = await PostModel.findByIdAndDelete(id.toString()).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
