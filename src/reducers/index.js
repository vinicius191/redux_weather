import { combineReducers } from 'redux';
import app from './app';
import weather from './weather';
import errors from './errors';

export default combineReducers({
    app: app,
    weather: weather,
    errors: errors
});