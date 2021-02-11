import { FETCH_WEATHER } from '../actions/types';

const weather = (state = [], action) => {
    switch (action.type) {
        case FETCH_WEATHER:
            return [ action.payload, ...state ];
        default:
            return state;
    }
};

export default weather;