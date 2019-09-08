import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { globalScoreUpdate } from '../game/client';


class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleScore: false,
      scoreList: [],
      displayList: [],
      showMyList:[],
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
        if (usableData.globalQuery.length > 0){
          var list = usableData.globalQuery.map((obj, index)=>{
            return <tr key={index} style={(obj.id === componentThis.props.userCookie)?{backgroundColor:"orange"}:(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.name}</td><td></td><td>{obj.scores}</td></tr>
          })
          var showMyList = usableData.personalQuery.map((obj, index)=>{
            return <tr key={index} style={(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.scores}</td><td></td><td>{obj.created_at.toString()}</td></tr>
          })
          componentThis.setState({
            scoreList:usableData,
            displayList: list,
            showMyList: showMyList,
          })
          if (componentThis.state.toggleScore){
            componentThis.setState({
              display: componentThis.returnGlobalScore()
            })
          }else {
            componentThis.setState({
              display: componentThis.returnPersonalScore()
            })
          }
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
    var componentThis = this
    var data = {
      userId: this.props.userCookie
    }
    var jsonData = JSON.stringify(data)
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      console.log(usableData)
      if (usableData.globalQuery.length > 0){
        var list = usableData.globalQuery.map((obj, index)=>{
          return <tr key={index} style={(obj.id === componentThis.props.userCookie)?{backgroundColor:"orange"}:(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.name}</td><td></td><td>{obj.scores}</td></tr>
        })
        var showMyList = usableData.personalQuery.map((obj, index)=>{
          return <tr key={index} style={(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.scores}</td><td></td><td>{obj.created_at.toString()}</td></tr>
        })
        componentThis.setState({
          scoreList:usableData,
          displayList: list,
          showMyList: showMyList,
        })
        if (componentThis.state.toggleScore){
          componentThis.setState({
            display: componentThis.returnGlobalScore()
          })
        }else {
          componentThis.setState({
            display: componentThis.returnPersonalScore()
          })
        }
      }
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/score";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);
  }

  returnGlobalScore(){
    return(
      <table cellPadding="10" key={Math.floor(Math.random()*10)}>
      <thead>
        <tr><th colSpan="3"><h1>Top 50 Player Scores!</h1></th></tr>
      </thead>
      <tbody>
        <tr><td>Player Name</td><td></td><td>Score</td></tr>
        {this.state.displayList}
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
        {this.state.showMyList}
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
        display: this.returnPersonalScore()
      })

    }else {
      this.setState({
        display: this.returnGlobalScore()
      })
    }
  }

  render() {
    return (
      <div style={{textAlign:"center", marginTop:"10%", color:"white", backgroundColor:"rgba(20,20,20,0.5)", borderRadius:"25px 25px 0px 0px"}}>
        <h2>My latest score</h2>
        <h3>{this.props.latestScore}</h3>
        <br/><br/><br/>
        <button onClick={this.toggleScore.bind(this)}>Toggle Global and Player Score</button>
        <div style={{height:"300px", overflowY:"auto"}}>
          {this.state.display}
        </div>
      </div>

    );
  }
}

Score.propTypes = {
  latestScore: PropTypes.number.isRequired,
};

export default Score;
