"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { WobbleCardDemo } from "@/components/hero-card";
import { BentoGridThirdDemo } from "@/components/builtfor";
import Component from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="flex flex-col min-h-[100dvh]">
                      <header className="h-14 flex items-center w-full">
              <div className="flex-1 flex items-center justify-start">
                <nav className="flex gap-4 sm:gap-6">
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4 "
                    prefetch={false}
                  >
                    Use Cases
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Careers
                  </Link>
                </nav>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Link
                  href="/"
                  className="flex items-center justify-center"
                  prefetch={false}
                >
                  <span className="text-2xl font-bold">Brainbase</span>
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <Link
                  href="/dashboard"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </div>
            </header>

            <main className="flex-1 flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
              <div className="max-w-3xl px-4 md:px-6 py-24 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Build your own AI workforce
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                  Move some of your most repetitive workflows from your team to AI workers, at a fraction of the cost.
                </p>
                <div className="mt-8">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white"
                    prefetch={false}
                  >
                    Book a Demo
                  </Link>
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-black"
                    prefetch={false}
                  >
                    Backed by YC Combinator <Image src="https://upload.wikimedia.org/wikipedia/commons/1/10/Y_Combinator_Logo.png" height={30} width={30} className=" m-2 rounded-md" alt="yc"/>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Background transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="bg-black py-12"
      >
        <WobbleCardDemo />
      </motion.div>

      <div className="bg-black py-8"> {/* Reduced padding */}
        <h2 className="text-center text-2xl font-bold text-white mb-3">
        Benefits
        </h2>
        <BentoGridThirdDemo />
      </div>
      <Component />
    </>
  );
}
