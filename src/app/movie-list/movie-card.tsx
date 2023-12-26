"use client"
import React from 'react';
import { Card } from 'react-bootstrap';

export default function CustomCard({ imageUrl, title, publishYear }: any) {
  return (
    <Card style={ { border: 'unset', width: '100%', height: '100%', flexShrink: 0, backgroundColor: '#092C39', padding: '10px', borderRadius: '12px' } }>
      <Card.Img
        variant="top"
        src={ imageUrl }
        className='w-100 h-100 mb-3'
        style={ { borderRadius: '12px' } }
      />
      <Card.Body className='text-white d-flex p-0 flex-column'>
        <Card.Title >{ title }</Card.Title>
        <Card.Text className='mb-3'>{ publishYear }</Card.Text>
      </Card.Body>
    </Card>
  );
};