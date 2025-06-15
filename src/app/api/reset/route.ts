import { writeDB } from "@/lib/db.util";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function PUT() {
  const data = JSON.parse((await readFile("./src/forReset.json")).toString());

  await writeDB({ posts: data.posts });
  return NextResponse.json({ message: "Data reset successfully" });
}
