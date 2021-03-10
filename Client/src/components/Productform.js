import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, updateProduct } from '../actions/products'



export const Productform = (props) => {

    const dispatch = useDispatch();

    const [data, setdata] = useState({
        productName: '',
        vat: 10,
        qty: 0,
        gprice: 0,
        stock:5,
        image:'',
    })
    const productdata = useSelector((state) => (props.formdata._id ? state.products.find((item) => item._id === props.formdata._id) : null));

    useEffect(() => {
        if (productdata) {
            setdata(productdata)
        }
    }, [productdata])



    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        dispatch(createProduct(data))
        clear()
        props.closeModal(true)
    }

    const onUpdate = (e) => {
        e.preventDefault()
        dispatch(updateProduct(props.formdata._id, data))
        clear()
        props.closeModal(true)
    }


    const onDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(props.formdata._id))
        clear()
        props.closeModal(true)
    }

    const handleStock=(e)=>{
        setdata({ ...data, qty:e.target.value })
    }

    const clear = () => {
        setdata({
            productName: '',
            vat: 10,
            qty: 0,
            gprice: 0,
            stock:0,
            image:''
        });
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        clear()
        props.closeModal(true)
    }


    return (
        <div>
            <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> Product </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form name={'myform'} onSubmit={(e) => onSubmit(e)} encType="multipart/form-data" >
                        <Form.Group as={Row} controlId="productName" >
                            <Form.Label column sm={2}>Product Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={(e) => setdata({ ...data, productName: e.target.value })} placeholder="Product Name" required value={data.productName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="vat" >
                            <Form.Label column sm={2}>Vat</Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <Form.Control name='vat' type="number" onChange={(e) => setdata({ ...data, vat: Number(e.target.value) })} value={data.vat} min="10" max="25" step="5" required />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="qty" >
                            <Form.Label column sm={2}>Quantity</Form.Label>
                            <Col sm={10}>
                                <Form.Control name='qty' type="number" onChange={(e) => handleStock(e)} value={data.qty} min="1" max={5} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nprice" >
                            <Form.Label column sm={2}>Net Price</Form.Label>
                            <Col sm={10}>
                                <Form.Control name='nprice' type="text" value={(Number(data.qty) * Number(data.gprice)) - (Number(data.qty) * Number(data.gprice))*Number('0.'+data.vat)  } readOnly required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="gprice" >
                            <Form.Label column sm={2}>Gross Price</Form.Label>
                            <Col sm={10}>
                                <Form.Control name='gprice' type="Number" onChange={(e) => setdata({ ...data, gprice: Number(e.target.value) })} value={data.gprice} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="stock" >
                            <Form.Label column sm={2}>Stock</Form.Label>
                            <Col sm={10}>
                                <Form.Control name='stock' type="Number" onChange={(e) =>setdata({ ...data, stock: Number(e.target.value)})} value={data.stock} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="gprice" >
                            <Form.Label column sm={2}>Select File</Form.Label>
                            <Col sm={10}>
                                <Form.Control name='file' type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => setdata({ ...data, image: e.target.files[0].name })} value={data.file} required />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.formdata._id ?
                            <>
                                <Button onClick={(e) => onUpdate(e)} type="submit">Update</Button>
                                <Button onClick={(e) => onDelete(e)} type="submit">Delete</Button>
                            </>
                            :
                            <Button onClick={(e) => onSubmit(e)} type="submit">Submit</Button>
                    }
                    <Button variant="outline-danger" onClick={(e) => handleCloseModal(e)} >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
