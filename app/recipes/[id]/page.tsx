"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase";

export default function RecipePage() {

  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {

    const fetchRecipe = async () => {

      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setRecipe(data);
    };

    fetchRecipe();

  }, [id]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const copyRecipe = async () => {

    const text = `
${recipe.title}

Ingredients:
${recipe.ingredients}

Instructions:
${recipe.recipe}
`;

    await navigator.clipboard.writeText(text);
    alert("Recipe copied!");
  };

  const saveRecipe = () => {

    const text = `
${recipe.title}

Ingredients:
${recipe.ingredients}

Instructions:
${recipe.recipe}
`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  if (!recipe)
    return (
      <p style={{ padding: "40px", color: "white" }}>
        Loading recipe...
      </p>
    );

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px"
      }}
    >

      <div
        style={{
          maxWidth: "850px",
          width: "100%",
          background: "rgba(0,0,0,0.75)",
          padding: "40px",
          borderRadius: "14px",
          backdropFilter: "blur(6px)",
          color: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
        }}
      >

        {/* Title */}
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            paddingBottom: "10px"
          }}
        >
          {recipe.title}
        </h1>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px"
          }}
        >

          <button
            onClick={toggleFavorite}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: favorite ? "#ffcc00" : "#555",
              color: "white",
              cursor: "pointer"
            }}
          >
            ⭐ Favorite
          </button>

          <button
            onClick={saveRecipe}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#4CAF50",
              color: "white",
              cursor: "pointer"
            }}
          >
            💾 Save
          </button>

          <button
            onClick={copyRecipe}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#7c8cff",
              color: "white",
              cursor: "pointer"
            }}
          >
            📋 Copy
          </button>

        </div>

        {/* Ingredients */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "10px"
          }}
        >

          <h2
            style={{
              marginBottom: "10px",
              fontSize: "22px"
            }}
          >
            Ingredients
          </h2>

          <p style={{ lineHeight: "1.6" }}>
            {recipe.ingredients}
          </p>

        </div>

        {/* Recipe Steps */}
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "10px",
            whiteSpace: "pre-line"
          }}
        >

          <h2
            style={{
              marginBottom: "12px",
              fontSize: "22px"
            }}
          >
            Instructions
          </h2>

          <div style={{ lineHeight: "1.8" }}>
            {recipe.recipe}
          </div>

        </div>

      </div>

    </div>
  );
}