import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {

  const body = await req.json()
  const ingredients = body.ingredients

  const prompt = `
Suggest 3 recipes using these ingredients: ${ingredients}.

Return JSON format like this:

[
  {
    "name": "",
    "ingredients": "",
    "steps": ""
  }
]
`

  const completion = await groq.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  })

  const text = completion.choices[0].message.content

  return Response.json({
    recipes: JSON.parse(text!)
  })
}