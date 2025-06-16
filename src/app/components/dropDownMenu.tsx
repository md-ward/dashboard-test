import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePostContext } from "./post.state";

const CustomDropDownMenu = ({ postId }: { postId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { setIsDeleteModalOpen, setPostId, setIsEditModalOpen } =
    usePostContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (menuRef.current) {
      const editButton = menuRef.current?.childNodes[0];
      const deleteButton = menuRef.current?.childNodes[1];

      if (editButton && deleteButton) {
        editButton.addEventListener("click", () => {
          handleClose();
        });
        deleteButton.addEventListener("click", () => {
          handleClose();
        });
      }
      return () => {
        editButton?.removeEventListener("click", () => {
          handleClose();
        });
        deleteButton?.removeEventListener("click", () => {
          handleClose();
        });
      };
    }
  }, [isOpen]);

  function handleClose() {
    const menu = menuRef.current;
    const tl = gsap.timeline();

    if (!menu) return;
    tl.to(menu, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.inOut",

      onComplete: () => {
        setIsOpen(false);
      },
    });
  }

  return (
    <div className="absolute -top-1 right-0">
      <div className="relative w-fit inline-block">
        <Button
          onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
          variant="outline"
        >
          <MoreVertical />
        </Button>

        {isOpen && (
          <Menu
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setPostId={setPostId}
            menuRef={menuRef}
            postId={postId}
          />
        )}
      </div>
    </div>
  );
};
export default CustomDropDownMenu;

const Menu = ({
  postId,
  menuRef,
  setPostId,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}: {
  postId: string;
  menuRef: RefObject<HTMLDivElement | null>;
  setPostId: (postId: string | null) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}) => {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    const menu = menuRef.current;
    const tl = gsap.timeline();

    if (!menu) return;
    tl.fromTo(
      menu,
      {
        opacity: 0,
        y: -10,
      },

      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute right-12 mt-2 w-32 bg-white z-50 shadow-lg rounded-md p-2 flex flex-col -top-1 *:cursor-pointer *:hover:scale-105 gap-2"
    >
      <Button
        variant="secondary"
        className="w-full justify-start"
        onClick={() => {
          setPostId(postId);
          setIsEditModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        className="w-full justify-start"
        onClick={() => {
          setPostId(postId);
          setIsDeleteModalOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );
};
