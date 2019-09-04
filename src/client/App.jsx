import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './components/login/login';
import Score from './components/score/score';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login:<Login getUserInfo={this.getUserInfo.bind(this)} getNewUserInfo={this.getNewUserInfo.bind(this)}/>,
      score:"",
      gamePage:"",
      userCookie:"",
      userName:"",
      invalidLogin:""
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
      console.log(usableData)
      if (usableData.length > 0){
        componentThis.setState({
          login:"",
          userCookie:usableData.id,
          userName:usableData.name,
          score: <Score />,
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
        score: <Score />,
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

  render() {
    return (
      <div>
        {this.state.login}
        {this.state.invalidLogin}
        {this.state.score}
      </div>
    );
  }
}

export default hot(module)(App);
