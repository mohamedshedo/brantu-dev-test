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
 
  getInfo =_.debounce(() => {
    axios.get(`${API_URL}/${this.state.query}`)
      .then((res) => {

        if(!res||res.data.length===0){
          this.setState({
            results: [{name:"no product found"}]
          });
        }else{
        this.setState({
          results: res.data
        });
      }

      }).catch((err)=>{
        console.log(err.response);
      });
  },2000);

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 0) {
       
          console.log('change');
          this.getInfo()
        
      }else if(this.state.query.length<=1){
        this.setState({results:[]});
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
        
           <ul className="list-group text-center">
              {
                this.state.results.map(function(element,i) {
                  return <li className="list-group-item list-group-item-info" key={i}>{element.name}</li>
                })
              }
            </ul>
      </form>
    )
  }
}

export default Search

