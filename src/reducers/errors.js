
const errors = (state = null, action) => {
    if(action.type === "RESET_FETCH_WEATHER_ERROR") {
        return null;
    } else if(action.type === "FETCH_WEATHER_ERROR") {
        return action.payload;
    }

    return state;
}

export default errors;