import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {

  const { ingredients } = await req.json();

  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Create a recipe using these ingredients: ${ingredients}.

Return the recipe in this format:

Title: <recipe title>

Ingredients:
- ingredient 1
- ingredient 2
- ingredient 3

Steps:
1. step one
2. step two
3. step three
`,
        },
      ],
    });

    const recipe =
      completion.choices[0]?.message?.content || "No recipe generated.";

    return new Response(JSON.stringify({ recipe }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {

    console.error(error);

    return new Response(
      JSON.stringify({ recipe: "Error generating recipe." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}