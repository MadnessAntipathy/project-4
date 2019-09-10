import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { globalScoreUpdate } from '../game/client';
var moment = require('moment');

class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      display: "",
      status: "cg",
      current: "rgba(0,0,0,0.5)",
      global: "",
      personal: "",
    };

    globalScoreUpdate(()=>{
      var componentThis = this
      var data = {
        userId: this.props.userCookie
      }
      var jsonData = JSON.stringify(data)
      var responseHandler = function() {
        var usableData = JSON.parse(this.responseText)
        var globalList = usableData.globalQuery.map((obj, index)=>{
          return <tr key={index} style={(obj.id === componentThis.props.userCookie)?{backgroundColor:"lightgreen"}:(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.name}</td><td></td><td>{obj.scores}</td></tr>
        })
        var personalList = usableData.personalQuery.map((obj, index)=>{
          return <tr key={index} style={(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.scores}</td><td></td><td>{moment(obj.created_at).fromNow()}</td></tr>
        })
        componentThis.props.serverGlobalScore(globalList,personalList)
        if (componentThis.state.status === "cg"){
          componentThis.setState({
            display: componentThis.returnCurrentGameScore()
          })
        }else if (componentThis.state.status === "ps"){
          componentThis.setState({
            display: componentThis.returnPersonalScore()
          })
        }else if (componentThis.state.status === "gs"){
          componentThis.setState({
            display: componentThis.returnGlobalScore()
          })
        }
      };
      var request = new XMLHttpRequest();
      request.addEventListener("load", responseHandler);
      var url = "/score";
      request.open("POST", url);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      request.send("data="+jsonData);
    });
  }

  shouldComponentUpdate(previous){
    if (this.props.currentScore === previous.currentScore){
      return true
    }else{
      if (this.state.status === "cg"){
        this.setState({
          display: this.returnCurrentGameScore()
        })
      }else if (this.state.status === "ps"){
        this.setState({
          display: this.returnPersonalScore()
        })
      }else if (this.state.status === "gs"){
        this.setState({
          display: this.returnGlobalScore()
        })
      }
      return false
    }
  }

  returnGlobalScore(){
    return(
      <table cellPadding="10" key={Math.floor(Math.random()*10)}>
      <thead>
        <tr><th colSpan="3">Top 50 Player Scores!</th></tr>
      </thead>
      <tbody>
        <tr><td>Player Name</td><td></td><td>Score</td></tr>
        {this.props.globalScore.length > 0 ? this.props.globalScore : null}
      </tbody>
      </table>
    )
  }

  returnPersonalScore(){
    return(
      <table cellPadding="10" key={Math.floor(Math.random()*10)}>
      <thead>
        <tr><th colSpan="3">My All Time Best</th></tr>
      </thead>
      <tbody>
        <tr><td>Score</td><td></td><td>Last Played</td></tr>
        {this.props.personalScore.length > 0 ? this.props.personalScore : null}
      </tbody>
      </table>
    )
  }
  returnCurrentGameScore(){
    return (
        <table cellPadding="10">
        <thead>
          <tr><th colSpan="3">Player List</th></tr>
        </thead>
        <tbody>
        <tr><td>Player Name</td><td></td><td>Score</td></tr>
        {this.props.currentScore.length > 0 ? this.props.currentScore : null}
        </tbody>
        </table>
    )
  }

  displayScore(input){
    if(input === "cg"){
      this.setState({
        display: this.returnCurrentGameScore(),
        status: "cg",
        current: "rgba(0,0,0,0.5)",
        global: "",
        personal: "",
      })
    }
    if(input === "gs"){
      this.setState({
        display: this.returnGlobalScore(),
        status: "gs",
        current: "",
        global: "rgba(0,0,0,0.5)",
        personal: "",
      })
    }
    if(input === "ps"){
      this.setState({
        display: this.returnPersonalScore(),
        status: "ps",
        current: "",
        global: "",
        personal: "rgba(0,0,0,0.5)",
      })
    }
  }

  render() {

    return (
      <div className={styles.scoreContainer}>
      <p>Your latest score: {this.props.latestScore}</p>
      <div>
        <div className={styles.buttonSelector} style={{backgroundColor:this.state.current}} onClick={this.displayScore.bind(this,"cg")}>Current Game</div>
        <div className={styles.buttonSelector} style={{backgroundColor:this.state.global}} onClick={this.displayScore.bind(this,"gs")}>Global Score</div>
        <div className={styles.buttonSelector} style={{backgroundColor:this.state.personal}} onClick={this.displayScore.bind(this,"ps")}>Personal Score</div>
      </div>

        <div className={styles.displayScores}>
          {this.state.display}
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  latestScore: PropTypes.number.isRequired,
  userCookie: PropTypes.number.isRequired,
  globalScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  personalScore: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentScore: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Score;
