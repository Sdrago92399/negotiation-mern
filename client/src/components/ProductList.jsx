import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage } from 'mdb-react-ui-kit';
import { fetchProducts } from '../api/index';
import ProductCard from './ProductCard';

const ProductList = ({ token, currentUser }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      const data = await fetchProducts();

      setProducts(data.products);
    };

    fetchProductList();
  }, []);

  return (
    <MDBRow className="mt-5">
      {products.map((product, index) => (
        <MDBCol md="4" key={index}>
          <ProductCard product={product} token={token} currentUser={currentUser} />
        </MDBCol>
      ))}
    </MDBRow>
  );
};

export default ProductList;
