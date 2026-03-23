"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/home/Sidebar";
import DoctorGrid from "@/components/home/Grid";
import LoginModal from "@/components/home/LoginModal";
import LoginSignupDetails from "@/components/home/LoginSignupDetails";
import { useAuth } from "@/context/AuthContext";
import { useInitAuth } from "@/hooks/useInitAuth";
// import LoginSignupDetails from "@/components/home/LoginSignupDetails";

export default function HomePage() {
  useInitAuth()
  const { authSteps, setAuthSteps, signupData } = useAuth();
  useEffect(() => {
    console.log("CUrennnnnnnnnnnt value of this ", authSteps);
    console.log("CUrennnnnnnnnnnt value of SIgnUpData", signupData);
  }, [authSteps, signupData]);

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <Sidebar />
      <main className="container">
        <DoctorGrid />
      </main>

      {authSteps == "login" && (
        <LoginModal
          authSteps={authSteps}
          setAuthSteps={setAuthSteps}
          onClose={() => setAuthSteps("closed")}
          onSignupTrigger={() => setAuthSteps("signup")}
        />
      )}

      {authSteps == "signup" && (
        <LoginSignupDetails
          onNext={(data) => {
            console.log("Details submitted : ", data);
            setAuthSteps("closed");
          }}
          onBack={() => setAuthSteps("login")}
        />
      )}
    </div>
  );
}
