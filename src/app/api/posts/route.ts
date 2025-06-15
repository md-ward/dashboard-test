import { readDB, writeDB } from "@/lib/db.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const db = await readDB();
  const totalCount = db.posts.length;
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  if (limit < 1 || page < 1) {
    return NextResponse.json(
      { error: "Page not Found , limit or page less than 1" },
      { status: 400 }
    );
  }
  const totalPages = Math.ceil(totalCount / limit);
  const posts = db.posts.slice((page - 1) * limit, page * limit);

  return NextResponse.json(
    { currentPage: page, posts, totalPages, totalCount },
    {
      status: 201,
    }
  );
}

export async function POST(req: NextRequest) {
  const db = await readDB();

  const body = await req.json();
  if (body.title == "" || body.body == "") {
    console.log({
      body,
    });

    return NextResponse.json(
      { message: "Missing title or content" },
      { status: 400 }
    );
  }

  const newPost = { id: Date.now(), ...body };
  db.posts.push(newPost);
  await writeDB(db);
  return NextResponse.json(newPost, { status: 201 });
}
