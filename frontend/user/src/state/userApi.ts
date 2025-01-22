import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  _id: string;
  name: string;
  image: string;
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
  image: string;
}

export interface getProductById {
  _id: string;
  farmerId: string;
  name: string;
  category: Category;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  unit: string;
  image: string;
}

export interface getProductByIdResponse {
  success: boolean;
  message: string;
  data: getProductById;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface getProductsByCategoryAndPaginationRequest {
  categoryId: string;
  page: number;
  limit: number;
}

export type getProductsByCategoryAndPaginationResponse = {
  success: boolean;
  message: string;
  data: {
    products: getProduct[];
    pagination: {
      totalProducts: number;
      currentPage: number;
      totalPages: number;
      limit: number;
    };
  };
};

export interface searchFilterAndSortProductsRequest {
  query?: string;
  page?: number;
  limit?: number;
  categories?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface searchFilterAndSortProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: getProduct[];
    pagination: {
      totalProducts: number;
      currentPage: number;
      totalPages: number;
      limit: number;
    };
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
      transformResponse: (response: getProductByIdResponse) => response.data,
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
    searchFilterAndSortProducts: build.query<
      searchFilterAndSortProductsResponse,
      searchFilterAndSortProductsRequest
    >({
      query: (params) => {
        const { categories, ...otherParams } = params;
        console.log("Params: ", params);

        // Ensure category is correctly serialized if it's an array
        const queryParams = {
          ...otherParams,
          ...(categories
            ? {
                category: Array.isArray(categories)
                  ? categories.join(",")
                  : categories,
              }
            : {}),
        };
        console.log("Query Params: ", queryParams);

        return {
          url: "/auth/search",
          params: queryParams,
        };
      },
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetCategoryQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useLazySearchFilterAndSortProductsQuery,
} = userApi;
