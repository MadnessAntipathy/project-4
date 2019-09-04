import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

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
      }
    };
  }

  componentDidMount(){
    console.log("mounted!")
    document.addEventListener('keydown',(event)=>{
      this.listenForKey(event,true)
    })
    document.addEventListener('keyup',(event)=>{
      this.listenForKey(event,false)
    })
    setInterval(()=>{
      //emitting starts here
      console.log(this.state.player)
    },1000)
  }

  componentWillUnmount(){
    console.log("leaving!")
    //io disconnect happens here
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
