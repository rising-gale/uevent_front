import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { setLocation } from '../redux/createEventSlice';
import { defaultTheme } from './Theme';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultOptions={

    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,    
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollWheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles:defaultTheme
    
}

const Map = ({ center, creationMode }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(undefined)
    const [curMarker, setMarker] = useState(undefined);
    // const location = useSelector(state => state.eventCreation.location);

    // console.log('Redux location : ', location);

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

    const onClick = (location) =>{
        if(!creationMode) return;
        if(curMarker)
        {
            setMarker(undefined);
            dispatch(setLocation(undefined));
        } else {
            let lat = location.latLng.lat();
            let lng = location.latLng.lng();
            // console.log('lat:',lat,' lng:',lng)
            setMarker({lat, lng});
            dispatch(setLocation({lat, lng}));
        }
    }
    // console.log(curMarker)
    return (
        <GoogleMap
            // ref={mapRef}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
            onClick={onClick}
            
        >
            <Marker position={center}/>
            <Marker position={curMarker} />
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    )
}

export default Map;
