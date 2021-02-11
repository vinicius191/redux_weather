import { STARTING_APP, APP_STARTED, FETCH_WEATHER } from './types';
import axios from 'axios';
const FETCH_WEATHER_URL = "https://vinnie-weather-server.herokuapp.com/weather?city=";

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

    return axios.get(`${FETCH_WEATHER_URL}${city},au`)
        .then(({data}) => {
            return dispatch({
                type: FETCH_WEATHER,
                payload: data
            })
        })
        .catch((error) => {
            return dispatch({
                type: 'FETCH_WEATHER_ERROR',
                payload: error.response.data.error
            })
        })

    // const request = axios.get(`${FETCH_WEATHER_URL}${city},au`);

    // return {
    //     type: FETCH_WEATHER
    //     payload: request
    // };
};
