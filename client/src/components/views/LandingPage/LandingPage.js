import React, {useState} from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import {Icon, Col, Card, Row, Carousel } from 'antd';
import ImagesSlider from '../../../utils/ImageSlider'
const { Meta } = Card;



export const LandingPage = (props) => {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    

    useEffect(() => {
        
        return () => {
            axios.post('/api/product/products')
            .then(response => {
                
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                    console.log('response.data.productInfo : ' + response.data)
                    
                } else {
                    alert("상품을 가져오는데 실패하였습니다. ")
                }
                
            })
        }
    }, [])  

    const loadMoreHandler = (event) => {
        
    }


    const renderCards = Products.map((product, index) => {
        console.log(product)
        return <Col lg={6} md={8} xs={24} >
        <Card key={index} cover={ <ImagesSlider images={product.images} />} >
            <Meta title={product.title} description={`${product.price}`} />
        </Card>
        </Col>
    })


    return (
        <div style={{ width: '75%', margin: '3rem auto'  }}>
            <div style= {{ textAlign: 'center'}}>
                <h2> Let's travel anywhere </h2>
            </div>

            <Row gutter={[16,16]}>
             {renderCards}
            </Row>

            <div style={{ justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        </div>
    )
}


export default withRouter(LandingPage)