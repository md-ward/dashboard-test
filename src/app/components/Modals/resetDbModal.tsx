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

export function ResetDbDialog() {
  const { isResetDbModal, setIsResetDbModal } = usePostContext();
  const queryClient = useQueryClient();

  const {
    mutate: resetDb,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_RESET}`, {
        method: "PUT", // assuming your reset endpoint uses PUT
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || `Failed to reset DB (status ${res.status})`
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsResetDbModal(false);
    },
    onError: () => {
      alert("Something went wrong while resetting the database.");
    },
  });

  return (
    <AlertDialog open={isResetDbModal} onOpenChange={setIsResetDbModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {isError && <p className="text-red-500">{error.message}</p>}
          <AlertDialogTitle>Reset Database</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset the entire database? All Current
            posts will be lost and Replaced with Default Posts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:cursor-pointer">
          <AlertDialogCancel onClick={() => setIsResetDbModal(false)}>
            Cancel
          </AlertDialogCancel>
          {isPending ? (
            <Loader />
          ) : (
            <AlertDialogAction
              onClick={() => resetDb()}
              className="bg-destructive hover:bg-destructive/90"
            >
              Reset
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
