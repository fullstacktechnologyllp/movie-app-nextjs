"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Pagination } from 'react-bootstrap';
import './movie-list.css';
import CustomCard from './movie-card';
import plus from '../../assets/images/plus.svg';
import logout from '../../assets/images/logout.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MovieList() {

  const router = useRouter();

  const [ cardData, setCardData ] = useState([
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
    { title: 'Movie 1', publishYear: 2021, imageUrl: 'https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg' },
  ]);
  const [ page, setPage ] = useState(1);
  const cardsPerPage = 8;
  const lastIndex = page * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  const currentCards = cardData.slice(firstIndex, lastIndex);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
        const data = await response.json();
        // setCardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [ page ]);


  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const handleLogout = () => {
    router.push('/signin');
  }

  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={ number } onClick={ () => handlePageChange(number) } className={ page === number ? 'active' : '' }>
        { number }
      </Pagination.Item>
    );
  }

  return (<>
    <Container className='pt-5 text-white pb-5'>
      <div className="d-flex justify-content-between align-items-center pt-5 mb-5">
        <h2>My movies
          <Image src={ plus } alt='add movies' width={ 32 } className='ms-3 cursor-pointer' onClick={ () => router.push('/movie-action/0') } />
        </h2>
        <div>
          <span className='regular-body'>Logout
            <Image src={ logout } alt='add movies' width={ 18 } className='ms-3 cursor-pointer' onClick={ () => handleLogout() } />
          </span>
        </div>
      </div>
      <Row xs={ 1 } md={ 4 } className="g-4">
        { currentCards.map((card, index) => (
          <Col key={ index }>
            <CustomCard { ...card } />
          </Col>
        )) }
      </Row>
      <Container className='d-flex justify-content-center my-5 py-5'>
        <Pagination className='custom-pagination py-5 '>
          <Pagination.Prev onClick={ () => handlePageChange(page - 1) }>Prev</Pagination.Prev>
          { paginationItems }
          <Pagination.Next onClick={ () => handlePageChange(page + 1) }>Next</Pagination.Next>
        </Pagination>
      </Container>
    </Container>
  </>);
}