import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

const PlaceOrder = () => {

    const {orderId} = useParams();
    const [service, setService] = useState({});

    useEffect(() => {
        fetch(`https://immense-beach-83799.herokuapp.com/products/${orderId}`)
        .then(res => res.json())
        .then(data => {
            setService(data)
            
        });
    }, [])

    const {name, img, description, price} = service;
    return (
        <div>
            <h2 className="my-5"><span className="text-danger">Your Booking Order is:</span> {orderId}<span className="text-info">({name})</span></h2>
            <div className="d-flex justify-content-center mb-4">
            <div>
            <Row xs={1} md={3} className="g-4">
            <Col className="serviceData-container">
            <Card style={{height: "700px", width: "600px"}}>
                <div className="cart-img">
                <Card.Img style={{width: "500px"}} variant="top" src={img} />
                </div>
                <Card.Body>
                <Card.Title>Name: <span className="text-primary">{name}</span></Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Title>Price: {price}</Card.Title>
                </Card.Body>
                </Card>
        </Col>
            </Row>
            
            </div>
            </div>
        </div>
    );
};

export default PlaceOrder;