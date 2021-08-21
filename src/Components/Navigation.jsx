import React, { useEffect, useContext } from 'react'
import { Container, Navbar, Nav, Form, NavDropdown, FormControl } from 'react-bootstrap'
import '../Assets/css/Navigation.css'

import ProductContext from '../Context/Products/ProductContext'

const Navigation = () => {

    const productContext = useContext(ProductContext)


    useEffect(() => {
        productContext.getCategoriesProducts()
    }, [])

    return (
        <div>
            <Navbar className="navigation" expand="lg" variant="dark" >
                <Container>
                    <Navbar.Brand href="/">LaVerdulería</Navbar.Brand>                    
                    <Nav className="ml-auto">
                        <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => productContext.getAllProducts()}>Todos</NavDropdown.Item>
                            {
                                productContext.categories.map((category) =>
                                    <NavDropdown.Item
                                        key={category.categoria}
                                        onClick={() => productContext.getProductsByCategories(category.categoria)}
                                    >
                                        {category.categoria}
                                    </NavDropdown.Item>
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation;