import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
// import { subscribeToTimer } from './client';
import { sendMoveData } from './client';
import { updateState } from './client';
import { newPlayer } from './client';
import { disconnectGame } from './client';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gameState:[],
      player:{
        up:false,
        down:false,
        left:false,
        right:false,
      },
      refresh: 5000,
      newPlayer: false,
      connection: true
    };
    updateState((err, data) => {
      if (this.state.connection === true){
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
      }
    });
  }

  createNewPlayer(){
    if (!this.state.newPlayer){
      var data = {
        userName: this.props.userName,
        userId: this.props.userCookie,
      }
      newPlayer(data)
      this.setState({newPlayer:true})

      this.game = setInterval(()=>{
        var data = {
          userName: this.props.userName,
          userId: this.props.userCookie,
          move: this.state.player
        }
        sendMoveData(data)
      },1000/60)
    }
  }

  componentDidMount(){
    console.log("mounted!")
    document.addEventListener('keydown',(event)=>{
      this.listenForKey(event,true)
    })
    document.addEventListener('keyup',(event)=>{
      this.listenForKey(event,false)
    })
  }


  componentWillUnmount(){
    console.log("leaving!")
    disconnectGame()
    this.setState({connection:false})
    clearInterval(this.game)

    //io disconnect happens here
  }

  leaveGame(){
    console.log("leaving!")
    disconnectGame()
    this.setState({connection:false})
    clearInterval(this.game)
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
        <button onClick={this.leaveGame.bind(this),this.props.getScorePage.bind(this)}>Go to score</button>
        <p>The game starts here...</p>
        <div id="gameMap" style={{position:"relative",backgroundColor:"black", height:"500px", width:"500px"}}>

        </div>

        <div className="App">
          <p className="App-intro">
            <button onClick={this.createNewPlayer.bind(this)}>Join Game</button>
          </p>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  getNewUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

Game.propTypes = {
  getScorePage: PropTypes.func.isRequired,
};

export default Game;
