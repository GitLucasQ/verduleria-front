import React, { useReducer } from 'react'
import axios from 'axios'

import {
    GET_CATEGORIES_PRODUCTS, GET_SELECTED_CATEGORY, GET_PROUDCTS_BY_CATEGORIES,
    GET_ALL_PRODUCTS, ADD_PRODUCT_TO_CAR, INCREASE_QUANTITY, DECREASE_QUANTITY,
    REMOVE_ITEM,
    CLEAR_CART
} from '../Types'
import ProductReducer from './ProductReducer'
import ProductContext from './ProductContext'


const ProductState = (props) => {

    const initialState = {
        categories: [],
        selectedCategory: null,
        products: [],
        shopCar: []
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)

    const getCategoriesProducts = async () => {
        try {
            const resp = await axios.get('http://localhost:2626/getCategories')
            dispatch({ type: GET_CATEGORIES_PRODUCTS, payload: resp.data })
        } catch (error) {
            console.log(error)
        }
    }

    const getSelectedCategory = (category) => {
        dispatch({ type: GET_SELECTED_CATEGORY, payload: category })
    }

    const getProductsByCategories = async (category) => {
        try {
            const resp = await axios.get('http://localhost:2626/getProductByCategory/' + category)
            dispatch({ type: GET_PROUDCTS_BY_CATEGORIES, payload: resp.data })
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProducts = async () => {
        try {
            const resp = await axios.get('http://localhost:2626/getAllProducts')
            dispatch({ type: GET_ALL_PRODUCTS, payload: resp.data })
        } catch (error) {
            console.log(error)
        }
    }

    const addProductToCar = (selectedPoduct) => {
        dispatch({ type: ADD_PRODUCT_TO_CAR, payload: selectedPoduct })
    }

    const increaseQuantity = (selectedPoduct) => {
        const stock = state.shopCar[state.shopCar.findIndex(item => item.id_producto === selectedPoduct.id_producto)].stock
        if (selectedPoduct.quantity > stock) {
            alert('No puede añadir más cantidad del stock actual')
        }
        else {
            dispatch({ type: INCREASE_QUANTITY, payload: selectedPoduct })
        }
    }

    const decreaseQuantity = (selectedPoduct) => {
        dispatch({ type: DECREASE_QUANTITY, payload: selectedPoduct })
    }

    const removeItem = (selectedPoduct) => {
        dispatch({ type: REMOVE_ITEM, payload: selectedPoduct })
    }

    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }

    const payment = async () => {
        try {
            axios.post('http://localhost:2626/payment', { products: state.shopCar })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductContext.Provider
            value={{
                categories: state.categories,
                selectedCategory: state.selectedCategory,
                products: state.products,
                shopCar: state.shopCar,
                getCategoriesProducts,
                getSelectedCategory,
                getProductsByCategories,
                getAllProducts,
                addProductToCar,
                increaseQuantity,
                decreaseQuantity,
                removeItem,
                clearCart,
                payment,
                ...state
            }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;