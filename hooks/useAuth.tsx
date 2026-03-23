import { fetchHostsList, updateUserProfile } from "@/services/auth.service";
import { UpdateProfilePayload } from "@/types/auth";
import { store } from "@/redux/store";
import { setLoading, setHosts } from "@/redux/features/host/hostSlice";

// update profile 
export function updateUserProfileHandler(
  token: string,
  secret_key: string,
  headers?: object,
) {
  const handleUpdateProfile = async (data: UpdateProfilePayload) => {
    try {
      console.log("Calling Update API");
      const res = await updateUserProfile(data, token, secret_key, headers);
      console.log("Response", res);
      return res;
    } catch (error: unknown) {
      console.error("Error :", error);
      throw error;
    }
  };

  return {
    handleUpdateProfile,
  };
}

// fetch hosts lists for user
export function fetchHostsListHandler(
  token: string,
  secret_key: string,
  headers?: object,
  country?: string,
) {
  const handleFetchHostsList = async (data?: UpdateProfilePayload) => {
    try {
      store.dispatch(setLoading());

      const isHost = localStorage.getItem("isHost");
      const hostId = localStorage.getItem("hostId");
      
      if (isHost) {
        console.log("FETCH HOST API FOR HOSTS");
        const res = await fetchHostsList(
          data,
          token,
          secret_key,
          headers,
          country,
          hostId,
        );
        console.log("Response CAME ON fetch hosts list", res);
        store.dispatch(setHosts(res?.data || res));
        return res;
      } else {
        console.log("FETCH HOST API FOR HOSTS");
        const res = await fetchHostsList(
          data,
          token,
          secret_key,
          headers,
          country,
          hostId,
        );
        console.log("Response CAME ON fetch hosts list", res);
        store.dispatch(setHosts(res?.data || res));
        return res;
      }
    } catch (error: unknown) {
      console.error("Error :", error);
      throw error;
    }
  };

  return {
    handleFetchHostsList,
  };
}
