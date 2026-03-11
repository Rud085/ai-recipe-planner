import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import supabase from "@/lib/supabase";
import bcrypt from "bcrypt";

const handler = NextAuth({

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
     
     async authorize(credentials) {

  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  const email = credentials.email;
  const password = credentials.password;

  // Try finding the user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("FETCH USER ERROR:", error);
  }

  // If user exists → verify password
  if (user) {
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("Password incorrect");
      return null;
    }

    return {
      id: user.id,
      email: user.email
    };
  }

  // User does not exist → create account
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({
      email: email,
      password: hashedPassword
    })
    .select()
    .single();

  if (insertError) {
    console.error("INSERT ERROR:", insertError);
    return null;
  }

  return {
    id: newUser.id,
    email: newUser.email
  };
}
    })

  ],

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET

});

export { handler as GET, handler as POST };