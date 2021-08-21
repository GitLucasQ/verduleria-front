import React, { useEffect, useContext } from 'react'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../Components/Icons'

import ProductContext from '../Context/Products/ProductContext'

const ShopCart = () => {
    const { shopCar } = useContext(ProductContext)
    const productContext = useContext(ProductContext)

    const payment = () => {
        try {
            productContext.payment()   
            alert('Pago exitoso')
            window.location.href = window.location.href;
        } catch (error) {
            alert('Error al procesar')
        }        
    }

    return (
        <div>
            <Container className="mt-4">
                <h1>Mi carrito</h1>
                {
                    shopCar.map((item) =>
                        <Row key={item.id_producto}>
                            <Col xs={2}>
                                <Image src={item.img_url} height="50px" />
                            </Col>
                            <Col xs={4}>
                                <p>{item.nombre_producto}</p>
                            </Col>
                            <Col xs={2}>
                                <p>{item.quantity}</p>
                            </Col>
                            <Col xs={4}>
                                <Button
                                    onClick={() => productContext.increaseQuantity(item)}
                                    className="btn btn-primary btn-sm mr-2 mb-1">
                                    <PlusCircleIcon width={"20px"} />
                                </Button>
                                {
                                    item.quantity > 1 &&
                                    <Button
                                        onClick={() => productContext.decreaseQuantity(item)}
                                        className="btn btn-danger btn-sm mr-2 mb-1">
                                        <MinusCircleIcon width={"20px"} />
                                    </Button>
                                }
                                {
                                    item.quantity === 1 &&
                                    <Button
                                        onClick={() => productContext.removeItem(item)}
                                        className="btn btn-danger btn-sm mr-2 mb-1">
                                        <TrashIcon width={"20px"} />
                                    </Button>
                                }
                            </Col>
                        </Row>
                    )
                }
                {
                    shopCar.length >= 1 &&
                    <Row>
                        <Button className="btn btn-success my-2"
                            onClick={() => payment()}>PAGAR</Button>
                    </Row>
                }

            </Container>
        </div>
    )
}

export default ShopCart;