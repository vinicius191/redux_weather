import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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
            style={{margin:"0 auto"}}
        />
    )
}

export default Map;