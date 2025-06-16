import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";

export async function PUT() {
  try {
    // const response = await get("forReset.json", {
    //   token: process.env.BLOB_READ_WRITE_TOKEN
    // });
    const db = await readFile("./src/data/forReset.json");
    const dbString = db.toString();

    // Step 2: Write it to the target blob (e.g., db.json or posts.json)
    await put("posts.json", dbString, {
      contentType: "application/json",
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ message: "Data reset successfully" });
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json(
      { message: "Failed to reset data", error },
      { status: 500 }
    );
  }
}
