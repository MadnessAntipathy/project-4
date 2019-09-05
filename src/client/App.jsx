import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './components/login/login';
import Score from './components/score/score';
import Game from './components/game/game';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login:<Login getUserInfo={this.getUserInfo.bind(this)} getNewUserInfo={this.getNewUserInfo.bind(this)}/>,
      score:"",
      gamePage:"",
      userCookie:"",
      userName:"",
      invalidLogin:"",
      
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
      // console.log("response text", this.responseText);
      // console.log("status text", this.statusText);
      // console.log("status code", this.status);
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        componentThis.setState({
          login:"",
          userCookie:usableData[0].id,
          userName:usableData[0].name,
          score: <Score getGamePage={componentThis.getGamePage.bind(componentThis)}/>,
          invalidLogin:""
        })
      }else{
        componentThis.setState({
          invalidLogin:<div><h1>Invalid Login!</h1></div>
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
      componentThis.setState({
        login:"",
        userCookie:usableData.id,
        userName:usableData.name,
        score: <Score getGamePage={componentThis.getGamePage.bind(componentThis)}/>,
        invalidLogin:""
      })
    };
    var request = new XMLHttpRequest();

    request.addEventListener("load", responseHandler);
    var url = "/create";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);

  }

  getGamePage(){
    console.log(this.state)
    this.setState({
      score:"",
      gamePage:<Game userName={this.state.userName} userCookie={this.state.userCookie} getScorePage={this.getScorePage.bind(this)}/>,
    })
  }

  getScorePage(){
    this.setState({
      score:<Score getGamePage={this.getGamePage.bind(this)}/>,
      gamePage:"",
    })
  }

  render() {
    return (
      <div>

        {this.state.login}
        {this.state.invalidLogin}
        {this.state.score}
        {this.state.gamePage}
      </div>
    );
  }
}

export default hot(module)(App);
