"use client";
import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
// import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './movie-action.css';
import fileDownload from '../../../assets/images/file_download.svg';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from '../../services/api';
import { toast } from 'react-toastify';


export default function MovieForm() {
  const router = useRouter();
  const { id } = useParams<any>();
  const isUpdate = id && id !== '0';

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
    maxWidth: '373px',
    maxHeight: '400px',
  };

  const [ previewUrl, setPreviewUrl ]: any = useState<string | ArrayBuffer | null>('');
  const [ movieName, setMovieName ]: any = useState<string | ArrayBuffer | null>('');
  const [ selectedYear, setSelectedYear ] = useState<string | Date | any>(null);
  const [ uploadFile, setUploadFile ] = useState<string | Date | any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[ 0 ];
    setUploadFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (isUpdate) {

      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`/api/movies/${id}`);
          const { title, publishYear, imageUrl } = response.data.movie; // Adjust according to your API response structure
          console.log(publishYear);
          setMovieName(title);
          setSelectedYear(new Date(publishYear));
          console.log(selectedYear);
          setPreviewUrl(imageUrl); // Assuming this is the URL of the poster fetched from the API
        } catch (error) {
          console.error(error);
          // Handle error or set default values for the form
        }
      };

      fetchMovieDetails();
    }
  }, [ isUpdate ]);


  const movieUpsert = async (event: any) => {
    event.preventDefault();
    const selectedDate = new Date(selectedYear);
    const year: string = selectedDate.getFullYear().toString();
    try {
      const formData = new FormData();
      formData.append("title", movieName);
      formData.append("publishYear", year);
      formData.append("poster", uploadFile);
      console.log(uploadFile);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let upsertMovie;
      if (isUpdate) {
        upsertMovie = await axios.put(`/api/movies/${id}`, formData, config);
        toast.success('Movie updated successfully.');
        return router.push('/movies');
      }
      upsertMovie = await axios.post('/api/movies', formData, config);
      toast.success('Movie created successfully.');
      return router.push('/movies');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }


  }

  return (
    <>
      <Container className='pt-5 text-white'>
        <div className="text-left pt-5 mb-5">
          <h2 className='text-white'>Create a new movie </h2>
        </div>
        <Form onSubmit={ movieUpsert }>
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
                  <Image src={ previewUrl } alt="Preview" className='objectfit-cover' style={ previewStyles } />
                ) }
                { !previewUrl && (<>
                  <div className="position-absolute top-50 start-50 translate-middle text-center d-grid small-body">
                    <Image src={ fileDownload } alt='file-upload' className='m-auto mb-2' />
                    Drop an image here
                  </div>
                </>) }
              </div>
            </Col>
            <Col md={ 1 }>
            </Col>
            <Col md={ 6 }>
              <Form.Group controlId="movieName">
                <Form.Control type="text" placeholder="Title" value={movieName} className='mb-3 w-75  custom-input'
                  onChange={ (event) => setMovieName(event.target.value) } />
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
                <Button variant="primary" onClick={ () => router.push('/movies') } type="button"
                  className='me-lg-3 btn btn-md regular-body btn-transparent'>
                  Cancel
                </Button>
                <Button className='btn-primary-custom btn btn-md regular-body' type="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

      </Container>
    </>
  );
}
