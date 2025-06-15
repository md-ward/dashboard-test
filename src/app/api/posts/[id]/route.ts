import { readDB, writeDB } from "@/lib/db.util";
import { Post } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const db = await readDB();
  const id = Number((await params).id);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const idx = db.posts.findIndex((p: Post) => Number(p.id) === id);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const deleted = db.posts.splice(idx, 1)[0];
  console.log({ deleted });

  await writeDB(db);
  return NextResponse.json(deleted, {
    status: 200,
  });
}

export async function GET(req: NextRequest, { params }: Params) {
  const id = Number((await params).id);
  const db = await readDB();
  const post = db.posts.find((p: Post) => Number(p.id) === id);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post, {
    status: 200,
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number((await params).id);
  const { title, body } = await req.json();

  if (!title || !body) {
    return NextResponse.json(
      {
        message: "Missing title or body",
      },
      {
        status: 400,
      }
    );
  }
  const db = await readDB();
  const idx = db.posts.findIndex((p: Post) => p.id === id);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.posts[idx] = { id, title, body };
  await writeDB(db);
  return NextResponse.json(db.posts[idx]);
}
