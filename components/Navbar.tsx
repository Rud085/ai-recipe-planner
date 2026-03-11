"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession();

  return (

    <nav className="navbar">

      <div className="nav-left">
        <Link href="/">AI Recipe Planner</Link>
      </div>

      <div className="nav-right">

        <Link href="/">Home</Link>
        <Link href="/meal-planner">Meal Planner</Link>
        <Link href="/my-recipes">My Recipes</Link>

        {session && (
          <>
            <span className="user-email">
              {session.user?.email}
            </span>

            <button
              className="logout-btn"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>

  );
}