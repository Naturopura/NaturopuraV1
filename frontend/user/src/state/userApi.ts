import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

export interface Category {
  _id: string;
  name: string;
  image: ImageBuffer;
}

export interface getProduct {
  _id: string;
  farmerId: string;
  name: string;
  category: Category;
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

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}

export interface getProductsByCategoryAndPaginationRequest {
  categoryId: string;
  page: number;
  limit: number;
}

export type getProductsByCategoryAndPaginationResponse = {
  data: getProduct[];
  pagination: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
};

export interface searchProductRequest {
  query: string;
  page?: number;
  limit?: number;
}

export interface searchProductResponse {
  results: getProduct[];
  pagination: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
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
    getCategory: build.query<CategoriesResponse, void>({
      query: () => "/auth/getCategories",
      providesTags: ["Products"],
    }),
    getProductsByCategoryAndPagination: build.query<
      getProductsByCategoryAndPaginationResponse,
      getProductsByCategoryAndPaginationRequest
    >({
      query: ({ page = 1, limit = 6, categoryId }) => {
        if (!categoryId) {
          throw new Error("The 'categoryId' parameter is required.");
        }

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          categoryId, // Since categoryId is mandatory, it's always appended
        });

        return `/auth/productsByCategoryAndPagination?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    searchProducts: build.query<searchProductResponse, searchProductRequest>({
      query: ({ page = 1, limit = 6, query }) => ({
        url: "/auth/search",
        params: { query, page, limit },
      }),
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetCategoryQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useLazySearchProductsQuery,
} = userApi;
