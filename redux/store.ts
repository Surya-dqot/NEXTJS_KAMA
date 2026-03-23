import { configureStore } from "@reduxjs/toolkit";
import hostReducer from "../redux/features/host/hostSlice"
import userReducer from "../redux/features/user/userSlice"

export const store = configureStore({
    reducer:{
        hosts:hostReducer,
        user:userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;