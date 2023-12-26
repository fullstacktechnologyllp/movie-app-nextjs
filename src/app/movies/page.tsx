"use client";
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import MovieList from '../movie-list/page';
import { useRouter } from 'next/navigation';

export default function Movies() {
  const router = useRouter();
  const [ moviesList, setMovies ] = useState([{title:'Jawan', publishYear: 2023}]);

  return (<>
    { !moviesList.length ?
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <Container className=''>
          <Row className=' justify-content-center text-white'>
            <Col md={ 6 } className='p-4 rounded'>
              <h3 className='text-center mb-4'>Your movie list is empty</h3>
              <Button onClick={ () => router.push('/movie-action/0') } variant="primary" type="button" className='d-flex m-auto btn-primary-custom py-3 px-4 regular-body'>
                Add a new movie
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      : <MovieList />
    }
  </>
  );
}
