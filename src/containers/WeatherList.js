import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import Message from '../components/Message';
import Map from '../components/Map';
import _ from 'lodash';

class WeatherList extends Component {

    // Function to render the list of Cities with temperature, pressure and humidity
    renderWeather = (cityData) => {
        // console.log('cityData', cityData);
        // City Name Eg.: Sydney
        const name = cityData.city.name;
        const lat = cityData.city.coord.lat;
        const lon = cityData.city.coord.lon;

        // TO-DO: This map function returns a 5 day forecast with intervals of 3hours for every
        //          day maybe is a good idea to show the temperatures based on the users actual
        //          time, so if user's time is 2pm we will want to show forecast for a time similar,
        //          ignoring temperature for morning and night time.
        // TO-DO: We can also try to calculate an all day average temperature.
        // TO-DO: Perhaps we can show the Minimum and Maximun temperatures on the Tooltip.
        // Map the Forecast List returning an Array of objects
        // Eg.: [{name: '06/02', temp: 20, pressure: 1000, humidity: 80}, {...}]
        const data = cityData.list.map(function(value, index) {
            // console.log('value', value);
            let milliseconds = value.dt * 1000;
            const dateObj = new Date(milliseconds);
            const day = dateObj.toLocaleDateString("en-US", {day: "2-digit"});
            const month = dateObj.toLocaleDateString("en-US", {month: "2-digit"});
            return {
                name: `${day}/${month}`,
                temp: _.round(value.temp.day),
                pressure: _.round(value.pressure),
                humidity: _.round(value.humidity)
            }
        }).filter((value) => {return value !== null});

        // Simple array with only the axis X labels. For this app it is a Date format dd/mm
        const xAxis = data.map((item) => {return item.name})

        return (
            <tr key={name} className="center aligned">
                <td>
                    {/* <h4>{name}</h4> */}
                    <Map lat={lat} lon={lon} width={200} height={180} zoom={12} />
                </td>
                <td>
                    <div style={{width: "100%"}}>
                        <Chart data={data} _key="temp" unit="°C" color="#8884d8" xAxis={xAxis} />
                        Average: {_.round(_.mean(data.map((value) => value.temp)))} °C
                    </div>
                </td>
                <td>
                    <div style={{width: "100%"}}>
                        <Chart data={data} _key="pressure" unit="hPa" color="#ffc658" xAxis={xAxis} />
                        Average: {_.round(_.mean(data.map((value) => value.pressure)))} hPa
                    </div>
                </td>
                <td>
                    <div style={{width: "100%"}}>
                        <Chart data={data} _key="humidity" unit="%" color="#82ca9d" xAxis={xAxis} />
                        Average: {_.round(_.mean(data.map((value) => value.humidity)))} %
                    </div>
                </td>
            </tr>
        )
    }

    showError = () => {
        return (
            <Message message={this.props.errors} timeout={5000} type="error" />
        )
    }

    showSuccess = () => {
        return (
            <Message message="Showing 5 day forecast" timeout={5000} type="success" />
        )
    }

    render() {


        return (
            <>
                {
                    (this.props.errors) ? this.showError() : null
                }

                <table className="ui very basic selectable padded small table weather_list">
                    <thead>
                        <tr>
                            <th className="center aligned">City</th>
                            <th className="center aligned">Temperature (C)</th>
                            <th className="center aligned">Pressure (hPa)</th>
                            <th className="center aligned">Humidity (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.props.weather.map(this.renderWeather)
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

function mapStateToProps({ weather, errors }) {
    return { weather, errors }; // Identical to { weather: weather }
};

export default connect(mapStateToProps)(WeatherList);