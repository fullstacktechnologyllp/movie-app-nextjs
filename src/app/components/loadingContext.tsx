import React, { createContext, useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingContextProps {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  showLoader: () => { },
  hideLoader: () => { },
});

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider: React.FC = ({ children }: any) => {
  const [ loading, setLoading ] = useState(false);

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Spinner animation='border' variant='primary' />
          </div>
        </div>
      )}
    </LoadingContext.Provider>

  );
};
