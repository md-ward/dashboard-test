"use client";

import { useRef } from "react";
import gsap from "gsap";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import _gsap from "gsap/gsap-core";

const techStack = [
  {
    title: "Auth0",
    description: "Secure authentication for the admin dashboard.",
  },
  {
    title: "TailwindCSS",
    description: "Utility-first CSS framework for fast UI styling.",
  },
  {
    title: "GSAP",
    description: "High-performance page and UI animations.",
  },
  {
    title: "MongoDB Atlas",
    description: "Cloud-hosted NoSQL database for scalable storage.",
  },
  {
    title: "CSS Animation",
    description: "Animated borders and glowing UI effects.",
  },
];

export default function TechShowcasePage() {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  _gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="min-h-screen px-6 py-16 ">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
        Tech Stack Overview
      </h1>

      {/* Purpose & Description */}
      <div className="flex lg:flex-row flex-col gap-8 p-2">
        <div className="max-w-3xl text-start mx-auto text-gray-700 mb-14 text-base sm:text-lg leading-relaxed">
          <p className="mb-4">
            This project was originally a simple frontend test requested by a
            company, using JSON Server. However, I decided to take it to the
            next level by implementing a more realistic tech stack used in
            production applications.
          </p>
          <p className="mb-4">
            I integrated <strong>Auth0</strong> for secure authentication,
            <strong> MongoDB Atlas</strong> as the database, and added
            <strong> GSAP + TailwindCSS</strong> for a more interactive and
            polished UI experience.
          </p>
          <p className="font-semibold text-gray-800">
            To add or manage posts, navigate to the <strong>/admin</strong> page
            and create a new account. Once registered, you can access the admin
            dashboard.
          </p>
        </div>

        {/* Tech Cards */}
        <div className="grid gap-8 grid-cols-1 grow sm:grid-cols-2 w-full mx-auto">
          {techStack.map((tech, index) => (
            <div
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("addButton");
                gsap.to(cardRefs.current[index], {
                  duration: 0.2,
                  scale: 1.05,
                  ease: "power3.out",
                });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("addButton");
                gsap.to(cardRefs.current[index], {
                  duration: 0.2,
                  scale: 1,
                  ease: "power3.out",
                });
              }}
              key={tech.title}
              className="z-20"
            >
              <Card
                className="h-full"
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{tech.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {tech.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-xl mx-auto mt-20">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-xl">Want to explore more?</CardTitle>
            <CardDescription>
              Try logging in as admin or return to the homepage.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center mt-4 **:!cursor-pointer">
            <Link href="/admin">
              <Button variant="default">Try Admin Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
