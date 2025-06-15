"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText"; // ✅ important!
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const NoPosts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLSpanElement>(null);
  const exclamationRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Split all <h1>s inside the span
    const split = new SplitText(textWrapperRef.current, {
      type: "chars",
    });

    // Animate each character
    tl.fromTo(
      split.chars,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    // Flip the "!" after the text animation completes
    if (exclamationRef.current) {
      tl.to(
        exclamationRef.current,
        {
          rotateY: 360,
          transformOrigin: "center",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            const addButton = document.getElementById("addButton");
            if (addButton) {
              addButton.classList.add("addButton");
            }
          },
        },
        "+=0.2"
      );
    }

    return () => {
      split.revert(); // cleanup
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full gap-8 flex flex-col grow justify-center items-center"
    >
      <span
        ref={textWrapperRef}
        className="flex text-7xl text-red-400 text-shadow-red-600 text-shadow-lg gap-2"
      >
        <h1>Oops</h1>
        <h1 ref={exclamationRef}>!</h1>
        <h1>No posts yet.</h1>
      </span>
      <p className="text-2xl text-muted-foreground">
        Be the first one to post something.
      </p>
    </div>
  );
};

export default NoPosts;
