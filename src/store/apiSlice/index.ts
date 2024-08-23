import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppointmentData } from "@/store/types";
import { API } from "@/configs/global-config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),
  endpoints: (builder) => ({
    getHistory: builder.query<
      AppointmentData[],
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `history?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetHistoryQuery, useLazyGetHistoryQuery } = apiSlice;
