export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

export type AuthSteps = "login" | "signup" | "closed";

export interface AuthContextType {
  authSteps: AuthSteps;
  setAuthSteps: (step: AuthSteps) => void;

  signupData:signupResponse;
  setSignupData:(data:signupResponse) => void;
  secret_key:string
}

// Base interface for shared fields (optional, but keeps code clean)
interface BaseEntity {
  _id?: string;
  name?: string;
  gender?: string;
  bio?: string;
  age?: number;
  dob?: string;
  email?: string;
  image?: string;
  country?: string;
  countryFlagImage?: string;
  ipAddress?: string;
  identity?: string;
  fcmToken?: string | null;
  uniqueId?: string;
  isBlock?: boolean;
  isOnline?: boolean;
  isBusy?: boolean;
  callId?: string | null;
  date?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UserProfile extends BaseEntity {
  selfIntro?: string;
  loginType?: number; // 1.apple 2.google 3.quick
  firebaseUid?: string;
  provider?: string;
  coin?: number;
  spentCoins?: number;
  rechargedCoins?: number;
  isVip?: boolean;
  vipPlanStartDate?: string | null;
  vipPlanEndDate?: string | null;
  vipPlanId?: string | null;
  vipPlan?: {
    validity: number;
    validityType: string;
    coin: number;
    price: number;
  };
  isHost?: boolean;
  hostId?: string | null;
  lastlogin?: string;
  uid?: string;
}

export interface HostProfile extends BaseEntity {
  userId: string | null;
  agencyId: string | null;
  impression: string[];
  language: string[];
  identityProofType: string;
  identityProof: string[];
  photoGallery: string[];
  profileVideo: string[];
  coin: number;
  video: string[];
  liveVideo: string[];
  status: number; // HOST_REQUEST_STATUS
  reason: string;
  randomCallRate: number;
  randomCallFemaleRate: number;
  randomCallMaleRate: number;
  privateCallRate: number;
  audioCallRate: number;
  chatRate: number;
  totalGifts: number;
  redeemedCoins: number;
  redeemedAmount: number;
  isFake: boolean;
  isLive: boolean;
  liveHistoryId: string | null;
  agoraUid: number;
  channel: string;
  token: string;
}

export interface UserResponse {
  status: boolean;
  message: string;
  user: UserProfile & { id: string };
}

export interface HostResponse {
  status: boolean;
  message: string;
  host: HostProfile;
}

export interface signupResponse {
  status: boolean;
  message: string;
  signUp: boolean;
  user: UserProfile | HostProfile;
}


export interface UpdateProfilePayload extends UserProfile{
    name:string,
    bio?:string,
    dob?:string,
    country?:string,
    countryFlagImage?:string,
}