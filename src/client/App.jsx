import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './components/login/login';
import Game from './components/game/game';

var moment = require('moment');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userCookie:"",
      userName:"",
      invalidLogin:"",
      latestScore: 0,
      globalScore: [],
      personalScore: [],
      currentScore: [],
    };
  }

  getUserInfo(username,password){
    var componentThis = this
    var data = {
      username:username,
      password:password
    }
    var jsonData = JSON.stringify(data)
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        componentThis.setState({
          isLoggedIn: false,
          login:"",
          userCookie:usableData[0].id,
          userName:usableData[0].name,
          invalidLogin:"",
        })
        componentThis.getGlobalScore()
      }else{
        componentThis.setState({
          invalidLogin:true
        })
      }
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/login";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);
  }

  getNewUserInfo(username,password){
    var componentThis = this
    var data = {
      username:username,
      password:password
    }
    var jsonData = JSON.stringify(data)
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        componentThis.setState({
          isLoggedIn: false,
          login:"",
          userCookie:usableData[0].id,
          userName:usableData[0].name,
          invalidLogin:"",
        })
        componentThis.getGlobalScore()
      }
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/create";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);
  }

  returnGame(){
    return (
      <div style={{border:"1px solid black", borderRadius:"25px", margin:"5%", padding:"5%", backgroundColor:"rgba(50,50,50,0.5)", width:"70%"}}>
      <Game currentScore={this.state.currentScore} getCurrentScore={this.getCurrentScore.bind(this)} serverGlobalScore={this.serverGlobalScore.bind(this)} personalScore={this.state.personalScore} globalScore={this.state.globalScore} latestScore={this.state.latestScore} getLatestScore={this.getLatestScore.bind(this)} userName={this.state.userName} userCookie={this.state.userCookie}/>
      </div>
    )
  }

  getCurrentScore(info){
    this.setState({currentScore:info})
  }

  getLatestScore(info){
    this.setState({latestScore:info[0].scores})
  }

  serverGlobalScore(globalList,personalList){
    this.setState({
      globalScore:globalList,
      personalScore:personalList,
    })
  }

  getGlobalScore(){
    var componentThis = this
    var data = {
      userId: this.state.userCookie
    }
    var jsonData = JSON.stringify(data)
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.globalQuery.length > 0){
        var globalList = usableData.globalQuery.map((obj, index)=>{
          return <tr key={index} style={(obj.id === componentThis.state.userCookie)?{backgroundColor:"lightgreen"}:(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.name}</td><td></td><td>{obj.scores}</td></tr>
        })
        var personalList = usableData.personalQuery.map((obj, index)=>{
          return <tr key={index} style={(index % 2)?{backgroundColor:"gray"}:{backgroundColor:"black"} }><td>{obj.scores}</td><td></td><td>{moment(obj.created_at).fromNow()}</td></tr>
        })
        componentThis.setState({
          isLoggedIn: true,
          globalScore:globalList,
          personalScore:personalList,
        })
      }else{
        componentThis.setState({
          isLoggedIn: true,
          globalScore:[],
          personalScore:[],
        })
      }
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/score";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);
  }

  render() {
    var display;
    if (this.state.isLoggedIn){
      display = this.returnGame()
    }else{
      display = <Login getUserInfo={this.getUserInfo.bind(this)} getNewUserInfo={this.getNewUserInfo.bind(this)}/>
    }
    if (this.state.invalidLogin){
      alert("Sorry! Incorrect username or password!")
      this.setState({invalidLogin:false})
    }
    return (
      <div style={{backgroundColor:"rgba(10 100,100,0.5)",display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", minHeight:"100vh",width:"100%",margin:"0 auto", position:"relative"}}>
        {display}
      </div>
    );
  }
}
export default hot(module)(App);
