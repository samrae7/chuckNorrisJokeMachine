import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import JokeList from './JokeList';
import axios, {} from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {jokes: []};
    this.addJoke = this.addJoke.bind(this);
  }

  getJoke() {
    return axios.get('https://api.icndb.com/jokes/random')
      .then((response) => {
        return response.data.value;
      })
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
        //replace '&quot' with "
        joke.joke = joke.joke.replace(/(&quot;)/g,"\"");
        jokeArray = jokeArray.filter(isRepeat, joke);
        jokeArray.unshift(joke);
        this.setState({
          jokes: jokeArray
        });
      });
  }

  render() {
    return(
      <div className="appContainer">
        <h1 className="appTitle">Chuck Norris Joke Generator</h1>
        <RaisedButton onClick={this.addJoke} label="Hit me"/>
        <JokeList jokes={this.state.jokes}/>
      </div>
    )
  }
}

export default App;
