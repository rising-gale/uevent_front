import React, { useState } from 'react';
import Map from './Map';
import { useJsApiLoader } from '@react-google-maps/api';
import PlacesAutocomplete from './Autocomplete';

const API_KEY = process.env.REACT_APP_API_KEY;

// const defaultCenter = {
//     lat: 50.449709821421386,
//     lng: 30.52762771951049
// };
const libraries = ['places'];

const MapContainer = ({center, creationMode, searchBar, setPlace}) => {
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries
    })
    
    // console.log('Place:', place)
    return isLoaded ? (
        <div className='w-11/12 h-80 flex flex-col'>
            {searchBar ? <PlacesAutocomplete isLoaded={isLoaded} setPlace={setPlace}/> : <></>}
            <Map center={center} creationMode={creationMode}/>
        </div>
    ) : <div>Loading ... </div>
}

export default MapContainer;
