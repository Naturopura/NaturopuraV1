import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

export interface getProduct {
  _id: string;
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
}

export const farmerApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "farmerApi",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getProducts: build.query<getProduct[], void>({
      query: () => "/auth/getProduct",
      providesTags: ["Products"],
    }),
  }),
});

// Export hooks for API endpoints
export const { useGetProductsQuery } = farmerApi;
