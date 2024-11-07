import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

export interface Product {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
}

export interface NewProduct {
  farmerId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  unit: string;
  image: ImageBuffer;
}

export const farmerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "farmerApi",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    //   getDashboardMetrics: build.query<DashboardMetrics, void>({
    //     query: () => "/dashboard",
    //     providesTags: ["DashboardMetrics"],
    //   }),
    //   getProduct: build.query<Product[], string | void>({
    //     query: (search) => ({
    //       url: "/products",
    //       params: search ? { search } : {},
    //     }),
    //     providesTags: ["Products"],
    //   }),
    listProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/auth/listproduct",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    //   getUsers: build.query<User[], void>({
    //     query: () => "/users",
    //     providesTags: ["Users"],
    //   }),
    //   getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
    //     query: () => "/expenses",
    //     providesTags: ["Expenses"],
    //   }),
  }),
});

export const {
  // useGetDashboardMetricsQuery,
  // useGetProductQuery,
  useListProductMutation,
  // useGetUsersQuery,
  // useGetExpensesByCategoryQuery,
} = farmerApi;
