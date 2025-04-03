import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    cartInfo: null,
    wishListInfo: null

}
console.log(localStorage.getItem("token"));
export const addProductToCart = createAsyncThunk(
    "cart/addProduct",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            let { data } = await axios.request(options);
            console.log("Response Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getProductToCart = createAsyncThunk(
    "cart/getProduct",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                },

            }
            let { data } = await axios.request(options);
            console.log("Response Get Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }
    }

)
export const removeProductFromCart = createAsyncThunk(
    "cart/removeProduct",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token
                },

            }
            let { data } = await axios.request(options);
            console.log("Response Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }

    }
)
export const clearProductFromCart = createAsyncThunk(
    "cart/clearProduct",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/`,
                method: "DELETE",
                headers: {
                    token
                },

            }
            let { data } = await axios.request(options);
            console.log("Response Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }

    }
)
export const addProductToWishlist = createAsyncThunk(
    "wishlist/addWishlist",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            let { data } = await axios.request(options);
            console.log("Response Wishlist Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getProductToWishlist = createAsyncThunk(
    "wishlist/getProduct",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers: {
                    token
                },

            }
            let { data } = await axios.request(options);
            console.log("Response Get Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }
    }

)
export const removeProductFromWishlist = createAsyncThunk(
    "Wishlist/removeProduct",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: "DELETE",
                headers: {
                    token
                },

            }
            let { data } = await axios.request(options);
            console.log("Response Data:", data);
            return data;

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response.data);
        }

    }
)
const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addProductToCart.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
                console.log("Updated Cart Items:", state.cartItems);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        builder.addCase(getProductToCart.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(getProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartInfo = action.payload;
            })
            .addCase(getProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });





        builder.addCase(removeProductFromCart.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartInfo = action.payload;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        builder.addCase(clearProductFromCart.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(clearProductFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartInfo = action.payload;
            })
            .addCase(clearProductFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder.addCase(addProductToWishlist.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishListInfo = action.payload;
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder.addCase(getProductToWishlist.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(getProductToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishListInfo = action.payload;
        })
        .addCase(getProductToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(removeProductFromWishlist.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
            state.loading = false;
            if (state.wishListInfo?.data) {
                state.wishListInfo.data = state.wishListInfo.data.filter(
                    (product) => product._id !== action.meta.arg.productId
                );
            }
        })
        .addCase(removeProductFromWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
})
export default cartSlice.reducer;
