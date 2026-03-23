"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInAnonymously,
  signInWithPopup,
  signInWithCustomToken,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseUid } from "@/firebase/FirebaseUid";
import { FirebaseAccessToken } from "@/firebase/FirebaseAccessToken";
import { Database } from "@/utils/Database";
import { useAuth } from "@/context/AuthContext";
const Base_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import {
  UserResponse,
  HostResponse,
  UserProfile,
  HostProfile,
} from "@/types/auth";

import {store} from "@/redux/store";
import {setUser,setLoading,setError} from "@/redux/features/user/userSlice";

const RANDOM_NAMES = [
  "Emily Johnson",
  "Sophia Brown",
  "Olivia Miller",
  "Ava Wilson",
  "Mia Anderson",
  "Isabella Taylor",
  "Amelia Thomas",
  "Harper Moore",
  "Evelyn Jackson",
  "Abigail White",
  "Ella Harris",
  "Scarlett Lewis",
  "Lily Clark",
  "Grace Hall",
  "Zoe Young",
  "Nora King",
  "Riley Wright",
  "Aria Scott",
  "Hannah Green",
  "Layla Adams",
];

const RANDOM_IMAGES = [
  "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3053485/pexels-photo-3053485.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
];

const randomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// ─── device_uuid (Flutter's Database.identity equivalent) ───────────────────
function getDeviceUuid(): string {
  let uuid = localStorage.getItem("device_uuid");
  if (!uuid) {
    uuid = crypto.randomUUID();
    localStorage.setItem("device_uuid", uuid);
  }
  return uuid;
}

