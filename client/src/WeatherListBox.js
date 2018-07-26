import React, { Component } from 'react';
import WeatherBox from './WeatherBox';

class WeatherListBox extends Component {
    render() {
        return (
            <div className="weather-list-container">
                {this.props.weatherList.map(weather => {
                    return <WeatherBox
                        key={weather._id}
                        removeWeather={this.props.removeWeather}
                        addComment={this.props.addComment}
                        removeComment={this.props.removeComment}
                        id={weather._id}
                        name={weather.name}
                        icon={weather.icon}
                        feelslike_c={weather.feelslike_c}
                        text={weather.text}
                        comments={weather.comments} />
                }
                )}
            </div>
        );
    }
}

export default WeatherListBox;
