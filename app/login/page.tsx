"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/"
    });

  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "14px",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            color: "#333"
          }}
        >
          Login / Sign Up
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "25px"
          }}
        >
          Access your AI Recipe Planner
        </p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "crimson",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}