import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostContext } from "../post.state";
import { Loader } from "../loader";

export function DeletePostDialog() {
  const { postId, isDeleteModalOpen, setIsDeleteModalOpen } = usePostContext();
  const queryClient = useQueryClient();

  const {
    mutate: deletePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (postId: number) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || `Failed to delete post (status ${res.status})`
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      alert("something went wrong");
    },
  });
  return (
    <AlertDialog open={isDeleteModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {isError && <h1>{error.message}</h1>}
          <AlertDialogTitle> Delete Post {postId}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:cursor-pointer">
          <AlertDialogCancel onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </AlertDialogCancel>
          {isPending ? (
            <Loader />
          ) : (
            <AlertDialogAction
              onClick={() => {
                deletePost(postId as number);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
