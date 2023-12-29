"use client"
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Button, Spinner } from 'react-bootstrap';
import axios from '../services/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import plus from '../../assets/images/plus.svg';
import logout from '../../assets/images/logout.svg';
import CustomCard from '../movie-list/movie-card';
import './movies.css';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import '../../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import signinImage from '../../assets/images/sign-in.jpg';
import '../globals.css';

export default function Movies() {
  const router = useRouter();
  const [ currentPageCards, setCurrentPageCards ] = useState([]);
  const [ page, setPage ] = useState(1);
  const cardsPerPage = 8;
  const [ totalPages, setTotalPages ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`api/movies?take=${cardsPerPage}&skip=${cardsPerPage * (page - 1)}`);
        const { items, total } = response.data;
        setTotalPages(Math.ceil(total / cardsPerPage));
        setCurrentPageCards(items);
      } catch (error: any) {
        toast.error(error.message);
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ page ]);

  const handlePageChange = (pageNumber: any) => setPage(pageNumber);
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  }

  return (
    <>
      <div style={ {
        backgroundImage: `url(${signinImage.src})`,
        backgroundSize: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#093545',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      } }>
        { loading && (
          <div className='vh-100 d-flex justify-content-center align-items-center z-3 overlay'>
            <div className='spinner-container'>
              <Spinner animation='border' variant='primary' />
            </div>
          </div>
        ) }
        { !currentPageCards.length && !loading ? (
          <div className='vh-100 d-flex justify-content-center align-items-center'>
            <Container>
              <Row className='justify-content-center text-white'>
                <Col md={ 6 } className='p-4 rounded'>
                  <h2 className='text-center empty-title'>{ t('movie_list_is_empty') }</h2>
                  <Button onClick={ () => router.push('/movie-action/0') } variant="primary" type="button" className='d-flex add-movie-button m-auto btn-primary-custom py-3 px-4 regular-body'>
                    { t('add_new_movie') }
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <div className='text-white'>
            <div className="movie-head d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h2 className="">{ t('my_movies') }
                <Image src={ plus } alt='add movies' width={ 32 } className='ms-3 cursor-pointer' onClick={ () => router.push('/movie-action/0') } />
              </h2>
              <div className='d-flex'>
                <LanguageSwitcher className="me-2"></LanguageSwitcher>
                <div onClick={ handleLogout } className='cursor-pointer d-flex align-items-center'>
                  <span className='regular-body'>{ t('logout') }
                    <Image src={ logout } alt='add movies' width={ 18 } className='ms-3' />
                  </span>
                </div>
              </div>
            </div>
            <Row xs={ 2 } md={ 2 } lg={ 4 } className="g-custom custom-spacing">
              { currentPageCards.map((card: any, index) =>
                <Col key={ index } className='movie-col'>
                  <CustomCard { ...card } />
                </Col>
              ) }
            </Row>
            <Container className='d-flex justify-content-center pagination-padding'>
              <Pagination className='custom-pagination'>
                <Pagination.Prev onClick={ () => handlePageChange(page - 1) } disabled={ page === 1 } className='prev'>{ t('prev') }</Pagination.Prev>
                { Array.from({ length: totalPages }, (_, index) => index + 1).map((number) =>
                  <Pagination.Item key={ number } active={ number === page } onClick={ () => handlePageChange(number) }>{ number }</Pagination.Item>) }
                <Pagination.Next onClick={ () => handlePageChange(page + 1) } disabled={ page === totalPages } className='next'>{ t('next') }</Pagination.Next>
              </Pagination>
            </Container>
          </div>
        ) }
      </div>
    </>
  );
}
