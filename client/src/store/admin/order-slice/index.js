import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "@/api.js"; // centralized axios instance

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

// Fetch all orders (Admin)
export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrder/getAllOrdersForAdmin",
  async () => {
    const response = await API.get("/admin/orders/get");
    return response.data;
  }
);

// Fetch order details by ID (Admin)
export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrder/getOrderDetailsForAdmin",
  async (id) => {
    const response = await API.get(`/admin/orders/details/${id}`);
    return response.data;
  }
);

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await API.put(`/admin/orders/update/${id}`, { orderStatus });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrdersForAdmin
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      // getOrderDetailsForAdmin
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optional: update the orderList with new status
        const index = state.orderList.findIndex(order => order._id === action.payload.data._id);
        if (index !== -1) state.orderList[index] = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
