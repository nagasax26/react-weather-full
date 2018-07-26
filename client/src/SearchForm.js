import React, { Component } from 'react';
import axios from 'axios';
// import crypto from 'crypto';

// const API_KEY = "ac91da03c2d944a3b1c70832182007";
// const url = "https://api.apixu.com/v1/current.json?key=ac91da03c2d944a3b1c70832182007&q=";

class SearchForm extends Component {
    constructor() {
        super();
        this.state = { inputText: "" };
        // binding functions
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleTextChange(e) {
        this.setState({ inputText: e.target.value });
    }
    handleFormSubmit(e) {
        e.preventDefault();
        axios.get(`/api/weather/${this.state.inputText}`)
            .then(response => { // response comes from the mongodb so no need to define a structure
                this.props.addWeather(response.data);
                this.setState({ inputText: "" });
            })
            .catch(err => console.log('Error: cannot fetch data please check the input', err));

    }
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input value={this.state.inputText} onChange={this.handleTextChange} type="text" />
                <button type="submit">GO!</button>
            </form>
        );
    }
}

export default SearchForm;
