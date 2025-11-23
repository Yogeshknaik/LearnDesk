import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/config/constants";

const LEARNING_FORM_API = API_ENDPOINTS.LEARNING_FORM;

export const learningFormApi = createApi({
  reducerPath: "learningFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LEARNING_FORM_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLearningForm: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
    }),

    getMyLearningForms: builder.query({
      query: () => "/my",
    }),
    // Admin endpoints
    getLearningForms: builder.query({
      query: () => "/all",
    }),
    getLearningFormStats: builder.query({
      query: () => "/stats",
    }),
    getEmployeeFormsByEmployeeId: builder.query({
      query: (employeeId) => `/employee/${employeeId}`,
    }),
    getTopLearnersOfMonth: builder.query({
      query: () => "/top-month",
    }),
    getTopLearnersOfWeek: builder.query({
      query: () => "/top-week",
    }),
  }),
});

export const {
  useCreateLearningFormMutation,
  useGetTopLearnersQuery,
  useGetMyLearningFormsQuery,
  // Admin hooks
  useGetLearningFormsQuery,
  useGetLearningFormStatsQuery,
  useGetEmployeeFormsByEmployeeIdQuery,
  useGetTopLearnersOfMonthQuery,
  useGetTopLearnersOfWeekQuery,
} = learningFormApi;
