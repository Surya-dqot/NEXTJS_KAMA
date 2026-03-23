"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthSteps, AuthContextType, signupResponse } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authSteps, setAuthSteps] = useState<AuthSteps>("login");
  const [signupData, setSignupData] = useState<signupResponse>(null);
  const secret_key = "PmW7VrejoLnoR3x}L}tBRUsEQ,|?z";
  return (
    <AuthContext.Provider
      value={{ authSteps, secret_key, setAuthSteps, signupData, setSignupData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
