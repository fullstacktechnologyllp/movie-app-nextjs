"use client";
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './movie-action.css';
import fileDownload from '../../../assets/images/file_download.svg';

export default function MovieForm({ params }: any) {
  console.log(params)
  const fileInputStyles: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  };
  const previewStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const [ previewUrl, setPreviewUrl ]: any = useState<string | ArrayBuffer | null>('');
  const [ selectedYear, setSelectedYear ] = useState<Date | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[ 0 ];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Container className='pt-5 text-white'>
        <div className="text-left pt-5 mb-5">
          <h2 className='text-white'>Create a new movie </h2>
        </div>
        <Row>
          <Col md={ 4 }>
            <div className="position-relative upload-box">
              <input
                type="file"
                style={ fileInputStyles }
                onChange={ handleFileUpload }
                accept="image/*"
              />
              { previewUrl && (
                <Image src={ previewUrl } alt="Preview" layout="fill" objectFit="cover" style={ previewStyles } />
              ) }
              { !previewUrl && (<>
                <div className="position-absolute top-50 start-50 translate-middle text-center d-grid small-body">
                <Image src={ fileDownload } alt='file-upload' className='m-auto mb-2'/>
                  Drop an image here
                </div>
              </>) }
            </div>
          </Col>
          <Col md={ 1 }>
          </Col>
          <Col md={ 6 }>
            <Form>
              <Form.Group controlId="movieName">
                <Form.Control type="text" placeholder="Title" className='mb-3 w-75  custom-input' />
              </Form.Group>
              <Form.Group controlId="publishYear" className='mb-5'>
                <DatePicker
                  selected={ selectedYear }
                  onChange={ (date: Date | null) => setSelectedYear(date) }
                  className="form-control"
                  dateFormat="yyyy"
                  showYearPicker
                  placeholderText="Publishing year"
                />
              </Form.Group>
              <div className="mb-2">
                <Button variant="primary" className='me-lg-3 btn btn-md regular-body btn-transparent'>
                  Cancel
                </Button>{ ' ' }
                <Button className='btn-primary-custom btn btn-md regular-body'>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
