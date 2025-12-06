import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api.js"; // centralized axios instance

const initialState = {
  isLoading: false,
  addressList: [],
};

// Add a new address
export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (formData) => {
    const response = await API.post("/shop/address/add", formData);
    return response.data;
  }
);

// Fetch all addresses for a user
export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId) => {
    const response = await API.get(`/shop/address/get/${userId}`);
    return response.data;
  }
);

// Edit an address
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await API.put(
      `/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

// Delete an address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await API.delete(
      `/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add new address
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally push the new address to addressList
        if (action.payload.data) state.addressList.push(action.payload.data);
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch all addresses
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      // Edit and delete can also have loading states if needed
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the edited address in the list
        const index = state.addressList.findIndex(
          (addr) => addr._id === action.payload.data._id
        );
        if (index !== -1) state.addressList[index] = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = state.addressList.filter(
          (addr) => addr._id !== action.meta.arg.addressId
        );
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
