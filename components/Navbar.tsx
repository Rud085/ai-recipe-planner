"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">

      <div className="nav-logo">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          🤖 AI Recipe Planner
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>

        <Link
          href="/"
          className={isActive("/") ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          🏠 Home
        </Link>

        <Link
          href="/meal-planner"
          className={isActive("/meal-planner") ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          🍽 Meal Planner
        </Link>

        <Link
          href="/my-recipes"
          className={isActive("/my-recipes") ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          ❤️ My Recipes
        </Link>

        {session && (
          <>
            <span className="user-email">
              {session.user?.email}
            </span>

            <button
              className="logout-btn"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              🚪 Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}