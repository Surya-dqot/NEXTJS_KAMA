import {auth} from "@/lib/firebase";

export class FirebaseUid {
    static onGet():string | null {
        return auth.currentUser?.uid ?? null;   
    }
} 