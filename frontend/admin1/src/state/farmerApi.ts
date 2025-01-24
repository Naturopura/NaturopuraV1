import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ListProductRequest {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  unit: string;
  image: File | null;
  currency: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  farmerId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  image: string;
  currency: string;
}

export interface ListProductResponse {
  message: string;
  product: Product;
  category: Category;
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

export interface getProductsByCategoryAndPaginationRequest {
  page: number;
  limit: number;
  categoryId?: string;
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

export interface UpdateProductRequest {
  _id: string;
  name: string;
  category: Category;
  price: number | undefined;
  quantity: number | undefined;
  description: string;
  image: File | null;
  unit: string;
  currency: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface DeleteProductRequest {
  productId: string;
}

export interface DeleteProductResponse {
  message: string;
  deletedProduct: Product;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface ProductsResponse {
  products: getProduct[];
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
  tagTypes: ["Products"],
  endpoints: (build) => ({
    // createCategory: build.mutation<CreateCategory, CreateCategory>({
    //   query: (createCategory) => ({
    //     url: "/auth/createCategory",
    //     method: "POST",
    //     body: createCategory,
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
    getCategory: build.query<CategoriesResponse, void>({
      query: () => "/auth/getCategory",
      providesTags: ["Products"],
    }),
    listProduct: build.mutation<ListProductResponse, ListProductRequest>({
      query: (newProduct) => {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("category", newProduct.category);
        formData.append("price", newProduct.price.toString());
        formData.append("quantity", newProduct.quantity.toString());
        formData.append("description", newProduct.description);
        formData.append("unit", newProduct.unit);
        formData.append("currency", newProduct.currency);
        formData.append("image", newProduct.image!);
        return {
          url: "/auth/listproduct",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: ListProductResponse) => response,
      invalidatesTags: ["Products"],
    }),
    listProducts: build.query<ListProductResponse, void>({
      query: () => "/auth/listproduct",
      providesTags: ["Products"],
    }),
    getProducts: build.query<getProduct[], void>({
      query: () => "/auth/getProduct",
      providesTags: ["Products"],
    }),
    getProductsByCategoryAndPagination: build.query<
      getProductsByCategoryAndPaginationResponse,
      getProductsByCategoryAndPaginationRequest
    >({
      query: ({ page = 1, limit = 10, categoryId }) => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (categoryId) queryParams.append("categoryId", categoryId);

        return `/auth/getProductsByCategoryAndPagination?${queryParams.toString()}`;
      },
    }),
    getProductsByCategory: build.query<getProduct[], string>({
      query: (categoryId) => ({
        url: `/auth/getProductsByCategory`,
        params: { categoryId },
      }),
    }),
    updateProduct: build.mutation<UpdateProductResponse, UpdateProductRequest>({
      query: (updateProduct) => {
        const formData = new FormData();
        formData.append("_id", updateProduct._id);
        formData.append("name", updateProduct.name);
        formData.append("category", updateProduct.category._id);
        formData.append("price", (updateProduct.price ?? 0).toString());
        formData.append("quantity", (updateProduct.quantity ?? 0).toString());
        formData.append("description", updateProduct.description);
        formData.append("unit", updateProduct.unit);
        formData.append("currency", updateProduct.currency);
        // ✅ Only append image if it's a File (not null)
        if (updateProduct.image instanceof File) {
          formData.append("image", updateProduct.image);
        }
        return {
          url: "/auth/updateProduct",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<DeleteProductResponse, DeleteProductRequest>({
      query: (deleteProduct) => ({
        url: "/auth/deleteProduct",
        method: "DELETE",
        body: deleteProduct,
      }),
      transformResponse: (response: DeleteProductResponse) => response,
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for API endpoints
export const {
  useGetCategoryQuery,
  // useCreateCategoryMutation,
  useListProductMutation,
  useListProductsQuery,
  useGetProductsQuery,
  useGetProductsByCategoryAndPaginationQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = farmerApi;
