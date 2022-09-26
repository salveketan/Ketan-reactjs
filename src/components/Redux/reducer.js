import * as types from "./actionType"

const initState = {
    product: []
}

const ProductReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_DATA: {
            return {
                ...state,
                product: payload
            }
        }
        default:
            return state;
    }
}


export default ProductReducer;