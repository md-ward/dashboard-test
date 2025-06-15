"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DisclaimerToast() {
  return (
    <Button
      className="addButton cursor-pointer"
      variant="outline"
      onClick={() =>
        toast(
          "This website is a quick test project made by Some Company Online.",
          {
            className: "text-lg",
            description: "This is just a demo site to showcase features.",
            position: "top-center",
            action: {
              label: "Dismiss",
              onClick: () => toast.dismiss(),
            },
          }
        )
      }
    >
      Disclaimer
    </Button>
  );
}
