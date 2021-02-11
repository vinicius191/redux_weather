import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';
import _ from 'lodash';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();

        // We need to go and fetch weather data
        if(this.state.term === "") {
            // Show a error message somewhere
            return
        }

        let exists = _.find(this.props.weather, (item) => {
            return item.city.name.trim().toLowerCase() === this.state.term.trim().toLocaleLowerCase()
        });

        if(exists) {
            this.setState({term: ''});
            return
        }

        this.props.fetchWeather(this.state.term);
        this.setState({term: ''});

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ data: event.target[0].value })
        // }
        // fetch('http://localhost:4000/weather', requestOptions)
        //     .then(response => {
        //         if(response.ok) {
        //             console.log('response', response);
        //             return response;
        //         } else {
        //             console.log('error', response);
        //             throw Error(response.statusText);
        //         }
        //     })
        //     .then((response) => {
        //         console.log('all ok', response)
        //     })
        //     .catch(error => console.log('error', error));
    }

    render() {
        return (
            <form
                className="ui fluid action left icon input"
                onSubmit={this.onFormSubmit}
            >
                <input
                    type="text"
                    placeholder="Search a City..."
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <i className="search icon"></i>
                <button className="ui button" type="submit">Search</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

function mapStateToProps({ weather }) {
    return { weather }; // Identical to { weather: weather }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)