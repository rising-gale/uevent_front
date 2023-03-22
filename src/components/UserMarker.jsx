import { Marker } from '@react-google-maps/api';
import React from 'react';

const UserMarker = ({position}) => {
    return (
        <Marker position={position}/>
    );
}

export default UserMarker;
