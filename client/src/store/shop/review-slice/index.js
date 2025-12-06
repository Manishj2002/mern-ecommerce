import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/utils/api"; // centralized Axios instance

const initialState = {
  isLoading: false,
  reviews: [],
};

// Add a new review
export const addReview = createAsyncThunk(
  "review/addReview",
  async (formData) => {
    const response = await API.post("/shop/review/add", formData);
    return response.data;
  }
);

// Get reviews for a product
export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (id) => {
    const response = await API.get(`/shop/review/${id}`);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getReviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      // addReview
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
