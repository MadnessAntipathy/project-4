import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import Score from '../score/score';
import styles from './style.scss';
import { sendMoveData } from './client';
import { updateState } from './client';
import { newPlayer } from './client';
import { getScore } from './client';
import { disconnectGame } from './client';
import { scoreIsReady } from './client';

class Game extends React.Component {


  constructor() {
    super();
    this.state = {
      joinGame: <div className={styles.gameButton} onClick={this.createNewPlayer.bind(this)}>Join Game</div>,
      leaveGame: "",
      playerList: [],
      displayList: [],
      player:{
        up:false,
        down:false,
        left:false,
        right:false,
      },
      showLegend:"src-client-components-game--style_onLegend",
      isLegend: true,
      legendButton: "src-client-components-game--style_legendaryButtonOn",
      legendInstructions: "Click Here To Hide Legendary Instructions",
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
            unit.style.zIndex = 2
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
            unit = document.createElement("div")
            unit.style.width = 10+"px"
            unit.style.height = 10+"px"
            unit.style.zIndex = 2
            unit.style.position = "absolute"
            if (data[key].direction === "seeker"){
              unit.style.backgroundColor = "purple"
            }else{
              unit.style.backgroundColor = "red"
            }
            unit.style.top = data[key].y + "px"
            unit.style.left = data[key].x + "px"
            unit.id = data[key].id
            document.querySelector("#gameMap").appendChild(unit)
          }
          if (data[key].type === 'warning'){
            unit = document.createElement("div")
            unit.style.position = "absolute"
            unit.style.top = data[key].y +"px"
            unit.style.left = data[key].x +"px"
            unit.style.transform = "translate(-50%,-50%)"
            unit.style.zIndex = 1
            unit.style.width = 50+"px"
            unit.style.height = 50+"px"
            unit.style.backgroundColor = data[key].color
            unit.style.borderRadius = "50%"
            document.querySelector("#gameMap").appendChild(unit)
          }
        }
      }
      var showList = this.state.playerList.map((obj, index)=>{
        return  <tr key={index}><td style={{maxWidth:"100px", whiteSpace:"nowrap", overflowX:"hidden"}}>{obj.name}</td><td></td><td>{obj.score}</td></tr>
      })
      this.props.getCurrentScore(showList)
    });

    getScore((data)=>{
      var componentThis = this
      var jsonData = JSON.stringify(data)
      var responseHandler = function() {
        var usableData = JSON.parse(this.responseText)
        componentThis.props.getLatestScore(usableData)
        componentThis.setState({
          joinGame: <div className={styles.gameButton} onClick={componentThis.createNewPlayer.bind(componentThis)}>Join Game</div>,
          leaveGame: "",
        })
        scoreIsReady()
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
      leaveGame: <div className={styles.gameButton} onClick={this.deletePlayer.bind(this)}>Leave Game</div>,
    })
  }

  deletePlayer(){
    disconnectGame()
    this.setState({
      joinGame: <div className={styles.gameButton} onClick={this.createNewPlayer.bind(this)}>Join Game</div>,
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
    if (e.which === 38 || e.which === 87){
      this.setState(state=>{
        state.player.up=type
      })
    }
    if (e.which === 40 || e.which === 83){
      this.setState(state=>{
        state.player.down=type
      })
    }
    if (e.which === 37 || e.which === 65){
      this.setState(state=>{
        state.player.left=type
      })
    }
    if (e.which === 39 || e.which === 68){
      this.setState(state=>{
        state.player.right=type
      })
    }
    // if (e.which === 32 ){
    //   this.createNewPlayer()
    // }
  }

  showLegend(){
    this.setState({isLegend:!this.state.isLegend})
    if(this.state.isLegend){
      this.setState({
        showLegend:"src-client-components-game--style_offLegend",
        legendButton:"src-client-components-game--style_legendaryButtonOff",
        legendInstructions: "Click Here For Legendary Instructions"

      })
    }else{
      this.setState({
        showLegend:"src-client-components-game--style_onLegend",
        legendButton:"src-client-components-game--style_legendaryButtonOn",
        legendInstructions: "Click Here To Hide Legendary Instructions"
      })
    }
  }

  render() {
    return (
      <div className={styles.gameDetailsContainer}>
        <div className={styles.legendContainer}>
          <div className={this.state.legendButton} onClick={this.showLegend.bind(this)}>
          {this.state.legendInstructions}
          </div>
          <div className={this.state.showLegend}>
            <table cellPadding="5">
            <thead>
              <tr><th width="20%">Icon</th><th width="20%">Type</th><th width="60%">Description</th></tr>
            </thead>
            <tbody>
                <tr><td><div className={styles.smallOne} style={{backgroundColor:"green"}}></div></td><td>You</td><td>This is you, there are many others like you, but you are you.</td></tr>
                <tr><td><div className={styles.smallOne} style={{backgroundColor:"blue"}}></div></td><td>Friendly, maybe?</td><td>This is a friend, you can push your friend into the enemy and make them not your friend.</td></tr>
                <tr><td><div className={styles.smallOne} style={{backgroundColor:"red"}}></div></td><td>Enemy</td><td>This is an enemy, touch him and you are out! You can try to push your friend into it though.</td></tr>
                <tr><td><div className={styles.smallOne} style={{backgroundColor:"purple"}}></div></td><td>Enemy</td><td>Same as the red dude, but he will follow you for a while.</td></tr>
                <tr><td><div className={styles.spawner} style={{backgroundColor:"yellow"}}></div></td><td>Enemy</td><td>This is where the purple ones come out. You have about 5 seconds to get away from this before it starts to spawn purples.</td></tr>
                <tr><td><div className={styles.spawner} style={{backgroundColor:"purple"}}></div></td><td>Enemy</td><td>If you are standing next to this, RUN!!!</td></tr>
              </tbody>
            </table>
            <div className={styles.movementInstructions}>
              <h3>How to not get killed</h3>
              <p>Control your player with the WASD or arrow keys. You earn a point for each red or purple enemy evaded.</p>
              <p>Do your best! (Or worse, I am a programmer, not a cheerleader...)</p>
            </div>
          </div>
        </div>
        <div className={styles.mainGameContainer}>
          <h1>May the best player survive...</h1>
          <div className={styles.gameContainer}>
              <div>
                <div id="gameMap" style={{position:"relative",backgroundColor:"black",minHeight:"500px",minWidth:"500px",overflow:"hidden"}}></div>
              </div>
              <div>
                <Score currentScore={this.props.currentScore} serverGlobalScore={this.props.serverGlobalScore.bind(this)} latestScore={this.props.latestScore} personalScore={this.props.personalScore} globalScore={this.props.globalScore} userName={this.props.userName} userCookie={this.props.userCookie}/>
              </div>
          </div>
          <div className={styles.joinState}>
              {this.state.joinGame}
              {this.state.leaveGame}
              <div>
                <ReactAudioPlayer src="audio/TheVapors-TurningJapanese8bit.mp3" autoPlay controls/>
              </div>
              <div className={styles.gameButton} onClick={()=>{window.location.reload()}}>Logout</div>
          </div>
        </div>


      </div>
    );
  }
}

Game.propTypes = {
  userName: PropTypes.string.isRequired,
  userCookie: PropTypes.number.isRequired,
  latestScore: PropTypes.number.isRequired,
  getCurrentScore: PropTypes.func.isRequired,
  currentScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  personalScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  serverGlobalScore: PropTypes.func.isRequired,
  // sendLatestScore:PropTypes.func.isRequired,
};

export default Game;
