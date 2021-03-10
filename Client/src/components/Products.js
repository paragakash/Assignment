import React from 'react'
import { Table, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';


export const Products = (props) => {

    const products = useSelector((state) => state.products);

    const handleOnclick=(e)=>{
        props.data(e)
    }

    return (
        <Container>
            <Table striped bordered hover style={{ marginTop: 50 }} >
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Vat (%)</th>
                        <th>Quantity</th>
                        <th>Gross Price</th>
                        <th>Net Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products && products.map((item,index) => {
                            return (
                                <tr onClick={()=>handleOnclick(item)} key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.vat}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.gprice}</td>
                                    <td>{Number(item.qty) * Number(item.gprice)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>

    )
}
