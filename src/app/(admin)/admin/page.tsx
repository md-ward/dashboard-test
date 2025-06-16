"use client";
import {
  Card,
  CardDescription,
  CardFooter,
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
import { PostProvider } from "@/app/components/post.state";
import { ResetDbDialog } from "@/app/components/Modals/resetDbModal";
import NoPosts from "@/app/components/noPosts";
import { Post } from "@/lib/types";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";
import { Loader } from "@/app/components/loader";

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
  const { isLoading: isAuthLoading } = useUser();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],

    queryFn: () => fetchPosts(page, PAGE_SIZE),
    maxPages: 10,
    staleTime: 1000 * 60,
  });

  if (isAuthLoading) {
    return (
      <div className="p-4 h-screen  flex justify-center items-center w-screen overflow-hidden relative">
        <Loader />
      </div>
    );
  }
  if (isError)
    return <div className="p-4">Failed to load posts.,{error.message}</div>;

  const { posts, totalPages } = data! || {};

  return (
    <PostProvider key={"postProvider"}>
      <div className="p-4 flex relative overflow-hidden flex-col gap-4  min-h-screen  items-center">
        <div className="flex flex-row max-w-7xl justify-between px-8  items-center  h-fit  w-full">
          <h1 className="text-2xl font-bold ">Admin Posts</h1>
          <div className="flex gap-4 items-center">
            <NewPostModal />
            {/* Set A PreSet Of Data To the  Database */}
            {/* For Logout  */}
            <LogoutButton />
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
              <div key={post._id} className=" h-fit ">
                <Card className="p-4 relative w-full h-44 overflow-hidden ">
                  <CustomDropDownMenu postId={post._id} />
                  <CardHeader>
                    <CardTitle className="text-start -mt-2 -ml-6 truncate w-full">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="line-clamp-4 h-[4lh] text-sm text-muted-foreground">
                    {post.body}
                  </CardDescription>
                  <CardFooter>
                    <span className="text-sm text-muted-foreground  flex">
                      {post.picture && (
                        <Image
                          title={post.userName}
                          src={post.picture}
                          alt={post.userName ?? "User avatar"}
                          width={20}
                          height={20}
                          className="rounded-full aspect-square "
                        />
                      )}
                      <time className="ml-2 text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleString()}
                      </time>
                    </span>
                  </CardFooter>
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


