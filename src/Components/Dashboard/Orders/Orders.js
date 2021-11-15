import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Orders = () => {
  const history = useHistory();
    const {user} = useAuth();
    const [orders, setOrders] = useState([]);

useEffect(() => {
    const url=`https://immense-beach-83799.herokuapp.com/orders?email=${user.email}`
    fetch(url)
    .then(res => res.json())
    .then(data => setOrders(data));
}, []);

const handleDelete = id => {
  alert('Do You Want to Delete This Service')
  const url = `https://immense-beach-83799.herokuapp.com/orders/${id}`;
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
        <div>
            <h2>Orders: {orders.length}</h2>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Orders table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customerName}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.productName}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right"> <button onClick={() => handleDelete(row._id)} className="btn btn-danger">delete</button></TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default Orders;