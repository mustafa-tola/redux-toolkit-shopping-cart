import { createSlice } from "@reduxjs/toolkit";
import { IndexKind } from "typescript";
import shoes from "../shoes.json"

export const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        products: JSON.parse(localStorage.getItem('products')) || [],
        total: JSON.parse(localStorage.getItem('total')) || 0,
    },
    reducers: {
        addToCart: (state, action) => {
            var addedItem;
            let index;
            Object.entries(shoes).map((shoe, i) => {
                if (shoe[0] === action.payload) {
                    addedItem = shoe[1];
                }
            });
            let existedItem = false;
            state.products.map((shoe, i) => {
                if (shoe.id === action.payload) {
                    existedItem = true;
                }
            });
            if (existedItem) {
                state.products.map((shoe, i) => {
                    if (shoe.id === action.payload) {
                        // shoe.quantity += 1;
                        // shoe.changedPrice = shoe.quantity * addedItem.price;
                        addedItem = shoe;
                        index = i;
                    }
                });
                addedItem = {
                    ...addedItem,
                    quantity: addedItem.quantity + 1,
                    changedPrice: (addedItem.quantity + 1) * addedItem.price
                }
                let total = state.total + addedItem.price;
                let products = [...state.products];
                products[index] = addedItem;
                localStorage.setItem('products', JSON.stringify(products));
                localStorage.setItem('total', JSON.stringify(total));
                return {
                    ...state,
                    products,
                    total,
                }
            } else {
                addedItem = {
                    ...addedItem,
                    quantity: 1,
                    changedPrice: (addedItem.quantity + 1) * addedItem.price
                }
                addedItem.quantity = 1;
                addedItem.changedPrice = addedItem.quantity * addedItem.price;
                let data = [...state.products, addedItem];
                let total = state.total + addedItem.price;
                localStorage.setItem('products', JSON.stringify(data));
                localStorage.setItem('total', JSON.stringify(total));
                return {
                    ...state,
                    products: data,
                    total,
                }
            }
        },
        removeFromCart: (state, action) => {
            let removedItem;
            state.products.map(shoe => {
                if (shoe.id === action.payload) {
                    removedItem = shoe
                }
                return removedItem;
            })
            let newCartData = state.products.filter(shoe => action.payload !== shoe.id);
            let total = state.total - removedItem.changedPrice;
            // console.log(removedItem.quantity);
            localStorage.setItem('products', JSON.stringify(newCartData));
            localStorage.setItem('total', JSON.stringify(total));
            if (state.products.length === 1) {
                localStorage.setItem('products', JSON.stringify([]));
                localStorage.setItem('total', JSON.stringify(0));
                return {
                    ...state,
                    products: [],
                    total: 0,
                }
            } else {
                return {
                    ...state,
                    products: newCartData,
                    total,
                }
            }
        },
        addQuantity: (state, action) => {
            let addedItem;
            let index;
            state.products.map((shoe, i) => {
                if (shoe.id === action.payload) {
                    addedItem = shoe;
                    index = i;
                }
                return addedItem;
            });
            let total = state.total + addedItem.price;
            addedItem = {
                ...addedItem,
                quantity: addedItem.quantity + 1,
                changedPrice: (addedItem.quantity + 1) * addedItem.price
            }
            let products = [...state.products];
            products[index] = addedItem;
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('total', JSON.stringify(total));
            return {
                ...state,
                products,
                total,
            }
        },
        subtractQuantity: (state, action) => {
            let addedItem;
            let index;
            state.products.map((shoe, i) => {
                if (shoe.id === action.payload) {
                    addedItem = shoe
                    index = i
                }
                return addedItem;
            });
            if (addedItem.quantity === 1) {
                let newCartData = state.products.filter(shoe => shoe.id !== action.payload);
                let total = state.total - addedItem.changedPrice;
                localStorage.setItem('products', JSON.stringify(newCartData));
                localStorage.setItem('total', JSON.stringify(total));
                return {
                    ...state,
                    products: newCartData,
                    total,
                }
            } else {
                addedItem = {...addedItem, quantity: addedItem.quantity - 1, changedPrice: (addedItem.quantity - 1) * addedItem.price };
                let products = [...state.products];
                products[index] = addedItem;
                let total = state.total - addedItem.price
                localStorage.setItem('products', JSON.stringify(products));
                localStorage.setItem('total', JSON.stringify(total));
                return {
                    ...state,
                    products,
                    total,
                }
            }
        }
    }
})



export const { addToCart, removeFromCart, addQuantity, subtractQuantity } = cartSlice.actions;
export default cartSlice.reducer;