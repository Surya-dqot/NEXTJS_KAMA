import { HostProfile } from "@/types/auth";

export const Database = {

    get identity(): unknown {
        if (typeof window == "undefined") return "";
        let id: string  = localStorage.getItem("identity");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("identity", id)
        }
        return id;
    },
    get isLogin(): boolean { return localStorage.getItem("isLogin") === "true" },
    get isHost(): boolean { return localStorage.getItem("isHost") === "true" },
    get hostId(): string { return localStorage.getItem("hostId") ?? "" },
    get loginUserId(): string { return localStorage.getItem("loginUserId") ?? "" },
    get isVip(): boolean { return localStorage.getItem("isVip") === "true"; },
    get email(): string { return localStorage.getItem("email") ?? ""; },
    get uniqueId(): string { return localStorage.getItem("uniqueId") ?? ""; },
    get profileImage(): string { return localStorage.getItem("profileImage") ?? ""; },
    get userName(): string { return localStorage.getItem("userName") ?? ""; },
    get coin(): number { return Number(localStorage.getItem("coin") ?? 0); },
    get country(): string { return localStorage.getItem("country") ?? ""; },
    get countryCode(): string { return localStorage.getItem("countryCode") ?? "IN"; },
    get hasProfile(): boolean { return localStorage.getItem("hasProfile") === "true"; },
    get hostProfile(): HostProfile {
        const data = localStorage.getItem("hostProfile");
        return data ? JSON.parse(data) : null;
    },
    get loginType():number{
        return Number(localStorage.getItem("loginType")?? 0);
    },
    get firebaseUid():string{
        return localStorage.getItem("firebaseUid")??""
    },


    onSetLogin: (v: boolean) => localStorage.setItem("isLogin", String(v)),
    onSetToken :(v:string)=>localStorage.setItem("token",v),
    onSetProfile: (v: boolean) => localStorage.setItem("hasProfile", String(v)),
    onSetLoginUserId: (v: string) => localStorage.setItem("loginUserId", v),
    onSetLoginType: (v: number) => localStorage.setItem("loginType", String(v)),
    onSetVip: (v: boolean) => localStorage.setItem("isVip", String(v)),
    onSetEmail: (v: string) => localStorage.setItem("email", v),
    onSetUniqueId: (v: string) => localStorage.setItem("uniqueId", v),
    onSetUserProfileImage: (v: string) => localStorage.setItem("profileImage", v),
    onSetUserName: (v: string) => localStorage.setItem("userName", v),
    onSetCoin: (v: number) => localStorage.setItem("coin", String(v)),
    onSetImpression: (v: unknown[]) => localStorage.setItem("impression", JSON.stringify(v)),
    onSetHostProfile:(v:unknown) => localStorage.setItem("hostProfile",JSON.stringify(v)),
    onSetIdentity:(v:string) => localStorage.setItem("identity",v),
    onSetFirebaseUid:(v:string) => localStorage.setItem("firebaseUid",v),
    onSetIsHost:(v:string) => localStorage.setItem("isHost",v),
    onSetHostId:(v:string) => localStorage.setItem("hostId",v),
    clear: () => localStorage.clear()
}