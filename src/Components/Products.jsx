import React, { useContext, useEffect } from 'react'

import ProductContext from '../Context/Products/ProductContext'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'


const Products = () => {

    const { products, shopCar } = useContext(ProductContext)
    const productContext = useContext(ProductContext)

    useEffect(() => {
        productContext.getAllProducts()
    }, [])

    const addProductToCar = (product) => {
        productContext.addProductToCar(product)        
    }

    return (
        <div>
            <Container className="mt-4">
                <Row>
                    {
                        products.map((product) =>
                            <Col className="pt-4" md={4}>
                                <Card style={{ width: '10rem' }} key={product.id_producto}>
                                    <Card.Img style={{ height: '12rem' }} variant="top" src={product.img_url} />
                                    <Card.Body>
                                        <Card.Title>{product.nombre_producto}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{product.categoria}</Card.Subtitle>
                                        <Card.Text>
                                            Precio x Kg: S/.{product.precio}
                                        </Card.Text>
                                        <Card.Text>
                                            Disponible: {product.stock} Kg
                                        </Card.Text>
                                        <Button
                                            onClick={() => addProductToCar(product)}
                                            variant="success"
                                        >
                                            AGREGAR
                                        </Button>
                                        <Card.Text>
                                            {product.descripcion}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>

            </Container>
        </div >
    )
}

export default Products;