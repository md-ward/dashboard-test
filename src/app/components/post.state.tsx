import { useState } from "react";
import { createContext, useContext } from "react";

// context/PostContext.tsx

type PostContextType = {
  postId: string | null;
  isResetDbModal: boolean;
  setIsResetDbModal: (open: boolean) => void;
  setPostId: (postId: string | null) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider");
  }
  return context;
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [postId, setPostId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetDbModal, setIsResetDbModal] = useState(false);

  return (
    <PostContext.Provider
      value={{
        postId,
        setPostId,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isResetDbModal,
        setIsResetDbModal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
