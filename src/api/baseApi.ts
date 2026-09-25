import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product";
import type { Order, PickupPoint } from "../types/order";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Product", "Rating", "Order", "PickupPoint"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product" as const, id }],
    }),
    getPickupPoints: builder.query<PickupPoint[], void>({
      query: () => "/pickupPoints",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "PickupPoint" as const, id })),
              { type: "PickupPoint" as const, id: "LIST" },
            ]
          : [{ type: "PickupPoint" as const, id: "LIST" }],
    }),
    getOrders: builder.query<Order[], { userId: string | null }>({
      query: ({ userId }) => (userId ? `/orders?userId=${userId}` : "/orders"),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order" as const, id: "LIST" },
            ]
          : [{ type: "Order" as const, id: "LIST" }],
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: [{ type: "Order" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetPickupPointsQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
} = baseApi;
