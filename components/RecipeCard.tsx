"use client";

export default function RecipeCard({ recipe }: { recipe: string }) {

  const lines = recipe.split("\n");

  const title = lines.find(line => line.toLowerCase().includes("title")) || "";
  const ingredientsIndex = lines.findIndex(line => line.toLowerCase().includes("ingredients"));
  const stepsIndex = lines.findIndex(line => line.toLowerCase().includes("steps"));

  const ingredients =
    ingredientsIndex !== -1
      ? lines.slice(ingredientsIndex + 1, stepsIndex)
      : [];

  const steps =
    stepsIndex !== -1
      ? lines.slice(stepsIndex + 1)
      : [];

  return (
    <div>

      <h2 className="recipe-title">
        🍳 {title.replace("Title:", "").trim()}
      </h2>

      <h3>Ingredients</h3>
      <ul>
      {ingredients
  .filter(item => item.trim() !== "")
  .map((item, index) => (
    <li key={index}>
      {item.replace(/^[-*\d.\s]+/, "")}
    </li>
))}
      </ul>

      <h3>Steps</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

    </div>
  );
}