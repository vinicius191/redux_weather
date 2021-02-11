import { STARTING_APP, APP_STARTED } from '../actions/types'

const INITIAL_STATE = {
    started: null,
    loading: null
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STARTING_APP:
            return { ...state, started: false, loading: true };
        case APP_STARTED:
            return { ...state, ...action.payload };
        default:
            return state;
    };
};

export default app;