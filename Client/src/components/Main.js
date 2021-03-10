import React from 'react'
import { useState } from 'react'
import {  Container, Button } from 'react-bootstrap'
import { BiPlus } from 'react-icons/bi'
import { Products } from './Products'
import { Productform } from './Productform'
import { useSelector } from 'react-redux'


export const Main = () => {


    const products = useSelector((state)=>state.products)

    const [modalShow, setModalShow] = useState(false);
    const [formdata, setFormdata] = useState([]);

    const handleProductData=(e)=>{
        setFormdata(e)
        setModalShow(true)
    }

    const handelModelClose=(e)=>{
        setModalShow(!e)
        setFormdata([])
    }

    return (
        <div>
            <Container>
                <h1>Products</h1>
                <hr />
                <Button  onClick={() => setModalShow(true)} style={{alignItems:'center'}} variant="outline-primary" ><BiPlus size={20}  />Add Products</Button>
            </Container>
            <Products data={(e)=>handleProductData(e)} />
            <Productform show={modalShow} formdata={formdata} closeModal={(e)=>handelModelClose(e)} />
        </div>
    )
}
