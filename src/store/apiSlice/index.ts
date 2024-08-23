import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppointmentData, ProfileData } from "@/store/types";
import { API } from "@/configs/global-config";
import { RootState } from "..";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getHistory: builder.query<
      AppointmentData[],
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "history",
        params: { page, limit },
      }),
    }),
    getHistoryById: builder.query<AppointmentData, string>({
      query: (id) => `history/${id}`,
    }),
    //get user by idfirebase because i cant put custom id in mockapi.io
    getProfileById: builder.query<ProfileData[], string>({
      query: (id) => `profile?idfirebase${id}`,
      providesTags: ["Profile"],
    }),
    createProfile: builder.mutation<ProfileData, Partial<ProfileData>>({
      query: (profile) => ({
        url: "profile",
        method: "POST",
        body: profile,
      }),
    }),
    updateProfile: builder.mutation<
      ProfileData,
      { id: string; profileData: Partial<ProfileData> }
    >({
      query: ({ id, profileData }) => ({
        url: `profile/${id}`,
        method: "PUT",
        body: profileData,
      }),
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: `profile/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useLazyGetHistoryQuery,
  useGetHistoryByIdQuery,
  useGetProfileByIdQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = apiSlice;
