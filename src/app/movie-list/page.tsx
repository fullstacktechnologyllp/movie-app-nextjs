"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Pagination } from 'react-bootstrap';
import './movie-list.css';
import CustomCard from './movie-card';
import plus from '../../assets/images/plus.svg';
import logout from '../../assets/images/logout.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from '../services/api';

export default function MovieList() {

  const router = useRouter();

  const [ cardData, setCardData ] = useState<any>();
  const [ page, setPage ] = useState(1);
  const [ skip, setSkip ] = useState(0);
  const [ currentPageCards, setCurrentPageCards ] = useState<any>();
  const cardsPerPage = 8;

  let totalPages: any = null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/movies?take=${cardsPerPage}&skip=${skip}`);
        setCardData(response.data.items);
        const lastIndex = page * cardsPerPage;
        const firstIndex = lastIndex - cardsPerPage;
        setCurrentPageCards(cardData.slice(firstIndex, lastIndex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        totalPages = Math.ceil(response.data.total / cardsPerPage);

      } catch (error) {
        console.error('Error fetching movies:', error);
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

  const paginationItems = [];
  if (totalPages) {
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item key={ number } onClick={ () => handlePageChange(number) } className={ page === number ? 'active' : '' }>
          { number }
        </Pagination.Item>
      );
    }
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
        { currentPageCards ? currentPageCards.map((card: any, index: any) => (
          <Col key={ index }>
            <CustomCard { ...card } />
          </Col>
        )) : null }
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