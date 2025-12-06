import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "@/api.js"; // centralized axios instance

const initialState = {
  isLoading: false,
  productList: [],
};

// Add a new product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async (formData) => {
    const result = await API.post("/admin/products/add", formData, {
      headers: { "Content-Type": "application/json" },
    });
    return result?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async () => {
    const result = await API.get("/admin/products/get");
    return result?.data;
  }
);

// Edit a product
export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",
  async ({ id, formData }) => {
    const result = await API.put(`/admin/products/edit/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return result?.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    const result = await API.delete(`/admin/products/delete/${id}`);
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
