import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';

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
    fullscreenControl: false
}

const Map = ({ center }) => {

    const mapRef = useRef(undefined)
    const [curMarker, setMarker] = useState(undefined);

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

    const onClick = (location) =>{
        if(curMarker)
        {
            setMarker(undefined);
        } else {
            let lat = location.latLng.lat();
            let lng = location.latLng.lng();
            // console.log('lat:',lat,' lng:',lng)
            setMarker({lat, lng});
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
            {/* <Marker position={center}/> */}
            <Marker position={curMarker} />
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    )
}

export default Map;
