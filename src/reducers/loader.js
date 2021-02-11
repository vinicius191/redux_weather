const initia_state = {
    isLoading: false
}

const loader = (state = initia_state, action) => {
    if(action.type === "FETCH_WEATHER_LOADING") {
        return {...state, isLoading: true};
    } else if(action.type === "FETCH_WEATHER_COMPLETED") {
        return {...state, isLoading: false};
    }

    return state;
}

export default loader;