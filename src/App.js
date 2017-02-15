import React, { Component } from 'react';
import axios, {} from 'axios';

import './App.css';

class JokesList extends Component {

  constructor(props) {
    super(props);
    this.state = {jokes: []};
    this.addJoke = this.addJoke.bind(this);
  }

  getJoke() {
    return axios.get('https://api.icndb.com/jokes/random')
      .then((response) => response.data.value)
      .catch((error) => console.log('error', error));
  }

  addJoke(event) {
    event.preventDefault();

    function isRepeat(value) {
      return value.id !== this.id;
    }

    this.getJoke()
      .then((joke) => {
        let jokeArray = this.state.jokes;
        jokeArray = jokeArray.filter(isRepeat, joke);
        jokeArray.unshift(joke);
        this.setState({
          jokes: jokeArray
        });
      });
  }

  render() {
    let jokes = this.state.jokes;

    function createListItems(joke) {
      return <li key={joke.id}>{joke.joke}</li>
    }

    var listItems = jokes.map(createListItems);

    return (
      <div>
        <form onClick={this.addJoke}>
          <button type="submit">Get another joke</button>
        </form>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="jokesListContainer">
        <JokesList/>
      </div>
    );
  }
}

export default App;
