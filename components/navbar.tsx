"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-auto mt-4 max-w-6xl px-4">
      <div className="
        flex items-center justify-between
        rounded-2xl border border-white/40
        bg-linear-to-br from-indigo-500/10 via-sky-500/10 to-emerald-500/10
        backdrop-blur-md
        px-5 py-3
        shadow-lg shadow-sky-500/10
      ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logoipsum-401.svg"
            alt="CivicFix Logo"
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold text-gray-900">
            CivicFix
          </span>
        </Link>

       {/* Nav Links */}
<div className="hidden md:flex items-center gap-2">
  {/* Public link (everyone can see) */}
  <NavLink href="/transparency">View Issues</NavLink>

  {/* Protected links (only signed in users) */}
  <SignedIn>
    <NavLink href="/dashboard">Dashboard</NavLink>
    <NavLink href="/report" variant="danger">
      Report Issue
    </NavLink>
  </SignedIn>
</div>


        {/* Auth */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="
                rounded-full bg-indigo-600
                px-5 py-2 text-sm font-medium text-white
                hover:bg-indigo-700 transition
              ">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

/* ---------------- NavLink component ---------------- */

const NavLink = ({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) => {
  const base =
    "rounded-lg px-4 py-2 text-sm font-medium transition";

  const styles =
    variant === "danger"
      ? "bg-white text-red-600 hover:bg-red-500 hover:text-white"
      : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
};
