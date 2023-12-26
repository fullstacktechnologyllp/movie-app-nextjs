"use client";
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import signinImage from '../../assets/images/sign-in.jpg';
// import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  // const navigate = useNavigate();

  return (
    <div
      style={ {
        backgroundImage: `url(${signinImage.src})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'bottom',
      } }
    >
      <Container>
        <Row className='justify-content-center text-white'>
          <Col md={ 6 } className='p-4 rounded'>
            <h3 className='text-center mb-4'>Your movie list is empty</h3>

            <Button variant="primary" type="submit" className='d-flex m-auto btn-primary-custom py-3 regular-body' size='lg'>
              Add a new movie
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
