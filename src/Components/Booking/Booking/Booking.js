import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Booking = () => {

    const {user} = useAuth();
    
    const initialInfo = {displayName: user.displayName, email: user.email, phone: ''}
    const [bookingInfo, setBookingInfo] = useState(initialInfo);
 
    const {id} = useParams();
    const [product, setProduct] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...bookingInfo};
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }

    

    useEffect(() => {
        fetch(`https://immense-beach-83799.herokuapp.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [])

   
    

    const handleOrder = (data, book) => {
        console.log(book)
        const order = {
            productName : data.name,
            img : data.img,
            description: data.description,
            price: data.price,
            customerName: book.displayName,
            email: book.email
        }
        axios.post('https://immense-beach-83799.herokuapp.com/orders', order)
        .then(res => {
            if(res.data.insertedId){
              alert('Your Order Place SuccessFully');
            }
          })
    }
    const {name, img, description, price, _id} = product;
    return (
        <div>
            <h2 className="my-5"><span className="text-danger">Your Booking Hotel is:</span> {id}<span className="text-info">({name})</span></h2>
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
                <div className="d-flex justify-content-around">
                </div>
                </Card.Body>
                </Card>
        </Col>
            </Row>
            
            </div>
            </div>
            <form onSubmit='' className="my-5">
            
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Your Name"
                   name="displayName"
                   onBlur={handleOnBlur}
                   defaultValue={user.displayName}
                   variant="standard" />
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Your Email"
                   type= "email"
                   name="email"
                   onBlur={handleOnBlur}
                   defaultValue={user.email}
                   variant="standard" />
            <TextField 
                   disabled 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic"
                   name="productName"
                   value={name}
                   variant="standard" />
            <TextField 
                   sx={{width: '50%',  m: 1}}
                   id="standard-basic" 
                   label="Phone Number"
                   name="phone"
                   onBlur={handleOnBlur}
                   defaultValue={bookingInfo.phone}
                   variant="standard" /><br/>
                   <Link to={`/placeOrder/${_id}`}>
                <button onClick={() => handleOrder(product, bookingInfo)} className="btn btn-success">Place Order</button>
                </Link>
            </form>
        </div>
    );
};

export default Booking;