import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import ProductState from './Context/Products/ProductState'
import Navigation from './Components/Navigation'
import Products from './Components/Products'
import ShopCart from './Components/ShopCart'
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <ProductState>
        <Navigation />
        <Row>
          <Col sm={8}>
            <Products />
          </Col>
          <Col sm={4}>
            <ShopCart />
          </Col>
        </Row>
      </ProductState>
    </div>
  );
}

export default App;
