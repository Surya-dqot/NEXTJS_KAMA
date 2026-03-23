import { HostProfile, UpdateProfilePayload, UserProfile } from "@/types/auth";
import { api, apiClient } from "./apiClient";

export const loginUser = async (data: unknown) => {
  const res = await api.post("/login", data);
  return res.data;
};

export function updateUserProfile(
  data: UpdateProfilePayload,
  token: string,
  secret_key: string,
  headers?: object,
) {
  return apiClient(
    "/api/client/user/modifyUserProfile",
    "PATCH",
    data,
    token,
    secret_key,
    headers,
  );
}

export function fetchHostsList( // hosts list for host
  data: unknown,
  token: string,
  secret_key: string,
  headers?: object,
  incomingCountry?: string,
  hostId?:string,
  start?:number,
  limit?:number,
) {
  const country = incomingCountry ? incomingCountry : "global";
  start = start??1;
  limit = limit??10;
  return apiClient(
    `/api/client/host/fetchHostsList?country=${country}&hostId=${hostId}&start=${start}&limit=${limit}`,
    "GET",
    data,
    token,
    secret_key,
    headers,
  );
}
