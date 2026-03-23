"use client";

import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "firebase/auth";
import React, { useState, useRef } from "react";
import { updateUserProfileHandler } from "../../hooks/useAuth";
import { UpdateProfilePayload } from "@/types/auth";

interface LoginSignupDetailsProps {
  onNext?: (data: UserProfile) => void;
  onBack?: () => void;
}

// update components
export default function LoginSignupDetails({
  onNext,
  onBack,
}: LoginSignupDetailsProps) {
  const { signupData } = useAuth();

  const [formData, setFormData] = useState({
    name: signupData.user.name || "",
    dob: "",
    country: "India",
    bio: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    signupData?.user.image || "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const token = localStorage.getItem("token");
  const secret_key = "PmW7VrejoLnoR3x}L}tBRUsEQ,|?z"
  //x-user-uid
  const firebaseUid = localStorage.getItem("firebaseUid");
  const headers = {secret_key,"x-user-uid":firebaseUid} ;
  const { handleUpdateProfile } = updateUserProfileHandler(token,secret_key,headers);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const payload:UpdateProfilePayload={
      name:formData.name,
      bio:formData.bio,
      dob:formData.dob,
      country:formData.country,
      countryFlagImage:""
    }

    console.log("Next CLicked",payload)

    try{
      await handleUpdateProfile(payload)
    }catch(error:unknown){
      console.log("Error came in handleSubmit", error) 
    }

    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

      {/* Modal View - Width increased to 440px, height controlled by content */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] sm:w-[440px] bg-[#E97607] rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-20 w-[34px] h-[34px] rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Back"
        >
          <svg
            className="w-5 h-5 text-black pr-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto pt-12 pb-6 px-6 sm:px-10 custom-scrollbar">
          <div className="flex flex-col items-center mb-5">
            <h2 className="text-white text-[18px] font-bold mb-4">
              Enter Your Details
            </h2>

            {/* Profile Picture Upload */}
            <div className="flex justify-center relative">
              <div
                className="w-[85px] h-[85px] rounded-full bg-white border-4 border-white/20 relative cursor-pointer overflow-hidden flex items-center justify-center shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-9 h-9 text-[#E97607]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-white border-2 border-[#E97607] rounded-full flex items-center justify-center shadow-md"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#E97607]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-white text-[12px] font-bold mb-1 ml-4 uppercase tracking-wider opacity-90">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black text-[14px] px-5 py-3 rounded-full border-none focus:ring-2 focus:ring-white/50 focus:outline-none placeholder-gray-400 shadow-sm"
                  placeholder="Aria Scott"
                  required
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-white text-[12px] font-bold mb-1 ml-4 uppercase tracking-wider opacity-90">
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black text-[14px] px-5 py-3 rounded-full border-none focus:ring-2 focus:ring-white/50 focus:outline-none [color-scheme:light] shadow-sm"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-white text-[12px] font-bold mb-1 ml-4 uppercase tracking-wider opacity-90">
                  Country
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black text-[14px] px-5 py-3 rounded-full border-none focus:ring-2 focus:ring-white/50 focus:outline-none appearance-none cursor-pointer shadow-sm"
                    required
                  >
                    <option value="India">🇮🇳 India</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="UK">🇬🇧 UK</option>
                    <option value="Canada">🇨🇦 Canada</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-white text-[12px] font-bold mb-1 ml-4 uppercase tracking-wider opacity-90">
                  Bio (Optional)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-white text-black text-[14px] px-5 py-3 rounded-2xl border-none focus:ring-2 focus:ring-white/50 focus:outline-none placeholder-gray-400 resize-none shadow-sm"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              className="w-full mt-4 h-[48px] flex items-center justify-center bg-white hover:bg-gray-50 text-black text-[15px] font-bold rounded-full transition-all shadow-lg active:scale-[0.98]"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
