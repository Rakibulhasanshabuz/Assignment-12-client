import React, { useEffect, useState } from 'react';
import Product from '../Home/Product/Product';

const Explore = () => {
    const [products, setProducts] = useState([])
    useEffect (() => {
        fetch('https://immense-beach-83799.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])
    return (
        <div id="services" className="m-5 p-5">
            <h1 className="text-warning my-5">Our Products</h1>
            <div className="row g-5 service-container">
            {
                products.map(product => <Product
                key={product._id}
                product={product} 
                ></Product>)
            }
        </div>
        </div>
    );
};

export default Explore;