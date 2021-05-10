import React from 'react'
import axios from 'axios'
import {useEffect} from 'react'


export const LandingPage = () => {

    useEffect(() => {
        return () => {
            axios.get('/api/hello')
            .then(response => console.log(response.data))
        }
    }, [])  

    return (
        <div>
            LandingPage 입니다. 
        </div>
    )
}

export default LandingPage