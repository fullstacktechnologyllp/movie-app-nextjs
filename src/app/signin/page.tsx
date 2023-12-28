"use client";

import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import axios from '../services/api';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import '../../i18n';

function Signin() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token !== null) {
      window.location.href = '/movies'
    }
  }, []);

  const { t } = useTranslation();
  const router = useRouter();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const navigateLink = (to: any) => {
    router.push(to);
  }
  const notify = (message: string) => toast.error(message);

  const loginFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const loginApi = await axios.post('/api/login', {
        email,
        password,
      });
      const data: { token: string } = loginApi.data;
      localStorage.setItem('token', data.token)
      navigateLink('/movies');
    } catch (error: any) {
      notify(t(`errors.${error.message}`));
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
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
      { loading && (
        <div className='vh-100 d-flex justify-content-center align-items-center z-3 overlay'>
          <div className='spinner-container'>
            <Spinner animation='border' variant='primary' />
          </div>
        </div>
      ) }
      <Container>
        <Row className='justify-content-center text-white'>
          <Col md={ 3 } className='p-4 rounded'>
            <h1 className='text-center mb-4'>{ t('signin') }</h1>
            <Form onSubmit={ loginFormSubmit }>
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

              <Button variant="primary" type="submit" className='w-100 btn-primary-custom regular-body' size='lg'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default appWithTranslation<any>(Signin);