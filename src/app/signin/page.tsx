"use client";

import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import axios from '../services/api';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import '../../i18n';
import './signin.css';
import signinImage from '../../assets/images/sign-in.jpg';
import '../globals.css';

function Signin() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    if (token !== null) {
      window.location.href = '/movies'
    }
    if (!selectedLanguage) {
      localStorage.setItem('selectedLanguage', 'en');
    }
  }, []);

  const { t } = useTranslation();
  const router = useRouter();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ errors, setErrors ] = useState({ email: '', password: '' });

  const navigateLink = (to: any) => {
    router.push(to);
  }
  const notify = (message: string) => toast.error(message);


  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      newErrors.email = t('errors.enter_valid_email_address');
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = t('errors.enter_valid_password');;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const loginFormSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return false;
    }
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
  const validateEmail = () => {
    const newErrors = { ...errors, email: '' };
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      newErrors.email = t('errors.enter_valid_email_address');
    }
    setErrors(newErrors);
  };

  const validatePassword = () => {
    const newErrors = { ...errors, password: '' };
    if (!password) {
      newErrors.password = t('errors.enter_valid_password');
    }
    setErrors(newErrors);
  };

  return (
    <div className='global-image-container'>
      <div className='sign-in-wrapper'>
        { loading && (
          <div className='vh-100 d-flex justify-content-center align-items-center z-3 overlay'>
            <div className='spinner-container'>
              <Spinner animation='border' variant='primary' />
            </div>
          </div>
        ) }
        <Container className='sign-in-container'>
          <Row className='justify-content-center text-white'>
            <Col className='p-0'>
              <h1 className='text-center text-sign-in mb-0'>{ t('signin') }</h1>
              <Form onSubmit={ loginFormSubmit } className='justify-content-center d-grid'>
                <Form.Group controlId="formBasicEmail" className='input-email'>
                  <Form.Control type="email"
                    className={ `custom-input custom-input-bg ${errors.email && 'is-invalid border-1 border-danger'}` }
                    placeholder={ t('email') }
                    onChange={ (e) => setEmail(e.target.value) }
                    onBlur={ (e) => validateEmail() }
                    onMouseMove={ (e) => validateEmail() }
                    onMouseLeave={ (e) => validateEmail() }
                    onMouseOver={ (e) => validateEmail() }
                  />
                  { errors.email && <div className="invalid-feedback m-0">{ errors.email }</div> }

                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='input-email'>
                  <Form.Control type="password"
                    className={ `custom-input custom-input-bg ${errors.password && 'is-invalid border-1 border-danger'}` }
                    placeholder={ t('password') }
                    onChange={ (e) => setPassword(e.target.value) }
                    onBlur={ (e) => validatePassword() }
                    onMouseMove={ (e) => validatePassword() }
                    onMouseLeave={ (e) => validatePassword() }
                    onMouseOver={ (e) => validatePassword() }
                  />
                  { errors.password && <div className="invalid-feedback m-0">{ errors.password }</div> }
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className='d-flex justify-content-center bottom-24 remember-me-checkbox'>
                  <Form.Check type="checkbox" label={ t('remember_me') } />
                </Form.Group>

                <Button variant="primary" type="submit" className='w-100 btn-primary-custom regular-body login-button' size='lg'>
                  { t('login') }
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Signin;