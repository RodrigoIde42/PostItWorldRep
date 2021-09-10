import React from "react";
import Product from "./components/product";
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './DataRequests/productReq';

function App() {

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <div className="grid-container">
        <header className="row">
          <div className="logo-brand">
            <img src="./Logo.svg" alt="Logo"></img>
            <a href="/" className="brand">Post-it World</a>
          </div>
        </header>
        <main>
          <div className="banner">
            <div>
              <h1>Post-its now for half-price!!</h1>
              <a href="#2"><h2>Buy it NOW!!!</h2></a>
            </div>
            <div>
              <img className="banner-img" src="https://product-images-piw.s3.amazonaws.com/StrippedSN.png" alt="Banner-img"/>
              <img className="sale" src="https://img.icons8.com/pastel-glyph/64/000000/sale--v1.png" alt="Sale"/>
            </div>
          </div>
          <div className="row center">
            {loading ? <p>Loading...</p> :
              error ? <p>Error! ${error.message}</p> :
              data.products.nodes.map(product => (
              <Product key={product.productId} product={product} />
            ))}
          </div>
        </main>
    </div>
  );
}

export default App;
