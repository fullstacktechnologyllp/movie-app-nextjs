import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();

  const navigateLink = (to:any) => {
    router.push(to);   }

  return (
    <div
      style={ {
        height:'100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } }
    >
      <Container>
        <Row className='justify-content-center text-white'>
          <Col md={ 3 } className='p-4 rounded'>
            <h1 className='text-center mb-4'>Sign in </h1>
            <Form>
              <Form.Group controlId="formBasicEmail" className='mb-3'>
                <Form.Control type="email" className='custom-input custom-input-bg' placeholder="Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mb-3'>
                <Form.Control type="password" className='custom-input custom-input-bg' placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className='d-flex justify-content-center mb-3'>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button onClick={ () => navigateLink('/movies') } variant="primary" type="button" className='w-100 btn-primary-custom regular-body' size='lg'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
