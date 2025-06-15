"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomDropDownMenu from "@/app/components/dropDownMenu";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomPagination from "@/app/components/customPagination";
import { DeletePostDialog } from "@/app/components/Modals/deleteModal";
import EditPostModal from "@/app/components/Modals/editPostModal";
import NewPostModal from "@/app/components/Modals/newPostModal";
import { PostProvider, usePostContext } from "@/app/components/post.state";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { ResetDbDialog } from "@/app/components/Modals/resetDbModal";
import NoPosts from "@/app/components/noPosts";

type Post = {
  id: number;
  title: string;
  body: string;
};

const PAGE_SIZE = 9;
async function fetchPosts(
  page: number,
  limit: number
): Promise<{ posts: Post[]; totalPages: number; totalCount: number }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&limit=${limit}`
  );

  const { posts, totalPages, totalCount } = await res.json();

  return { posts, totalPages, totalCount };
}

export default function AdminPostPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],

    queryFn: () => fetchPosts(page, PAGE_SIZE),
    maxPages: 10,
    staleTime: 1000 * 60,
  });

  if (isError)
    return <div className="p-4">Failed to load posts.,{error.message}</div>;

  const { posts, totalPages } = data! || {};

  return (
    <PostProvider key={"postProvider"}>
      <div className="p-4 flex relative overflow-hidden flex-col gap-4  min-h-screen  items-center">
        <div className="flex flex-row max-w-7xl justify-between px-8  items-center  h-fit  w-full">
          <h1 className="text-2xl font-bold ">Admin Posts</h1>
          <div className="flex gap-4">
            <NewPostModal />
            <ResetButton />
          </div>
        </div>
        {isLoading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grow max-w-7xl">
            {Array.from({ length: 9 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </ul>
        ) : posts && posts.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full grow max-w-7xl">
            {posts.map((post) => (
              <div key={post.id} className=" h-fit ">
                <Card className="p-4 relative w-full h-44 overflow-hidden ">
                  <CustomDropDownMenu postId={post.id} />
                  <CardHeader>
                    <CardTitle className="text-start -mt-2 -ml-6 truncate w-full">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="line-clamp-4 h-[4lh] text-sm text-muted-foreground">
                    {post.body}
                  </CardDescription>
                </Card>
              </div>
            ))}
          </ul>
        ) : (
          <NoPosts />
        )}

        {!isLoading && posts.length > 0 && (
          <CustomPagination
            page={page}
            pageCount={totalPages}
            setPage={setPage}
          />
        )}
      </div>
      {/* modals */}
      <DeletePostDialog />
      <ResetDbDialog />
      <EditPostModal />
    </PostProvider>
  );
}

const CardSkeleton = () => {
  return (
    <Card className="p-4 relative w-full h-44  ">
      <div className="w-[90%] h-12 bg-gray-200 animate-pulse  duration-200 rounded-md"></div>
      <div className="w-[95%] h-32 bg-gray-200 animate-pulse rounded-md"></div>
    </Card>
  );
};

const ResetButton = () => {
  const { setIsResetDbModal } = usePostContext();
  return (
    <Button
      className="transition-all  ease-in-out duration-200 cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.classList.add("addButton");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove("addButton");
      }}
      onClick={() => setIsResetDbModal(true)}
      title="this will reset the database"
    >
      <RefreshCcw></RefreshCcw>
    </Button>
  );
};
