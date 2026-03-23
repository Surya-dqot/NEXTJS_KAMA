"use client";

import { useAuth } from "@/context/AuthContext";
import { setError, setLoading, setUser } from "@/redux/features/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGet } from "./useLoginController";
import { RootState } from "@/redux/store";
import { Database } from "@/utils/Database";

export function useInitAuth() {
  const dispatch = useDispatch();
  const { setAuthSteps, setSignupData, secret_key } = useAuth();
  const user = useSelector((state:RootState) => state.user);
  const loginType = localStorage.getItem("loginType");
  const deviceUuid = localStorage.getItem("device_uuid");
  useEffect(() => {
    const init = async () => {
      if (user) return;

      try {
        dispatch(setLoading());
        const token = localStorage.getItem("token");
        if (!token) return;

        // const profileModel = await apiGet(
        //   `/api/client/user/fetchFirebaseUidByDevice?deviceUuid=${deviceUuid}&loginType=${loginType}`,
        //   token,
        //   secret_key,
        // );

        const profileModel = await apiGet(
          `/api/client/user/fetchFirebaseUidByDevice?deviceUuid=${deviceUuid}&loginType=${loginType}`,
          token,
          secret_key,
        );

        const result = await profileModel ;
        
        if(result?.user){
            dispatch(setUser(result.user))
            setAuthSteps('closed');


                Database.onSetToken(token);
                Database.onSetLogin(true);
                Database.onSetIdentity(deviceUuid)
                Database.onSetFirebaseUid(profileModel?.firebaseUid)
                Database.onSetIsHost(profileModel?.user?.isHost)
                Database.onSetHostId(profileModel?.user?.hostId)
                Database.onSetLoginType(profileModel?.user?.loginType)
                // saveToDatabase(profileModel);

        }else{
            dispatch(setError("No User found"))
        }

      } catch (error: unknown) {
        console.error("Error came in useInitAuth", error);
        dispatch(setError("Init failed"));
      }
    };
  }, []);
}
