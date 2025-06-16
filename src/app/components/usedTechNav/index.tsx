import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TechButton = () => {
  return (
    <Link href="/tech">
      <Button className="relative group will-change-auto transition-all duration-300 w-10 hover:w-24 cursor-pointer  ">
        <Rocket
          id="rocket"
          className="icon w-5 h-5 translate-x-[0.4rem] group-hover:translate-x-0  group-hover:rotate-45 duration-300 ease-in-out "
        />

        <span
          id="text"
          className="text text-sm opacity-0 w-0  group-hover:opacity-100 group-hover:w-full"
        >
          Tech
        </span>
      </Button>
    </Link>
  );
};

export default TechButton;
