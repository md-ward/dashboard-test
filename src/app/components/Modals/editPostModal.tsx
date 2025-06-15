import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import PostModalSkeleton from "../Skeletons/postModalSkeleton";
import getPostById from "@/app/(admin)/admin/controller/getPostById";
import { usePostContext } from "../post.state";
import { updatePost } from "@/app/(admin)/admin/controller/editPost";
import { Loader } from "../loader";
const EditPostModal = () => {
  // const queryClient = useQueryClient();
  const { isEditModalOpen, postId, setIsEditModalOpen } = usePostContext();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { data: postData, isPending } = useQuery({
    enabled: typeof postId === "number" && postId !== 0,
    queryFn: () => getPostById(Number(postId)),
    queryKey: ["post", postId],
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();

  const { mutate, isPending: isMutatePending } = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditModalOpen(false);
    },
    onError: () => {
      alert("something went wrong");
    },
  });

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setBody(postData.body);
    }
  }, [postData]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate({
      id: Number(postId),
      title,
      body,
    });
  }

  return (
    <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit post</AlertDialogTitle>
        </AlertDialogHeader>

        {isPending && <PostModalSkeleton />}
        {!isPending && (
          <form id="newPostForm" onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <textarea
            rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              name="body"
              placeholder="Body"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </form>
        )}
        <AlertDialogFooter>
          {isMutatePending ? (
            <Loader />
          ) : (
            <Button type="submit" form="newPostForm">
              Edit
            </Button>
          )}
          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPostModal;
