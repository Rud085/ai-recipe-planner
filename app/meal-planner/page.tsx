"use client";

import { useState } from "react";

export default function MealPlanner() {

  const [calories,setCalories] = useState(2000);
  const [meals,setMeals] = useState(3);
  const [snacks,setSnacks] = useState(2);
  const [diet,setDiet] = useState("flexible");
  const [plan,setPlan] = useState("");

  const generatePlan = async () => {

    const res = await fetch("/api/mealplan",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ calories, meals, snacks, diet })
    });

    const data = await res.json();
    setPlan(data.plan);
  };

  const savePlan = async () => {

    await fetch("/api/saveMealPlan",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ plan })
    });

    alert("Meal plan saved!");
  };

  return (

    <div style={{padding:"40px"}}>

      <div
        style={{
          background:"rgba(0,0,0,0.75)",
          padding:"40px",
          borderRadius:"16px",
          color:"white"
        }}
      >

        <h1
          style={{
            fontSize:"40px",
            marginBottom:"10px"
          }}
        >
          Automatic Meal Planner
        </h1>

        <p style={{opacity:0.8}}>
          Generate AI meal plans for weight loss, gain or healthy eating.
        </p>

        {/* SETTINGS PANEL */}

        <div
          style={{
            marginTop:"30px",
            display:"grid",
            gridTemplateColumns:"1fr 1fr 1fr 1fr",
            gap:"20px"
          }}
        >

          <div>
            <p>Calories</p>
            <input
              type="number"
              value={calories}
              onChange={(e)=>setCalories(Number(e.target.value))}
              style={{
                padding:"10px",
                borderRadius:"6px",
                border:"none"
              }}
            />
          </div>

          <div>
            <p>Diet Type</p>
            <select
              value={diet}
              onChange={(e)=>setDiet(e.target.value)}
              style={{
                padding:"10px",
                borderRadius:"6px",
                border:"none"
              }}
            >
              <option value="flexible">Flexible</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="high-protein">High Protein</option>
            </select>
          </div>

          <div>
            <p>Meals</p>
            <input
              type="number"
              value={meals}
              onChange={(e)=>setMeals(Number(e.target.value))}
              style={{
                padding:"10px",
                borderRadius:"6px",
                border:"none"
              }}
            />
          </div>

          <div>
            <p>Snacks</p>
            <input
              type="number"
              value={snacks}
              onChange={(e)=>setSnacks(Number(e.target.value))}
              style={{
                padding:"10px",
                borderRadius:"6px",
                border:"none"
              }}
            />
          </div>

        </div>

        <button
          onClick={generatePlan}
          style={{
            marginTop:"30px",
            padding:"15px 40px",
            background:"#ff6b00",
            border:"none",
            borderRadius:"8px",
            color:"white",
            fontWeight:"600",
            cursor:"pointer"
          }}
        >
          CREATE MEAL PLAN
        </button>

      </div>

      {/* RESULT */}

      {plan && (

        <div
          style={{
            marginTop:"40px",
            background:"rgba(0,0,0,0.75)",
            padding:"30px",
            borderRadius:"12px",
            color:"white",
            whiteSpace:"pre-line"
          }}
        >

          <h2>Generated Meal Plan</h2>

          <div style={{marginTop:"20px"}}>
            {plan}
          </div>

          <button
            onClick={savePlan}
            style={{
              marginTop:"20px",
              padding:"10px 25px",
              background:"#4CAF50",
              border:"none",
              borderRadius:"6px",
              color:"white"
            }}
          >
            Save Plan
          </button>

        </div>

      )}

    </div>

  );
}