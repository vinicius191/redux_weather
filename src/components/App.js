import React from 'react';
import SearchBar from '../containers/SearchBar';
import WeatherList from '../containers/WeatherList';

export default class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <SearchBar />
                <WeatherList />
            </div>
        )
    }
};