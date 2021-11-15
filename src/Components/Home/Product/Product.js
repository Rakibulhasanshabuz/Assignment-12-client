import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Product.css';

const Product = ({product}) => {
    const {name, description, price, img, _id} = product;
    const location = useLocation()
    return (
        <div className="g-4 col-lg-4 col-md-6 col-sm-12 service pb-3">
            <img src={img} alt="" />
            <h1>Name: {name}</h1>
            <h3>Price: {price}</h3>
            <p>{description}</p>
            <Link to={`/booking/${_id}`}>
                {!location.pathname.includes('/myOrders') && <button className="btn regester-btn">Booking for {name}</button>}
            </Link>
        </div>
    );
};

export default Product;