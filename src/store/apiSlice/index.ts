import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppointmentData } from "@/store/types";
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
  }),
});

export const {
  useGetHistoryQuery,
  useLazyGetHistoryQuery,
  useGetHistoryByIdQuery,
} = apiSlice;
