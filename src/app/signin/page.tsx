"use client";

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useTranslation } from 'next-i18next';

export default function Signin() {

  const { t } = useTranslation();
  const router = useRouter();
  const apiUrl = process.env.API_URL;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigateLink = (to: any) => {
    router.push(to);
  }

  console.log(apiUrl);
  const loginFormSubmit = async (event: any) => {
    event.preventDefault(); // Prevents the default form submission behavior
    try {
      const login = await axios.post('/api/login', {
        email,
        password,
      });

      // Handle the login response, e.g., redirect on successful login
      console.log('Login successful!', login);
      // Redirect to the desired route upon successful login
      navigateLink('/movies');
    } catch (error) {
      // Handle login error here
      console.error('Login failed:', error);
    }
  }

  return (
    <div
      style={ {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } }
    >
      <Container>
        <Row className='justify-content-center text-white'>
          <Col md={ 3 } className='p-4 rounded'>
            <h1 className='text-center mb-4'>{ t('signin') }</h1>
            <Form>
              <Form.Group controlId="formBasicEmail" className='mb-3'>
                <Form.Control type="email" className='custom-input custom-input-bg' placeholder="Email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mb-3'>
                <Form.Control type="password" className='custom-input custom-input-bg' placeholder="Password"
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className='d-flex justify-content-center mb-3'>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button onClick={ loginFormSubmit } variant="primary" type="button" className='w-100 btn-primary-custom regular-body' size='lg'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
