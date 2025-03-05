import { configureStore } from "@reduxjs/toolkit";
import { membersApiSlice } from "./api-slice/membersApiSlice";
import membersSlice from './slice/membersSlice'

const store = configureStore({
  reducer: {
    [membersApiSlice.reducerPath]: membersApiSlice.reducer,
    membersData: membersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(membersApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
