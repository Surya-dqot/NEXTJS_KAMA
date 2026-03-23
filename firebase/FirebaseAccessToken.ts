import {auth} from "@/lib/firebase";

export class FirebaseAccessToken {
    static async onGet(): Promise<string | null>{
        try{
            return await auth.currentUser?.getIdToken() ?? null;
        }catch(err){
            console.log(err);
            return null;
        }
    }
}