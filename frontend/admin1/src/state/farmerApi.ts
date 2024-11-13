import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the ImageBuffer type
type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

// Define Product and NewProduct interfaces
export interface Product {
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

export interface NewProduct {
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

export interface UpdateProduct {
  _id: string;
  id: string;
  name: string;
  category: string;
  price: number;
  // currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
}

// Configure API with token handling in baseQuery
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
    listProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/auth/listproduct",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: build.query<getProduct[], void>({
      query: () => "/auth/getProduct",
      providesTags: ["Products"],
    }),
    updateProduct: build.mutation<Product, UpdateProduct>({
      query: (updateProduct) => ({
        url: "/auth/updateProduct",
        method: "PUT",
        body: updateProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useListProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} = farmerApi;
