import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types/ProductType";
import * as productsAPI from "../../services/productServices";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async ({
    page = 1,
    limit = 10,
    sortBy = "",
    sortOrder = "asc",
  }: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => {
    const response = await productsAPI.fetchProducts(
      page,
      limit,
      sortBy,
      sortOrder
    );
    return response;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const response = await productsAPI.fetchProductById(id);
    return response;
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (product: Product) => {
    const response = await productsAPI.createProduct(product);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({ product, id }: { product: Product; id: number }) => {
    const response = await productsAPI.updateProduct(product, id);
    return response;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await productsAPI.deleteProduct(id);
    return id;
  }
);

const initialState: ProductState = {
  productList: [],
  product: null,
  state: "idle",
  errorMsg: null,
  totalPages: 0,
  currentPage: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProductsAsync.pending, (state) => {
        state.state = "loading";
        state.errorMsg = null;
        state.productList = [];
        state.totalPages = 0;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.productList = action.payload.data.products;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.page;
        state.totalItems = action.payload.data.totalProducts;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.state = "failed";
        state.errorMsg = action.error.message || "Failed to fetch products";
      })
      // Fetch Product by ID
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.state = "loading";
        state.errorMsg = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.productList = action.payload.data.products;
        state.totalPages = 0;
        state.currentPage = 1;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.state = "failed";
        state.errorMsg = action.error.message || "Failed to fetch product";
      })
      // Create Product
      .addCase(createProductAsync.pending, (state) => {
        state.state = "loading";
        state.errorMsg = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.productList.push(action.payload.data);
        state.product = action.payload.data;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.state = "failed";
        state.errorMsg = action.error.message || "Failed to create product";
      })
      // Update Product
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.productList.findIndex(
          (item) => item.id === action.payload.data.id
        );
        if (index !== -1) {
          state.productList[index] = action.payload.data;
        }
      })
      // Delete Product
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;
