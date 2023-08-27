import { STARTING_APP, APP_STARTED, FETCH_WEATHER, FETCH_WEATHER_LOADING, FETCH_WEATHER_COMPLETED } from './types';
import axios from 'axios';

export const startingApp = () => (dispatch) => {
    dispatch({
        type: STARTING_APP
    });
};

export const appStarted = () => (dispatch) => {
    dispatch({
        type: APP_STARTED,
        payload: { started: true, loading: false }
    })
};

export const fetchWeather = (city) => (dispatch) => {
    
    dispatch({type: 'RESET_FETCH_WEATHER_ERROR'});
    dispatch({type: FETCH_WEATHER_LOADING});

    return axios.get(`${process.env.REACT_APP_WEATHER_URL}${city},au`)
        .then(({data}) => {
            dispatch({type: FETCH_WEATHER_COMPLETED});
            return dispatch({
                type: FETCH_WEATHER,
                payload: data
            })
        })
        .catch((error) => {
            dispatch({type: FETCH_WEATHER_COMPLETED});
            return dispatch({
                type: 'FETCH_WEATHER_ERROR',
                payload: error.response.data.error
            })
        })
};


export const newSimpleFetchWeather = (city) => (dispatch) => {

    dispatch({type: 'RESET_FETCH_WEATHER_ERROR'});
    dispatch({type: FETCH_WEATHER_LOADING});

    // NEW
    // TODO: Add api endpoint to .env file
    const options = {
        params: {
          q: city,
          days: '3'
        },
        headers: {
          'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_WEATHER_KEY}`,
          'X-RapidAPI-Host': `${process.env.REACT_APP_RAPIDAPI_WEATHER_HOST}`
        }
    };

    return axios.get(`${process.env.REACT_APP_RAPIDAPI_WEATHER_URL}`, options)
        .then(({data}) => {
            dispatch({type: FETCH_WEATHER_COMPLETED});
            return dispatch({
                type: FETCH_WEATHER,
                payload: data
            })
        })
        .catch((error) => {
            dispatch({type: FETCH_WEATHER_COMPLETED});
            return dispatch({
                type: 'FETCH_WEATHER_ERROR',
                payload: error.response.data.error
            })
        })
}