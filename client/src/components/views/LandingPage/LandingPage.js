import React from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import { withRouter } from 'react-router-dom';


export const LandingPage = (props) => {

    useEffect(() => {
        return () => {
            axios.get('/api/hello')
            .then(response => console.log(response.data))
        }
    }, [])  

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    alert('로그아웃 성공');
                    props.history.push('/login');
                } else {
                    alert('로그아웃 실패');
                }
            });
    }

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}


export default withRouter(LandingPage)