// ─── Generic API caller ──────────────────────────────────────────────────────
async function apiCall<T extends { fcmToken?: string }>(
  endpoint: string,
  body: T,
  token: string,
  key: string,
) {
  body.fcmToken = "abcdefgh";
  const res = await fetch(`${Base_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      key: `${key}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiGet(endpoint: string, token: string,key:string) {
  const res = await fetch(`${Base_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      key
    },
  });
  return res.json();
}

// ─── Save profile to Database ────────────────────────────────────────────────
function saveToDatabase(profile: UserResponse, hostProfile: HostResponse) {
  Database.onSetLoginUserId(profile?.user?.id ?? "");
  Database.onSetLoginType(profile?.user?.loginType ?? 0);
  Database.onSetVip(profile?.user?.isVip ?? false);
  Database.onSetEmail(
    Database.isHost
      ? (hostProfile?.host?.email ?? "")
      : (profile?.user?.email ?? ""),
  );
  Database.onSetUniqueId(
    Database.isHost
      ? (hostProfile?.host?.uniqueId ?? "")
      : (profile?.user?.uniqueId ?? ""),
  );
  Database.onSetUserProfileImage(
    Database.isHost
      ? (hostProfile?.host?.image ?? "")
      : (profile?.user?.image ?? ""),
  );
  Database.onSetUserName(
    Database.isHost
      ? (hostProfile?.host?.name ?? "")
      : (profile?.user?.name ?? ""),
  );
  Database.onSetCoin(
    Database.isHost
      ? (hostProfile?.host?.coin ?? 0)
      : (profile?.user?.coin ?? 0),
  );
  Database.onSetImpression(hostProfile?.host?.impression ?? []);
}

// ─── Main Hook ───────────────────────────────────────────────────────────────
export function useLoginController(onSuccess?: () => void) {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eulaAccepted, setEulaAccepted] = useState(false);
  const { setAuthSteps,setSignupData ,secret_key} = useAuth();


  // ── Shared: complete login after Firebase auth ───────────────────────────
  async function completeLoginFlow(
    uid: string,
    token: string,
    loginType: number,
    userData: { email: string; name: string; image: string },
    isNewUser: boolean,
  ) {
    const deviceUuid = Database.identity as string;

    // Step 1: Login API
    const loginModel = await apiCall(
      "/api/client/user/signInOrSignUpUser",
      {
        loginType,
        identity: deviceUuid,
        fcmToken: "", // web has no FCM, send empty
        email: userData.email,
        name: isNewUser ? userData.name : "",
        image: isNewUser ? userData.image : "",
        uid,
        country: "",
        countryFlagImage: "",
      },
      token,
      secret_key,
    );

    console.log("loginModel =>", loginModel);

    if (loginModel?.status !== true) {
      setError(loginModel?.message ?? "Login failed");
      setLoading(false);
      return;
    }
    

    // Step 2: Fetch full user profile
    const profileModel = await apiGet(
      `/api/client/user/fetchFirebaseUidByDevice?deviceUuid=${deviceUuid}&loginType=${loginType}`,
      token,
    secret_key
    );

    console.log("profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",loginModel)
    store.dispatch(setUser(profileModel.user))



    // Step 3: Fetch host profile if needed
    let hostProfile = null;
    if (loginModel.user.isHost) {
      hostProfile = await apiGet(
        `/api/client/host/getHostProfile?hostId=${Database.hostId}`,
        token,
        secret_key
      );
      Database.onSetHostProfile = hostProfile;
      store.dispatch(setUser(hostProfile.user))
    }

    // Step 4: Save to database
    Database.onSetToken(token);
    Database.onSetLogin(true);
    Database.onSetIdentity(deviceUuid)
    Database.onSetFirebaseUid(profileModel?.firebaseUid)
    Database.onSetIsHost(loginModel?.user?.isHost)
    Database.onSetHostId(loginModel?.user?.hostId)
    Database.onSetLoginType(profileModel?.user?.loginType)
    saveToDatabase(profileModel, hostProfile);

    console.log("Login Complete ✓");
    console.log("userId:", profileModel?.user?.id);
    console.log("loginType:", profileModel?.user?.loginType);
    console.log("isVip:", profileModel?.user?.isVip);
    console.log("coin:", profileModel?.user?.coin);

    setLoading(false);

    // Step 5: Navigate
    // loginModel.signUp == true → new user → fill profile
    if (loginModel?.signUp === true) {
      // router.push(
      //     `/fill-profile?email=${encodeURIComponent(Database.email)}&name=${encodeURIComponent(Database.userName)}&image=${encodeURIComponent(Database.profileImage)}&loginType=${Database.loginType}`
      // );
      setAuthSteps("signup");
      setSignupData(loginModel)
    } else {
      Database.onSetProfile(true);
      onSuccess?.();
      setAuthSteps("closed");
      // Database.isHost ? router.push("/host-dashboard") : router.push("/dashboard");
    }
  }

  // ── Anonymous / Quick Login (loginType = 3) ──────────────────────────────
  async function onQuickLogin() {
    if (!eulaAccepted) {
      setError("Please accept the terms and conditions to continue");
      return;
    }

    setLoading(true);
    setError(null);

    const deviceUuid = Database.identity as string;
    console.log("Device UUID =>", deviceUuid);

    try {
      // Step 1: Check if device already exists on server
      const deviceCheckRes = await fetch(
        `${Base_URL}/api/client/user/fetchFirebaseUidByDevice?deviceUuid=${deviceUuid}&loginType=3`,
      );
      const deviceCheckModel = await deviceCheckRes.json();

      console.log("deviceCheck =>", deviceCheckModel);

      if (deviceCheckModel?.status === true) {
        // ── EXISTING USER ──────────────────────────────────────────
        console.log("Existing device found!");
        console.log("Firebase UID =>", deviceCheckModel?.firebaseUid);

        // Step 2: Get custom token from server
        const customTokenRes = await fetch(
          `${Base_URL}/api/client/user/getFirebaseCustomToken?firebaseUid=${deviceCheckModel?.firebaseUid}`,
        );
        const customTokenModel = await customTokenRes.json();

        if (customTokenModel?.status !== true) {
          setError("Failed to get custom token");
          setLoading(false);
          return;
        }

        // Step 3: Sign in with custom token → same Firebase user restored
        const userCredential = await signInWithCustomToken(
          auth,
          customTokenModel?.customToken,
        );
        console.log(
          "Signed in with existing Firebase UID:",
          userCredential.user.uid,
        );

        const uid = userCredential.user.uid;
        const token = await userCredential.user.getIdToken();

        await completeLoginFlow(
          uid,
          token,
          3,
          { email: deviceUuid, name: "", image: "" },
          false,
        );
      } else {
        // ── NEW USER ───────────────────────────────────────────────
        console.log("New device - creating anonymous Firebase user");

        // Step 1: Anonymous Firebase sign in
        const userCredential = await signInAnonymously(auth);
        const uid = userCredential.user.uid;
        const token = await userCredential.user.getIdToken();

        console.log("New Firebase UID =>", uid);

        await completeLoginFlow(
          uid,
          token,
          3,
          {
            email: deviceUuid,
            name: randomItem(RANDOM_NAMES),
            image: randomItem(RANDOM_IMAGES),
          },
          true,
        );
      }
    } catch (err: unknown) {
      console.error("Quick login error:", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  }

  // ── Google Login (loginType = 1) ─────────────────────────────────────────
  async function onGoogleLogin() {
    if (!eulaAccepted) {
      setError("Please accept the terms and conditions to continue");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

      const userCredential = await signInWithPopup(auth, provider);

      if (!userCredential) {
        setError("Google Sign-in cancelled");
        setLoading(false);
        return;
      }

      const email = userCredential.user.email ?? "";
      const name = userCredential.user.displayName ?? "";
      const image = userCredential.user.photoURL ?? "";

      console.log("Google Login =>", email, name, image);

      if (!email || !name) {
        setError("Google account did not provide email or name!");
        setLoading(false);
        return;
      }

      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      await completeLoginFlow(uid, token, 1, { email, name, image }, true);
    } catch (err: unknown) {
      console.error("Google login error:", err);
      setError("Google Sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    eulaAccepted,
    setEulaAccepted,
    onQuickLogin,
    onGoogleLogin,
  };
}
