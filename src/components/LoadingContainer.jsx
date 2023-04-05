import React from 'react';
import '../styles/LoadingScreen.css'
const LoadingContainer = () => {
    return (
        <div className="w-full h-screen z-50 overflow-hidden bg-dark-purple opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4  h-12 w-12 mb-4"></div> {/* border-gray-200 */}
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    );
}

export default LoadingContainer;
