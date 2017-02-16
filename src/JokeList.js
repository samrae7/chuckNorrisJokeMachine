import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

import './App.css';

class JokeList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let jokes = this.props.jokes;

    function createListItems(joke) {
      return <ListItem
        key={joke.id}
        primaryText={joke.joke}
        leftAvatar={<Avatar src="https://raw.githubusercontent.com/lmammino/norrisbot/master/icon.jpg" />}
      />
    }

    var listItems = jokes.map(createListItems);

    return (
      <List>
        {listItems}
      </List>
    );
  }
}

export default JokeList;
