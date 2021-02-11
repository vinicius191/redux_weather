import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export const Map = (props) => {
    const [viewPort, setViewPort] = useState({
        width: props.width,
        height: props.height,
        latitude: props.lat,
        longitude: props.lon,
        zoom: props.zoom,
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v9"
            {...viewPort}
            onViewportChange={setViewPort}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        />
    )
}

export default Map;