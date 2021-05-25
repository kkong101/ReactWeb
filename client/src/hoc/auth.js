import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {auth} from '../_actions/user_action';


/**
 * 
 * @param {*} SpecificComponent HOC 적용할 comment
 * @param {*} option null:아무나 출입 가능, true:로그인한 유저만 출입 가능, false:로그인한 유저는 출입 불가능
 * @param {*} adminRoute true: admin 권한
 * @returns 
 */

export default function (SpecificComponent, option, adminRoute=null) {

    function AuthentificationCheck(props) {

 
        let user = useSelector(state => state.user)
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {

                if(!response.payload.isAuth) {
                    if(option) {
                        // 로그인하지 않을 때
                        props.history.push('/login');
                    }
                } else {
                    // 로그인 했을 때
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if(option === false) {
                            props.history.push('/');
                        }
                    }
                }
            })
        }, [])

        return ( 
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthentificationCheck
}