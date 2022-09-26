
import axios from "axios";
import * as types from "./actionType"
// import { useDispatch } from "react-redux";

const fetch_data_success = (payload) => {
    // console.log(payload);
    return {
        type: types.FETCH_DATA,
        payload
    }
}

// const dispatch = useDispatch();

const fetchProductData = (dispatch) => {

    // dispatch(fetch_data_request());
    return (
        axios.get("https://kfcbackendketan.herokuapp.com/product")
            .then((r) => dispatch(fetch_data_success(r.data.product)))
            .catch((e) => console.log(e))
    )

}

export { fetchProductData }