"use client";

import { useState } from "react";

export default function MealPlanner() {
  const [calories, setCalories] = useState(2000);
  const [meals, setMeals] = useState(3);
  const [snacks, setSnacks] = useState(2);
  const [diet, setDiet] = useState("flexible");
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {
    const res = await fetch("/api/mealplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        calories,
        meals,
        snacks,
        diet,
      }),
    });

    const data = await res.json();
    setPlan(data.plan);
  };

  const savePlan = async () => {
    await fetch("/api/saveMealPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    alert("Meal plan saved!");
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Meal Planner Card */}

      <div className="meal-card">
        <h1 className="meal-title">🍽️ Meal Planner</h1>

        <p className="meal-subtitle">
          Generate personalized AI meal plans for weight loss, muscle gain, or
          healthy eating.
        </p>

        {/* SETTINGS */}

        <div className="meal-settings">
          <div>
            <label>🔥 Calories</label>

            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="meal-input"
            />
          </div>

          <div>
            <label>🥗 Diet Type</label>

            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="meal-input"
            >
              <option value="flexible">Flexible</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="high-protein">High Protein</option>
            </select>
          </div>

          <div>
            <label>🍽 Meals</label>

            <input
              type="number"
              value={meals}
              onChange={(e) => setMeals(Number(e.target.value))}
              className="meal-input"
            />
          </div>

          <div>
            <label>🍎 Snacks</label>

            <input
              type="number"
              value={snacks}
              onChange={(e) => setSnacks(Number(e.target.value))}
              className="meal-input"
            />
          </div>
        </div>

        <button
          onClick={generatePlan}
          className="meal-button"
        >
          CREATE MEAL PLAN
        </button>
      </div>

      {/* RESULT */}

      {plan && (
        <div
          className="meal-card"
          style={{ marginTop: "35px" }}
        >
          <h2>📋 Generated Meal Plan</h2>

          <div
            style={{
              marginTop: "20px",
              whiteSpace: "pre-line",
              lineHeight: "1.8",
            }}
          >
            {plan}
          </div>

          <button
            onClick={savePlan}
            style={{
              marginTop: "25px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            💾 Save Meal Plan
          </button>
        </div>
      )}
    </div>
  );
}