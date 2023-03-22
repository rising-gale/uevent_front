import React from 'react';
import Map from './Map';
import { useJsApiLoader } from '@react-google-maps/api';

const API_KEY = process.env.REACT_APP_API_KEY;

// const defaultCenter = {
//     lat: 50.449709821421386,
//     lng: 30.52762771951049
// };

const MapContainer = ({center}) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })

    return isLoaded ? (
        <div className='w-11/12 h-64'>
            <Map center={center} />
        </div>
    ) : <div>Loading ... </div>
}

export default MapContainer;
