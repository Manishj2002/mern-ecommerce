import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "@/api.js"; // centralized Axios instance

const initialState = {
  isLoading: false,
  searchResults: [],
};

// Fetch search results
export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  async (keyword) => {
    const response = await API.get(`/shop/search/${keyword}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
