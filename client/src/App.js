import React, { Component } from 'react';
import SearchForm from './SearchForm';
import WeatherListBox from './WeatherListBox';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { weatherList: [] };
    // binding
    this.addWeather = this.addWeather.bind(this);
    this.addComment = this.addComment.bind(this);
    this.removeWeather = this.removeWeather.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }
  addWeather(data) {
    this.setState({ weatherList: this.state.weatherList.concat(data) });
  }
  removeWeather(id) {
    axios.delete('/api/weather/' + id)
      .then(response => {
        let list = this.state.weatherList.concat();
        let indexItem = list.findIndex(weather => weather._id === id);
        list.splice(indexItem, 1);
        this.setState({ weatherList: list });
      });
  }
  addComment(comment, id) {
    axios.post('/api/weather/comments/add/', {
      id: id,
      comment: comment
    })
      .then(response => {
        let list = this.state.weatherList.concat();
        let found = list.find(weather => weather._id === id);
        found.comments.push(response.data);
        this.setState({ weatherList: list });
      });
  }
  removeComment(weatherId, commnetId) {
    axios.delete(`/api/weather/${weatherId}/comments/${commnetId}/`)
      .then(response => {
        let list = this.state.weatherList.concat();
        let found = list.find(weather => weather._id === weatherId);
        let findCommentIndex = found.comments.findIndex(comment => comment._id === commnetId);
        found.comments.splice(findCommentIndex, 1);
        this.setState({ weatherList: list });
      })
  }
  componentDidMount() {
    axios.get('/api/weathers')
      .then(res => {
        this.setState({ weatherList: res.data })
      });
  }
  render() {
    return (
      <div>
        <h2>Weather App</h2>
        <SearchForm addWeather={this.addWeather} />
        <WeatherListBox removeWeather={this.removeWeather} addComment={this.addComment} removeComment={this.removeComment} weatherList={this.state.weatherList} />
      </div>
    );
  }
}

export default App;
