import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import openSocket from 'socket.io-client';
import { sendMoveData } from './client';
import { updateState } from './client';
import { newPlayer } from './client';
import { getScore } from './client';
import { disconnectGame } from './client';

class Game extends React.Component {


  constructor() {
    super();
    this.state = {
      joinGame: <button onClick={this.createNewPlayer.bind(this)}>Join Game</button>,
      leaveGame: "",
      playerList: [],
      displayList: [],
      player:{
        up:false,
        down:false,
        left:false,
        right:false,
      },
    };

    updateState((data) => {
      var moveData = {
        userName: this.props.userName,
        userId: this.props.userCookie,
        move: this.state.player,

      }
      sendMoveData(moveData)

      this.setState({playerList:[]})
      while(document.querySelector("#gameMap").firstChild){
        document.querySelector("#gameMap").removeChild(document.querySelector("#gameMap").firstChild)
      }
      for (var key in data){
        if (data.hasOwnProperty(key)){
          if (data[key].type === 'player'){
            var unit = document.createElement("div")
            unit.style.boxSizing = "border-box"
            unit.style.borderRadius = "25%"
            unit.style.maxWidth = 10+"px"
            unit.style.width = 10+"px"
            unit.style.maxHeight = 10+"px"
            unit.style.height = 10+"px"
            unit.style.position = "absolute"
            unit.style.textAlign = "center"
            unit.style.color ="white"
            if (data[key].userId === this.props.userCookie){
              unit.style.backgroundColor = "green"
            }else{
              unit.style.backgroundColor = "blue"
            }
            unit.style.margin = "0 auto"
            unit.style.top = data[key].y + "px"
            unit.style.left = data[key].x + "px"
            document.querySelector("#gameMap").appendChild(unit)
            this.setState({playerList:[data[key], ...this.state.playerList]})
          }
          if (data[key].type === 'enemy'){
            var unit = document.createElement("div")
            unit.style.width = 10+"px"
            unit.style.height = 10+"px"
            unit.style.position = "absolute"
            unit.style.backgroundColor = "red"
            unit.style.top = data[key].y + "px"
            unit.style.left = data[key].x + "px"
            unit.id = data[key].id
            document.querySelector("#gameMap").appendChild(unit)
          }
        }
      }
      var showList = this.state.playerList.map((obj, index)=>{
        return  <tr key={index}><td>{obj.name}</td><td></td><td>{obj.score}</td></tr>
      })
      this.setState({displayList: showList})
    });

    getScore((data)=>{
      var componentThis = this
      var jsonData = JSON.stringify(data)
      var responseHandler = function() {
        var usableData = JSON.parse(this.responseText)
        componentThis.props.getLatestScore(usableData)
        componentThis.setState({
          joinGame: <button onClick={componentThis.createNewPlayer.bind(componentThis)}>Join Game</button>,
          leaveGame: "",
        })
      };
      var request = new XMLHttpRequest();
      request.addEventListener("load", responseHandler);
      var url = "/submitscore";
      request.open("POST", url);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      request.send("data="+jsonData);
    })
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.deletePlayer);
    document.addEventListener('keydown',this.keyDown.bind(this),true)
    document.addEventListener('keyup',this.keyUp.bind(this),true)
  }

  createNewPlayer(){
    var data = {
      userName: this.props.userName,
      userId: this.props.userCookie,
    }
    newPlayer(data)
    this.setState({
      joinGame: "",
      leaveGame: <button onClick={this.deletePlayer.bind(this)}>Leave Game</button>,
    })
  }

  deletePlayer(){
    disconnectGame()
    this.setState({
      joinGame: <button onClick={this.createNewPlayer.bind(this)}>Join Game</button>,
      leaveGame: "",
    })
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
        <h1>May the best player survive...</h1>
        <div style={{display: "flex", flexDirection:"row", justifyContent:"space-around"}}>
          <div>
            <div id="gameMap" style={{position:"relative",backgroundColor:"black", minHeight:"500px", minWidth:"500px", overflow:"hidden"}}></div>
          </div>
          <div style={{minHeight:"200px", minWidth:"200px", backgroundColor:"rgba(20,20,20,0.5)",borderRadius:"25px"}}>
            <table cellPadding="10">
            <thead>
              <tr><th colSpan="3">Player List</th></tr>
              <tr><td>Player Name</td><td></td><td>Score</td></tr>
            </thead>
            <tbody>
              {this.state.displayList}
            </tbody>
            </table>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
            {this.state.joinGame}
            {this.state.leaveGame}
            <button onClick={()=>{window.location.reload()}}>Logout</button>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  // sendLatestScore:PropTypes.func.isRequired,
};

export default Game;
