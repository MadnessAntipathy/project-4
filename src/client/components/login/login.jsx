import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username:"",
      password:"",
      createUser:"",
      createPass:""
    };
  }

  getUser(e){
    this.setState({
      username:e.target.value
    })

  }
  getPass(e){
    this.setState({
      password:e.target.value
    })
  }
  newUser(e){
    this.setState({
      createUser:e.target.value
    })
  }
  newPass(e){
    this.setState({
      createPass:e.target.value
    })
  }


  render() {
    return (
      <div style={{verticalAlign:"middle",color:"white",display:"flex",flexDirection:"column",minWidth:"50%",padding:"0",margin:"0 auto", textAlign:"center", border:"1px solid black", borderRadius:"25px"}}>
        <div style={{margin:"5%"}}>
          <h2>Already have an account? Lets play!</h2>
          <label>Username:</label>
          <input type="text" onChange={this.getUser.bind(this)}></input><br/>
          <label>Password:</label>
          <input type="password" onChange={this.getPass.bind(this)}></input><br/>
          <button onClick={this.props.getUserInfo.bind(this,this.state.username,this.state.password)}>Login</button><br/><br/>
        </div>
        <div style={{margin:"5%"}}>
          <h2>Create a new account</h2>
          <label>Username:</label>
          <input type="text" onChange={this.newUser.bind(this)}></input><br/>
          <label>Password:</label>
          <input type="password" onChange={this.newPass.bind(this)}></input><br/>
          <button onClick={this.props.getNewUserInfo.bind(this,this.state.createUser,this.state.createPass)}>Create User</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getNewUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

export default Login;
