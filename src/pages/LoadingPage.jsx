import React from 'react';
import Header from '../components/Header';
import LoadingContainer from '../components/LoadingContainer';

const LoadingPage = () => {
    return (
        <div className='flex flex-col w-full h-full'>
            {/* <Header /> */}
            <LoadingContainer />
        </div>
    );
}

export default LoadingPage;
