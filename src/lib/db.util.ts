import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Post } from "./types";
const dbPath = path.join("./src", "db.json");

async function readDB() {
  try {
    const data = await readFile(dbPath, "utf-8");
    return JSON.parse(data) as { posts: Post[] };
  } catch (err) {
    console.error(err);
    return { posts: [] };
  }
}

async function writeDB(data: { posts: Post[] }) {
  try {
    await writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

export { writeDB, readDB };
