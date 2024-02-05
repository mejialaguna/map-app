import { memo, useCallback, useEffect } from 'react';

interface GeolocationErrorProps {
  errorMessage: string;
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export const GeolocationError = memo(
  ({
    errorMessage,
    isModalOpen,
    setModalOpen,
  }: GeolocationErrorProps): JSX.Element => {

    useEffect(() => {
      if (errorMessage) setModalOpen(true);
    }, [errorMessage, setModalOpen]);

    const closeModal = useCallback(() => {
      setModalOpen(false);
    }, [setModalOpen],); 

    return (
      <div className='flex-col items-center justify-center h-screen'>
        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center'>
            <div className='bg-white pt-3 pb-6 px-6 rounded shadow-md'>
              <div className='flex justify-end'>
                <span onClick={closeModal} className=' cursor-pointer'>
                  &times;
                </span>
              </div>
              <div className='flex flex-row my-auto mb-4 items-center justify-between'>
                <svg
                  className='h-6 w-6 text-red-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                  ></path>
                </svg>
                <h2 className=' ml-5 text-2xl font-bold'>There is an Error</h2>
              </div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
