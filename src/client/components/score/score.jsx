import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { globalScoreUpdate } from '../game/client';
var moment = require('moment');

class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleScore: false,
      display: "",
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
        if (componentThis.state.toggleScore){
          componentThis.setState({
            display: componentThis.returnPersonalScore()
          })
        }else{
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

  componentDidMount(){
    if (this.state.toggleScore){
      this.setState({
        display: this.returnPersonalScore()
      })
    }else{
      this.setState({
        display: this.returnGlobalScore()
      })
    }
  }

  returnGlobalScore(){
    return(
      <table cellPadding="10" key={Math.floor(Math.random()*10)}>
      <thead>
        <tr><th colSpan="3"><h1>Top 50 Player Scores!</h1></th></tr>
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
        <tr><th colSpan="3"><h1>My All Time Best</h1></th></tr>
      </thead>
      <tbody>
        <tr><td>Score</td><td></td><td>Played on</td></tr>
        {this.props.personalScore.length > 0 ? this.props.personalScore : null}
      </tbody>
      </table>
    )
  }

  toggleScore(){
    this.setState({
      toggleScore: !this.state.toggleScore
    })
    if (this.state.toggleScore){
      this.setState({
        display: this.returnGlobalScore()
      })
    }else {
      this.setState({
        display: this.returnPersonalScore()
      })
    }
  }

  render() {

    return (
      <div className={styles.scoreContainer}>
        <h2>My latest score</h2>
        <h3>{this.props.latestScore}</h3>
        <br/><br/><br/>
        <button onClick={this.toggleScore.bind(this)}>Toggle Global and Player Score</button>
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
};

export default Score;
