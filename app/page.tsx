"use client";
import supabase from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import IngredientInput from "../components/IngredientInput";
export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  

  return (
  <main>

    <h1 className="title">🍳 AI Recipe Planner</h1>

    <h3 className="subtitle">Enter ingredients you already have</h3>

    <IngredientInput />

  </main>
);
}