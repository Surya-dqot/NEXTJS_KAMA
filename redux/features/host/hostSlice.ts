import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HostState {
  hosts: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: HostState = {
  hosts: [],
  loading: false,
  error: null,
};

const hostSlice = createSlice({
  name: "hosts",
  initialState,
  reducers: {
    setHosts(state, action: PayloadAction<unknown[]>) {
      state.hosts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setHosts, setError, setLoading } = hostSlice.actions;
export default hostSlice.reducer;
