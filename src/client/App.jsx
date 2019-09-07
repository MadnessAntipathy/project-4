import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './components/login/login';
import Score from './components/score/score';
import Game from './components/game/game';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userCookie:"",
      userName:"",
      invalidLogin:"",
      latestScore: 0,
      globalScore: "",
    };
  }

  getLatestScore(info){
    this.setState({latestScore:info[0].scores})
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
          isLoggedIn: true,
          login:"",
          userCookie:usableData[0].id,
          userName:usableData[0].name,
          invalidLogin:"",
        })
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
      componentThis.setState({
        isLoggedIn: true,
        login:"",
        userCookie:usableData[0].id,
        userName:usableData[0].name,
        invalidLogin:"",
      })
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
      <div>
      <Game getLatestScore={this.getLatestScore.bind(this)} userName={this.state.userName} userCookie={this.state.userCookie}/>
      <Score latestScore={this.state.latestScore} globalScore={this.state.globalScore} userName={this.state.userName} userCookie={this.state.userCookie}/>
      </div>
    )
  }


  render() {
    if (this.state.isLoggedIn){
      var display = this.returnGame()
    }else{
      var display = <Login getUserInfo={this.getUserInfo.bind(this)} getNewUserInfo={this.getNewUserInfo.bind(this)}/>
    }
    if (this.state.invalidLogin){
      alert("Sorry! Incorrect username or password!")
      this.setState({invalidLogin:false})
    }
    return (
      <div style={{borderRadius:"25px",backgroundColor:"brown",display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", height:"100vh",width:"50%",margin:"0 auto"}}>
        {display}
      </div>
    );
  }
}
export default hot(module)(App);
