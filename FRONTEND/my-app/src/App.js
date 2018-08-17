import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import _ from 'lodash';
const API_URL = 'http://localhost:2000/searchName'

class Search extends Component {
  state = {
    query: '',
    results: []
  }
 points=[];
  getInfo =_.debounce(() => {
    axios.get(`${API_URL}/${this.state.query}`)
      .then((res) => {
        this.setState({
          results: res.data
        });
        this.points=this.state.results.map((element)=><li> {element.name} </li>);
        console.log(this.points);
        
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
        <ul> {this.points}</ul>
      </form>
    )
  }
}

export default Search

