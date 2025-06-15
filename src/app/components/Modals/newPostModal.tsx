import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Loader, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

import { Label } from "@radix-ui/react-label";
import addPost from "@/app/(admin)/admin/controller/addPost";
const NewPostModal = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isSuccess, isError, isPending, error, reset } = useMutation({
    mutationFn: addPost,
    mutationKey: ["posts"],
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    mutate(formData);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button id="addButton" className="cursor-pointer">
          Add Post <Plus className="ml-2"></Plus>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new post</AlertDialogTitle>
        </AlertDialogHeader>
        <form id="newPostForm" onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <textarea
            name="body"
            placeholder="Body"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </form>
        <AlertDialogFooter>
          {isPending ? (
            <Loader></Loader>
          ) : (
            <Button type="submit" form="newPostForm">
              Add
            </Button>
          )}
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {isSuccess && (
            <Label>
              <span className="text-green-500">Post created successfully</span>
            </Label>
          )}
          {isError && (
            <Label>
              <span className="text-red-500">{error.message}</span>
            </Label>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewPostModal;
