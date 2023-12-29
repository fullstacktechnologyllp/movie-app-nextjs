"use client";
import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './movie-action.css';
import fileDownload from '../../../assets/images/file_download.svg';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from '../../services/api';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import '../../../i18n';
import { useMediaQuery } from 'react-responsive';
import signinImage from '../../../assets/images/sign-in.jpg';
import '../../globals.css';

export default function MovieForm() {
  const router = useRouter();
  const { id } = useParams<any>();
  const isUpdate = id && id !== '0';
  const { t } = useTranslation();
  const [ isMobile, setIsMobile ] = useState(false);
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });

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
    // width: '100%',
    // height: '100%',
    // maxWidth: '373px',
    // maxHeight: '400px',
    width: '100%',
    height: '100%',
    maxWidth:'473px',
    maxHeight:'504px',
    borderRadius: '12px'
  };

  const [ previewUrl, setPreviewUrl ]: any = useState<string | ArrayBuffer | null>('');
  const [ movieName, setMovieName ]: any = useState<string | ArrayBuffer | null>('');
  const [ selectedYear, setSelectedYear ] = useState<string | Date | any>(null);
  const [ uploadFile, setUploadFile ] = useState<string | Date | any>(null);
  const [ loading, setLoading ] = useState(false);
  const [ errors, setErrors ] = useState({
    movieName: '',
    selectedYear: '',
    poster: '',
  });
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
          setLoading(true);
          const response = await axios.get(`/api/movies/${id}`);
          const { title, publishYear, imageUrl } = response.data.movie; // Adjust according to your API response structure
          setMovieName(title);
          setSelectedYear(new Date(publishYear, 0, 1));
          setPreviewUrl(imageUrl); // Assuming this is the URL of the poster fetched from the API
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isUpdate ]);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [ isMobileQuery ]);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const validateForm = () => {
    const newErrors = {
      movieName: movieName.trim() ? '' : t('errors.MOVIE_TITLE_IS_REQUIRED'),
      selectedYear: selectedYear ? '' : t('errors.MOVIE_PUBLISH_YEAR_IS_REQUIRED'),
      poster: isUpdate || uploadFile ? '' : t('errors.MOVIE_POSTER_IS_REQUIRED'),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };


  const movieUpsert = async (event: any) => {
    event.preventDefault();
    try {
      const formIsValid = validateForm();
      if (!formIsValid) {
        return;
      }
      setLoading(true);
      const selectedDate = new Date(selectedYear);
      const year: string = selectedDate.getFullYear().toString();
      const formData = new FormData();
      formData.append("title", movieName);
      selectedYear !== null ? formData.append("publishYear", year) : null;
      uploadFile ? formData.append("poster", uploadFile) : null;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let upsertMovie;
      if (isUpdate) {
        upsertMovie = await axios.put(`/api/movies/${id}`, formData, config);
        notifySuccess(t('success.movie_updated'));
        return router.push('/movies');
      }
      upsertMovie = await axios.post('/api/movies', formData, config);
      notifySuccess(t('success.movie_created'));
      return router.push('/movies');
    } catch (error: any) {
      console.error(error);
      notifyError(t(`errors.${error.message}`));
    } finally {
      setLoading(false);
    }
  }

  const validateMovieName = () => {
    let isValid = true;
    const newErrors = { ...errors, movieName: '' };

    if (!movieName.trim()) {
      newErrors.movieName = t('errors.MOVIE_TITLE_IS_REQUIRED');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateSelectedYear = () => {
    let isValid = true;
    const newErrors = { ...errors, selectedYear: '' };

    if (!selectedYear) {
      newErrors.selectedYear = t('errors.MOVIE_PUBLISH_YEAR_IS_REQUIRED');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePoster = () => {
    let isValid = true;
    const newErrors = { ...errors, poster: '' };

    if (!isUpdate && !uploadFile) {
      newErrors.poster = t('errors.MOVIE_POSTER_IS_REQUIRED');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


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
        <div className='text-white custom-container-space'>
          <div className="text-left">
            <span className={ `text-white ${isMobile ? 'h3' : 'h2'}` }>{ !isUpdate ? t('create_movie') : t('edit') } </span>
          </div>
          <Form onSubmit={ movieUpsert } className='form-space'>
            <Row className='g-0'>
              <Col md={ 6 } >
                <div className="position-relative upload-box">
                  <input
                    type="file"
                    style={ fileInputStyles }
                    onChange={ handleFileUpload }
                    accept="image/*"
                  />
                  { previewUrl && (
                    <Image src={ previewUrl } alt="Preview" className='object-fit-cover' style={ previewStyles } />
                  ) }
                  { !previewUrl && (<>
                    <div className="position-absolute top-50 start-50 translate-middle text-center d-grid small-body">
                      <Image src={ fileDownload.src } alt='file-upload' className='m-auto mb-2' />
                      { t('drop_image_here') }
                      { errors.poster && <div className="invalid-feedback d-block">{ errors.poster }</div> }
                    </div>
                  </>) }
                </div>

              </Col>
              {/* <Col md={ 2 } className='p-0 m-0'>
              </Col> */}
              <Col md={ 6 } className=''>
                <Form.Group controlId="movieName">
                  <Form.Control type="text" placeholder={ t('title') } value={ movieName }
                    className={ `bottom-24 ${isMobile ? 'w-100' : ''} movie-title custom-input ${errors.movieName && 'is-invalid'}` }
                    onChange={ (event: any) => setMovieName(event.target.value) }
                    onBlur={ (event: any) => validateMovieName() }
                  />
                  { errors.movieName && <div className="invalid-feedback d-block mt--2">{ errors.movieName }</div> }

                </Form.Group>
                <Form.Group controlId="publishYear" className=''>
                  <DatePicker
                    selected={ selectedYear }
                    onChange={ (date: Date | null) => setSelectedYear(date) }
                    onBlur={ (event: any) => validateSelectedYear() }
                    className={ `form-control publish-year bottom-24 ${errors.selectedYear && 'is-invalid'}` }
                    wrapperClassName={ `${isMobile ? 'w-100' : ''}` }
                    dateFormat="yyyy"
                    showYearPicker
                    placeholderText={ t('publish_year') }
                  />
                  { errors.selectedYear && <div className="invalid-feedback d-block">{ errors.selectedYear }</div> }

                </Form.Group>
                <div className={ `${isMobile ? 'd-flex justify-content-between' : ''}` }>
                  <Button variant="primary" onClick={ () => router.push('/movies') } type="button"
                    className='me-2 cancel-button regular-body btn-transparent'>
                    { t('cancel') }
                  </Button>
                  <Button className='btn-primary-custom submit-button regular-body' type="submit">
                    { t('submit') }
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

        </div>
      </div>
    </>
  );
}
