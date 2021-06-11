import { FormProvider } from 'antd/lib/form/context';
import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS
} from './types';
import {USER_SERVER } from '../Config'

export function loginUser(dataTosubmit) {

    const request = Axios.post(`${USER_SERVER}/login`,dataTosubmit)
    .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {

    const request = Axios.post(`${USER_SERVER}/register`,dataTosubmit)
    .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = Axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = Axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id){

    const request = Axios.get(`${USER_SERVER}/addToCart?productId=${id}`)
    .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {
    const request = Axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}