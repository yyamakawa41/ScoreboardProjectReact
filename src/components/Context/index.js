import React, { Component } from 'react';

const ScoreboardContext = React.createContext();

export class Provider extends Component{
    
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
          },
          {
            name: "Ollie",
            score: 0,
            id: 6
          }
        ]
      };
    
    // player id counter
  prevPlayerId = 6;

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
    
    render () {
        return (
            <ScoreboardContext.Provider value={{
                players: this.state.players,
                actions: {
                  changeScore: this.handleScoreChange,
                  removePlayer: this.handleRemovePlayer,
                  addPlayer: this.handleAddPlayer
                }
              }}>
                { this.props.children }
              </ScoreboardContext.Provider>
        );
    }
}

export const Consumer = ScoreboardContext.Consumer;