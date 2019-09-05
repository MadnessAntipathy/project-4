import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import openSocket from 'socket.io-client';
// import { subscribeToTimer } from './client';
import { sendMoveData } from './client';
import { updateState } from './client';
import { newPlayer } from './client';
import { getMoveInfo } from './client';
import { disconnectGame } from './client';

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      player:{
        up:false,
        down:false,
        left:false,
        right:false,
      },
      newPlayer: false,
      connection: true
    };
    updateState((data) => {
      while(document.querySelector("#gameMap").firstChild){
        document.querySelector("#gameMap").removeChild(document.querySelector("#gameMap").firstChild)
      }
      for (var key in data){
        if (data.hasOwnProperty(key)){
            var unit = document.createElement("div")
            unit.style.width = 10+"px"
            unit.style.height = 10+"px"
            unit.style.position = "absolute"
            unit.style.backgroundColor = "red"
            unit.style.top = data[key].y + "px"
            unit.style.left = data[key].x + "px"
            unit.innerHTML = data[key].name
            document.querySelector("#gameMap").appendChild(unit)
        }
      }
    });

    getMoveInfo(() => {
      var moveData = {
        userName: this.props.userName,
        userId: this.props.userCookie,
        move: this.state.player,
        connection: this.state.connection
      }
      sendMoveData(moveData)
    });

  }

  componentWillUnmount(){
    document.removeEventListener('keydown',this.keyDown.bind(this),true)
    document.removeEventListener('keyup',this.keyUp.bind(this),true)

    disconnectGame()
  }

  componentDidMount(){
    document.addEventListener('keydown',this.keyDown.bind(this),true)
    document.addEventListener('keyup',this.keyUp.bind(this),true)
    console.log(this.state)
  }

  createNewPlayer(){
    var componentThis = this
    var data = {
      userName: this.props.userName,
      userId: this.props.userCookie,
    }
    newPlayer(data)
    this.setState({newPlayer:true})
  }

  getGameState(){
    console.log("```````````````````````````````this.state```````````````````````````````")
    console.log(this.state)
  }

  offConnection(){
    this.setState({connection:false})
  }

  onConnection(){
    this.setState({connection:true})
  }

  keyUp(event){
    this.listenForKey(event,false)
  }
  keyDown(event){
    this.listenForKey(event,true)
  }

  listenForKey(e,type){
    e.preventDefault()
    if (e.which === 38){
      this.setState(state=>{
        state.player.up=type
      })
    }
    if (e.which === 40){
      this.setState(state=>{
        state.player.down=type
      })
    }
    if (e.which === 37){
      this.setState(state=>{
        state.player.left=type
      })
    }
    if (e.which === 39){
      this.setState(state=>{
        state.player.right=type
      })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.props.getScorePage.bind(this)}>Go to score</button>
        <p>The game starts here...</p>
        <div id="gameMap" style={{position:"relative",backgroundColor:"black", height:"500px", width:"500px"}}>

        </div>

        <div className="App">
          <p className="App-intro">
            <button onClick={this.createNewPlayer.bind(this)}>Join Game</button>
          </p>
          <button onClick={this.getGameState.bind(this)}>Get game state</button>
          <button onClick={this.offConnection.bind(this)}>Turn off connection</button>
          <button onClick={this.onConnection.bind(this)}>Turn on connection</button>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  getScorePage: PropTypes.func.isRequired,
};

export default Game;
