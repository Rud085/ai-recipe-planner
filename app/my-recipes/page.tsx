"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";

export default function MyRecipes() {

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {

    const fetchRecipes = async () => {

      const { data } = await supabase
        .from("recipes")
        .select("*")
        .order("id", { ascending: false });

      if (data) setRecipes(data);
    };

    fetchRecipes();

  }, []);

  const deleteRecipe = async (id: number) => {

    await supabase
      .from("recipes")
      .delete()
      .eq("id", id);

    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (

    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <div
        style={{
          width: "900px",
          background: "rgba(0,0,0,0.75)",
          padding: "30px",
          borderRadius: "12px",
          backdropFilter: "blur(6px)"
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "24px",
            fontWeight: "800"
          }}
        >
          My Recipes
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "white"
          }}
        >

          <thead>
            <tr
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <th style={{ textAlign: "left", padding: "12px" }}>Recipe Title</th>
              <th style={{ textAlign: "center", padding: "12px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {recipes.map((item) => (

              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}
              >

                <td
                  style={{
                    padding: "14px",
                    color: "white",
                    fontWeight: "500"
                  }}
                >
                  {item.title}
                </td>

                <td
                  style={{
                    padding: "14px",
                    textAlign: "center"
                  }}
                >

                  <Link href={`/recipes/${item.id}`}>
                    <button
                      style={{
                        padding: "6px 14px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px"
                      }}
                    >
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteRecipe(item.id)}
                    style={{
                      padding: "6px 14px",
                      background: "#ff5c5c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}