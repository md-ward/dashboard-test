import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.NEXT_MONGO_URI!, {

    dbName: process.env.DB_NAME,
  });
}
