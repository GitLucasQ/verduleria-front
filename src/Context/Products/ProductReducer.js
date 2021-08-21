import {
    GET_CATEGORIES_PRODUCTS, GET_SELECTED_CATEGORY, GET_PROUDCTS_BY_CATEGORIES,
    GET_ALL_PRODUCTS, ADD_PRODUCT_TO_CAR, INCREASE_QUANTITY, DECREASE_QUANTITY,
    CLEAR_CART, REMOVE_ITEM, PAYMENT
} from '../Types'

const ProductReducer = (state, action) => {
    const { payload, type } = action

    switch (type) {
        case GET_CATEGORIES_PRODUCTS:
            return {
                ...state,
                categories: payload,
            };
        case GET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: payload,
            };
        case GET_PROUDCTS_BY_CATEGORIES:
            return {
                ...state,
                products: payload
            };
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case ADD_PRODUCT_TO_CAR:
            if (!state.shopCar.find(item => item.id_producto === payload.id_producto)) {
                state.shopCar.push({ ...payload, quantity: 1 })
            }

            return {
                ...state,
                shopCar: [...state.shopCar]
            };

        case INCREASE_QUANTITY:
            state.shopCar[state.shopCar.findIndex(item => item.id_producto === payload.id_producto)].quantity++
            return {
                ...state,
                shopCar: [...state.shopCar]
            };

        case DECREASE_QUANTITY:
            state.shopCar[state.shopCar.findIndex(item => item.id_producto === payload.id_producto)].quantity--
            return {
                ...state,
                shopCar: [...state.shopCar]
            };

        case REMOVE_ITEM:
            return {
                ...state,
                shopCar: [...state.shopCar.filter(item => item.id_producto !== payload.id_producto)]
            };

        case CLEAR_CART:
            return {
                shopCar: []
            };

        case PAYMENT:
            return {
                shopCar: []
            }

        default:
            return state
    }
}

export default ProductReducer;