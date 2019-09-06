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
      latestScore: ""
    };

  }

  componentDidMount(){
    this.setState({latestScore:""})
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
          login:"",
          userCookie:usableData[0].id,
          userName:usableData[0].name,
          score: <Score userName={usableData[0].name} userCookie={usableData[0].id}/>,
          invalidLogin:"",
          gamePage: <Game userName={usableData[0].name} userCookie={usableData[0].id}/>
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
        userCookie:usableData[0].id,
        userName:usableData[0].name,
        score: <Score userName={usableData[0].name} userCookie={usableData[0].id}/>,
        invalidLogin:"",
        gamePage: <Game userName={usableData[0].name} userCookie={usableData[0].id}/>
      })
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/create";
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send("data="+jsonData);
  }

  getLatestScore(info){
    console.log(info)
    this.setState({latestScore:info[0].scores})
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
