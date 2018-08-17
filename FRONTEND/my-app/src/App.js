import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import _ from 'lodash';
const API_URL = 'https://localhost:2000/searchName'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo =_.debounce(() => {
    axios.get(`${API_URL}/${this.state.query}`)

      .then(( data ) => {
        this.setState({
          results: data.data // MusicGraph returns an object named data, 
                             // as does axios. So... data.data                             
        })
        console.log(data.data);
      }).catch((err)=>{
        console.log(err);
      });
  },1000);

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          console.log('change');
          this.getInfo()
        }
      } 
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    )
  }
}

export default Search

