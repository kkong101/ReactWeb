import React from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import { withRouter } from 'react-router-dom';


export const LandingPage = (props) => {

    useEffect(() => {
        return () => {
            axios.post('/api/product/products')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert("상품을 가져오는데 실패하였습니다. ")
                }
                
            })
        }
    }, [])  


    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>

        </div>
    )
}


export default withRouter(LandingPage)