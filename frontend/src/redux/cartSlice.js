
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, token }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:8088/add-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Khởi tạo slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export actions và reducer
export default cartSlice.reducer;
export const { } = cartSlice.actions;

