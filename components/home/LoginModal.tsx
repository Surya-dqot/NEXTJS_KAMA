"use client";

import Image from "next/image";
import { useLoginController } from "@/hooks/useLoginController";

interface LoginModalProps {
  onClose: () => void;
  onSignupTrigger:() => void;
  authSteps:string;
  setAuthSteps:unknown;
}

export default function LoginModal({authSteps,setAuthSteps, onClose ,onSignupTrigger}: LoginModalProps) {
  const {
    loading,
    error,
    eulaAccepted,
    setEulaAccepted,
    onQuickLogin,
    onGoogleLogin,
  } = useLoginController(() => {
    onClose(); // modal band karo success pe
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal View */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[380px] bg-[#E97607] rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center">
        
        {/* Back button */}
        <button
          onClick={!loading ? onClose : undefined}
          className="absolute top-5 left-5 w-8.5 h-8.5 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-none"
          aria-label="Back"
        >
          <svg className="w-5 h-5 text-black pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo */}
        <div className="mt-8 mb-8 w-25 h-25 bg-white rounded-3xl flex flex-col items-center justify-center p-3 shadow-sm">
          <Image
            src="/images/logo.png"
            alt="Kama Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-red-600 border border-red-500 rounded-xl">
            <p className="text-white text-[12px] text-center">{error}</p>
          </div>
        )}

        {/* Let's Start — Anonymous Login */}
        <button
          onClick={onQuickLogin}
          disabled={loading}
          className="w-full h-[50px] relative flex items-center justify-center bg-white hover:bg-gray-50 text-black text-[15px] font-bold rounded-full transition-all mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="absolute left-[20px] flex items-center justify-center">
            {loading ? (
              <svg className="w-5 h-5 animate-spin text-[#E97607]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21.9216 2.0784C21.7828 1.93922 21.5835 1.87905 21.3854 1.91686C18.6657 2.43387 11.5317 4.10862 6.55169 9.08862C5.9751 9.66519 5.48514 10.2797 5.0934 10.9167L2.47952 11.5701C2.17983 11.6451 1.96696 11.9054 1.95475 12.213C1.94254 12.5206 2.13455 12.803 2.42845 12.9103L6.96582 14.567L9.43283 17.0343L11.0895 21.5714C11.1968 21.8655 11.4792 22.0575 11.7868 22.0453C12.0944 22.0331 12.3547 21.82 12.4297 21.5205L13.0831 18.9066C13.72 18.5149 14.3344 18.0249 14.9108 17.4484C19.8909 12.4683 21.5657 5.33436 22.0831 2.61463C22.1209 2.41655 22.0608 2.21723 21.9216 2.0784ZM12.0831 13.9169C11.0706 13.9169 10.2498 13.0961 10.2498 12.0836C10.2498 11.0711 11.0706 10.2503 12.0831 10.2503C13.0957 10.2503 13.9165 11.0711 13.9165 12.0836C13.9165 13.0961 13.0957 13.9169 12.0831 13.9169ZM4.70014 17.7719L2.83151 19.6406C2.57116 19.9009 2.57116 20.323 2.83151 20.5834C3.09186 20.8437 3.51397 20.8437 3.77432 20.5834L5.64295 18.7147C4.94522 17.9258 4.70014 17.7719 4.70014 17.7719Z" fill="#E97607"/>
              </svg>
            )}
          </div>
          <span>{loading ? "Please wait..." : "Let's Start"}</span>
        </button>

        {/* Google Login */}
        <button
          onClick={onGoogleLogin}
          disabled={loading}
          className="w-full h-[50px] relative flex items-center justify-center bg-white hover:bg-gray-50 text-black text-[15px] font-bold rounded-full transition-all mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="absolute left-[20px] flex items-center justify-center">
            <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </div>
          <span>Google</span>
        </button>

        {/* EULA Checkbox */}
        <div
          className="flex items-start gap-2 mb-4 cursor-pointer w-full px-1"
          onClick={() => setEulaAccepted(!eulaAccepted)}
        >
          <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${eulaAccepted ? "bg-white border-white" : "border-white/50"}`}>
            {eulaAccepted && (
              <svg className="w-2.5 h-2.5 text-[#E97607]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className="text-white text-[11px] leading-[1.6]">
            By logging in, you agree to our
            {" "}
            <span className="font-bold cursor-pointer hover:underline">Privacy Policy</span>
            {" "}and{" "}
            <span className="font-bold cursor-pointer hover:underline">Terms and Conditions</span>
          </p>
        </div>
      </div>
    </>
  );
}