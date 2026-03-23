import { useAuth } from "@/context/AuthContext";
import { HostProfile, UserProfile } from "@/types/auth";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export async function apiClient(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  body?: UserProfile | HostProfile,
  token?: string,
  secret_key?: string,
  headers?: object,
) {
  const headers1 = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    key: secret_key,
    ...headers
  };
  console.log('headersssssssssssssss', headers1)
  const finalBody = body ? { ...body, fcmToken: "" } : undefined;
  const res = await fetch(`${baseURL}${endpoint}`, {
    method,
    headers: headers1,
    body: finalBody ? JSON.stringify(finalBody) : undefined,
  });

  if (!res.ok) {
    throw new Error("Api failed");
  }

  return res.json();
}
