import React, {Component} from 'react';
import { Provider} from './Context';
import Header from './Header';
import PlayerList from './PlayerList';
import AddPlayerForm from './AddPlayerForm';


class App extends Component {
  state = {
    players: [
      {
        name: "James",
        score: 0,
        id: 1
      },
      {
        name: "Jess",
        score: 0,
        id: 2
      },
      {
        name: "Jackie",
        score: 0,
        id: 3
      },
      {
        name: "Jen",
        score: 0,
        id: 4
      },
      {
        name: "Johnny",
        score: 0,
        id: 5
      }
    ]
  };

  // player id counter
  prevPlayerId = 5;

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    } 
    return null;
  }

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  }

  handleAddPlayer = (name) =>{
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId+=1
          }
        ]                 
      };
    });
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }


  render() {
    return (
      <Provider value={{
        players: this.state.players,
        actions: {
          changeScore: this.handleScoreChange
        }
      }}>
        <div className="scoreboard">
          <Header />
          <PlayerList removePlayer={this.handleRemovePlayer} />
          <AddPlayerForm addPlayer={this.handleAddPlayer}/>
        </div>
      </Provider>
    );
  }
}

export default App;
