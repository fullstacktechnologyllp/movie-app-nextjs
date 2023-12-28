"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function CustomCard({ imageUrl, title, publishYear, ...restParam }: any) {
  
  const router = useRouter();
  return (
    <Card className='movie-card w-100 h-100 cursor-pointer' onClick={ () => router.push(`/movie-action/${restParam.id}`) }>
      <Card.Img
        variant="top"
        src={ imageUrl }
        className='w-100 h-100 mb-3 object-fit-cover'
        style={ { borderRadius: '12px' } }
      />
      <Card.Body className='text-white d-flex p-0 flex-column'>
        <Card.Title >{ title }</Card.Title>
        <Card.Text className='mb-3'>{ publishYear }</Card.Text>
      </Card.Body>
    </Card>
  );
};