"use client";

import { useState } from "react";
import RecipeCard from "./RecipeCard";
import supabase from "@/lib/supabase";
import { useSession } from "next-auth/react";

export default function IngredientInput() {

  const { data: session } = useSession();

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  
  const addIngredient = () => {
    const normalized = input.toLowerCase().trim();
    if (!normalized) return;

    const exists = ingredients.some(
      ing => ing.toLowerCase().trim() === normalized
    );

    if (exists) {
      alert("Ingredient already added!");
      return;
    }

    setIngredients([...ingredients, normalized]);
    setInput("");
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const clearIngredients = () => {
    setIngredients([]);
  };

  const addSuggestion = (item: string) => {

    const normalized = item.toLowerCase().trim();

    const exists = ingredients.some(
      ing => ing.toLowerCase().trim() === normalized
    );

    if (exists) {
      alert("Ingredient already added!");
      return;
    }

    setIngredients([...ingredients, normalized]);
  };

  const suggestions = [
    "egg",
    "onion",
    "tomato",
    "chicken",
    "rice",
    "garlic",
    "potato",
    "cheese"
  ];

  const generateRecipe = async () => {

    if (ingredients.length === 0) return;

    setLoading(true);

    try {

      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ingredients: ingredients.join(", ")}),
      });

      const data = await res.json();

      setRecipe(data.recipe);
      setHistory(prev => [data.recipe, ...prev]);

      // Extract clean title
      const rawTitle = data.recipe.split("\n")[0];
      const title = rawTitle.replace("Title:", "").trim();

      // Save recipe to Supabase (ONLY ONCE)
      const { error } = await supabase
        .from("recipes")
        .insert({
          user_email: session?.user?.email || "guest",
          title: title,
          ingredients: ingredients.join(", "),
          recipe: data.recipe
        });

      console.log("SAVE ERROR:", error);

    } catch (error) {
      console.error("Error generating recipe:", error);
    }

    setLoading(false);
  };

  return (
    <div className="layout">

      <div className="left-panel">
        <h2>AI Recipe Generator</h2>

        <div className="suggestions">
          {suggestions.map((item, index) => (
            <span
              key={index}
              className="suggestion-chip"
              onClick={() => addSuggestion(item)}
            >
              {item}
            </span>
          ))}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addIngredient();
          }}
          placeholder="Enter ingredient"
        />

        <div className="button-row">
          <button onClick={addIngredient}>
            Add Ingredient
          </button>

          <button onClick={generateRecipe} disabled={loading}>
            {loading ? "Generating..." : "Generate Recipe"}
          </button>

          <button onClick={clearIngredients}>
            Clear All
          </button>
        </div>

        <div className="chips">
          {ingredients.map((item, index) => (
            <span key={index} className="chip">
              {item}
              <button
                className="Remove"
                onClick={() => removeIngredient(index)}
              >
                ❌
              </button>
            </span>
          ))}
        </div>

      </div>

      <div className="right-panel">

        <h2 style={{ marginBottom: "15px" }}>
          AI Generated Recipe
        </h2>

        {history.length > 0 && (
          <div className="history">

            <h3>Previous Recipes</h3>

            <ul>

              {history.map((item, index) => {

                const titleLine = item.split("\n").find(line =>
                  line.toLowerCase().includes("title")
                );

                const title = titleLine
                  ? titleLine.replace("Title:", "").trim()
                  : "Recipe";

                return (
                  <li key={index}>
                    <button
                      onClick={() => setRecipe(item)}
                      className="history-item"
                    >
                      {title}
                    </button>
                  </li>
                );

              })}

            </ul>

          </div>
        )}

        {loading && <p>Generating recipe...</p>}

        {recipe && <RecipeCard recipe={recipe} />}

      </div>

    </div>
  );
}