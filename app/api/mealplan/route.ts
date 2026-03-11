import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req:Request){

  const { calories, meals, snacks, diet } = await req.json();

  const completion = await groq.chat.completions.create({
    model:"llama-3.1-8b-instant",
    messages:[
      {
        role:"user",
        content:`
Create a daily meal plan.

Calories: ${calories}
Meals: ${meals}
Snacks: ${snacks}
Diet type: ${diet}

Return format:

Breakfast:
Lunch:
Dinner:

Snacks:

Total calories breakdown.
`
      }
    ]
  });

  const plan = completion.choices[0]?.message?.content || "";

  return Response.json({ plan });

}