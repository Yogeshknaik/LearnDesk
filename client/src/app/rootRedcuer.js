import { authApi } from "@/features/api/authApi";
import { learningFormApi } from "@/features/api/learningFormApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [learningFormApi.reducerPath]: learningFormApi.reducer,
  auth: authReducer,
});
export default rootRedcuer;
