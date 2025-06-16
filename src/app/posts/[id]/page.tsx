import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BackgroundAnimation from "../../components/Background";

interface PostProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost((await params).id);

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-10">
      {/* Content */}
      <BackgroundAnimation />
      <Card 
      
      className="addButton  w-full max-w-xl bg-white text-black p-6 rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-base sm:text-lg md:text-xl">
          {post.body}
        </CardDescription>
        <Link href="/" className="mt-6 inline-block">
          <Button variant={"outline"} className="mt-4 text-lg">
            <ArrowLeft className="mr-2 animate-pulse" /> Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
