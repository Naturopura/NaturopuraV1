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

export interface getProductsByCategoryAndPaginationRequest {
  category: string;
  page: number;
  limit: number;
}

export type getProductsByCategoryAndPaginationResponse = {
  data: getProduct[];
  pagination: {
    total: any;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
};

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
    getProductsByCategoryAndPagination: build.query<
      getProductsByCategoryAndPaginationResponse,
      getProductsByCategoryAndPaginationRequest
    >({
      query: ({ category, page = 1, limit = 6 }) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return `/auth/getProducts?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getProductsByCategory: build.query<getProduct[], string>({
      query: (category) => `/auth/getProductsByCategory?category=${category}`, // Adjust the API endpoint if needed
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useGetProductsByCategoryQuery,
} = userApi;
