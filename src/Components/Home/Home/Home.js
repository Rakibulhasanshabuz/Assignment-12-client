import React from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import Review from '../Review/Review';
import SomeInfo from '../SomeInfo/SomeInfo';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Review></Review>
            <SomeInfo></SomeInfo>
        </div>
    );
};

export default Home;