import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import { getCartItems} from '../../../_actions/user_action';
import {UserCardBlock} from './Sections/UserCardBlock'

function CartPage(props) {

    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

        let cartItems = []

       // 리덕스 user state 안에 cart 안에 상품이 들어 있는지 확인 
       if (props.user.userData && props.user.userData.cart) {
           if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });

                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then((response) => {
                    if (response.payload.length > 0) {
                        calculateTotal(response.payload)
                    }
                })

           } 
       }

    }, [props.user.userData])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }


    return (
        <div>
            
        </div>
    )
}

export default CartPage
