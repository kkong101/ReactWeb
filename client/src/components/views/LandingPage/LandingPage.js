import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {Icon, Col, Card, Row, Carousel } from 'antd';
import ImagesSlider from '../../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import {continents,price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature'

const { Meta } = Card;

export const LandingPage = (props) => {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")
    const [Filters, setFilters] = useState({
        continents: [],
        price : []
    }
    )
      
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
    }, [])  

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                if(body.loadMore) { 
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.PostSize)
            } else {
                alert("상품을 가져오는데 실패하였습니다. ")
            }
            
        })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }
        
        getProducts(body)
        setSkip(skip)
    }

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filter: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }


    const renderCards = Products.map((product, index) => {
        console.log(product)
        return <Col lg={6} md={8} xs={24} >
        <Card key={index} cover={ <ImagesSlider images={product.images} />} >
            <Meta title={product.title} description={`${product.price}`} />
        </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)

        setSkip(0)
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}

        newFilters[category] = filters

        showFilteredResults(newFilters)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto'  }}>
            <div style= {{ textAlign: 'center'}}>
                <h2> Let's travel anywhere </h2>
            </div>

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filter => handleFilters(filter,"continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filter => handleFilters(filter,"price")}/>
                </Col>
            </Row>

            <div style= {{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}} >
                <SearchFeature refreshFunction={updateSearchTerm}/>
            </div>

            <br/>
            <Row gutter={[16,16]}>
             {renderCards}
            </Row>
            <br/>

            {
                PostSize >= Limit &&
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                    </div>
            }

        </div>
    )
}


export default withRouter(LandingPage)