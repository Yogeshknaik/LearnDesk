import { authApi } from "@/features/api/authApi";
import { learningFormApi } from "@/features/api/learningFormApi";
import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      learningFormApi.middleware
    ),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
