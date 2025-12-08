import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../types/types";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://dummytest.com/products");
  return (await res.json()) as Products[];
});

interface ProductState {
  items: Products[];
  search: string;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  items: [],
  search: "",
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSearch } = productSlice.actions;
export default productSlice.reducer;
