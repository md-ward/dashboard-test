import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Post } from "@/lib/types";
import ServerSidePagination from "./components/serverSidePagination";
import Link from "next/link";
import { Metadata } from "next";
import { DisclaimerToast } from "./components/Disclaimer";

export const metadata: Metadata = {
  title: "Visitors | Posts",
  description: "Visitors  posts page",
};
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const limit = 9;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const { posts, totalPages, currentPage } = res;

  return (
    <div className="p-4 flex relative overflow-hidden flex-col gap-4 min-h-screen items-center">
      <div className="flex flex-row max-w-7xl justify-between px-8 items-center h-fit w-full">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">Posts</h1>
          <DisclaimerToast />
        </div>{" "}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grow max-w-7xl">
        {posts.map((post: Post) => (
          <div key={post.id} className="h-fit">
            <Link href={`/[id]`} as={`/${post.id}`}>
              <Card className="p-4 relative w-full h-44 overflow-hidden">
                <CardHeader className="w-full ">
                  <CardTitle className="text-start    !w-full">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="line-clamp-4 h-[4lh] text-sm text-muted-foreground">
                  {post.body}
                </CardDescription>
              </Card>
            </Link>
          </div>
        ))}
      </ul>
      <ServerSidePagination
        page={currentPage}
        pageCount={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Page;
