import React, { useEffect, useState } from 'react';

const Review = () => {
    const [reviews, setReviews] = useState([])
    useEffect (() => {
        fetch('https://immense-beach-83799.herokuapp.com/reviews')
        .then(res => res.json())
        .then(data => setReviews(data));
    }, [])
    return (
        <div id="services" className="m-5 p-5">
            <h1 className="text-warning my-5">Our Reviews</h1>
            <div className="row g-5 service-container">
            {
                reviews.map(review => <div className="g-4 col-lg-4 col-md-6 col-sm-12 service pb-3">
                <h1>Name: {review.name}</h1>
                <h3>Ratting: {review.ratting}</h3>
                <p>{review.description}</p>
            </div>)
            }
        </div>
        </div>
    );
};

export default Review;