import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import {HouseDoorFill,SlashSquareFill, PersonCircle, PlusSquareFill} from "react-bootstrap-icons";

const Sidebar = () => {
  return (
    <ListGroup variant="flush" className='sidebar'>
        <ListGroup.Item className='bg-none'>
            <Link to=""><span className='me-3'><HouseDoorFill/></span>Home</Link>
        </ListGroup.Item>
        <ListGroup.Item className='bg-none'>
            <Link to="CustomerDetails"><span className='me-3'><PersonCircle/></span>Customer Information</Link>
        </ListGroup.Item>
        <ListGroup.Item className='bg-none'>
            <Link to="Report"><span className='me-3'><SlashSquareFill/></span>Reports</Link>
        </ListGroup.Item>
        <ListGroup.Item className='bg-none'>
            <Link to="CompletedTransactions"><span className='me-3'><PlusSquareFill/></span>Completed Transactions</Link>
        </ListGroup.Item>
        <ListGroup.Item className='bg-none'>
            <Link to="PendingTransactions"><span className='me-3'><PlusSquareFill/></span>Pending Transactions</Link>
        </ListGroup.Item>
        <ListGroup.Item className='bg-none'>
            <Link to="Register"><span className='me-3'><PlusSquareFill/></span>Add User</Link>
        </ListGroup.Item>
    </ListGroup>
  )
}

export default Sidebar