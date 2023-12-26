"use client";
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card, Pagination } from 'react-bootstrap';
import './movie-list.css';
import CustomCard from './movie-card';

// const CustomCard = ({ imageUrl, title, publishYear }: any) => {
//   return (
//     <Card style={ { border: 'unset', width: '100%', height: '100%', flexShrink: 0, backgroundColor: '#092C39', padding: '10px', borderRadius: '12px' } }>
//       <Card.Img
//         variant="top"
//         src={ imageUrl }
//         className='w-100 h-100 mb-3'
//         style={ { borderRadius: '12px' } }
//       />
//       <Card.Body className='text-white d-flex p-0 flex-column'>
//         <Card.Title >{ title }</Card.Title>
//         <Card.Text className='mb-3'>{ publishYear }</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

export default function MovieList() {
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
        <h2>My movies </h2>
        <div><span className='regular-body'>Logout</span> </div>
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