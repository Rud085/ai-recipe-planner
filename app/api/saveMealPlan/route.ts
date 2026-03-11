import supabase from "@/lib/supabase";

export async function POST(req:Request){

  const { plan } = await req.json();

  const { data } = await supabase
    .from("mealplans")
    .insert([
      { user_id: sessionStorage.user.id,
        plan 
      }
    ]);

  return Response.json({ success:true });

}