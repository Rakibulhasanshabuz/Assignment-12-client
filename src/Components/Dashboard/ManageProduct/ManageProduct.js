import React from 'react';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

const ManageProduct = ({product}) => {
    const {name, description, price, img, _id} = product;
    const history = useHistory();
    const location = useLocation()


    const handleDelete = id => {
        alert('Do You Want to Delete This Product')
        const url = `https://immense-beach-83799.herokuapp.com/products/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                alert('Your Service Has been Deleted Successfully')
                history.push('/')
            }
        })
    }

    return (
        <div className="g-4 col-lg-4 col-md-6 col-sm-12 service pb-3">
            <img src={img} alt="" />
            <h1>Name: {name}</h1>
            <h3>Price: {price}</h3>
            <p>{description}</p>
            <Link to={`/booking/${_id}`}>
                {!location.pathname.includes('/myOrders') && <button className="btn regester-btn">Booking for {name}</button>}
            </Link>
            <button onClick={() => handleDelete(product._id)} className="btn btn-danger">delete</button>
        </div>
    );
};

export default ManageProduct;