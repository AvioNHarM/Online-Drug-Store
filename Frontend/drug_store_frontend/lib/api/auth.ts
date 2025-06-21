import { signIn } from "next-auth/react";

const BASE_URL = "http://127.0.0.1:8000/drugstore/auth";

export async function isUserAdmin(userId: string): Promise<boolean> {
  console.log("Checking admin for userId:", userId);

  const res = await fetch(`${BASE_URL}/is_admin/`, {
    method: "POST",
    headers: { "Content-Type": "application/kjson" },
    body: JSON.stringify({ userid: userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to check admin status");
  }

  const data = await res.json();
  return data.is_admin === true;
}



async function registerUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.error || data.message || "Registration failed" };
    }

    return { success: true, message: data.message };
  } catch (err) {
    console.error("Registration error:", err);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

export async function registerAndLogin(email: string, password: string) {
  const registerResult = await registerUser(email, password);

  if (!registerResult.success) {
    return registerResult;
  }

  const signInResult = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!signInResult || signInResult.error) {
    return { success: false, message: signInResult?.error || "Failed to sign in after registration" };
  }

  return { success: true, message: "Registration and login successful" };
}
