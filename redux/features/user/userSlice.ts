import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user:unknown;
    loading:boolean;
    error: string | null;
}

const initialState:UserState = {
    user:null,
    loading:false,
    error:null
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        //user data store
        setUser(state,action:PayloadAction<unknown>){
            state.user = action.payload
            state.loading = false;
            state.error = null
        },

        //loading
        setLoading(state){
            state.loading = true
        },

        //error
        setError(state,action:PayloadAction<string>){
            state.error = action.payload 
            state.loading = false;
        },

        clearUser(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    }
})

export const {setUser,setLoading, setError , clearUser} = userSlice.actions ;
export default userSlice.reducer ;