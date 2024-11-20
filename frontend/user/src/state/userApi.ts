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

export interface getProductById {
  _id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
}

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "userApi",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getAllProducts: build.query<getProduct[], void>({
      query: () => "/auth/getAllProducts",
      providesTags: ["Products"],
    }),
    getProductById: build.query<getProductById, string>({
      query: (id) => `/auth/getProduct/${id}`,
      providesTags: ["Products"],
    }),
  }),
});

// Export hooks for API endpoints
export const { useGetAllProductsQuery, useGetProductByIdQuery } = userApi;
