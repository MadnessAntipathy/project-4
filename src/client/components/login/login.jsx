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
      <div className={styles.overallLogin}>
        <img src='/images/dodging-with-friends.png' style={{borderRadius:"25px 25px 0px 0px",padding:"0px",width:"50%",height:"auto",margin:"0 auto"}}></img>
        <div className={styles.loginBox}>
        <div className={styles.infoHolder}>

          <h2>Already have an account? Lets play!</h2>
          <div className={styles.panelHolder}>
            <label>Username:</label><input style={{width:"60%"}} type="text" onChange={this.getUser.bind(this)}></input><br/>
            <label>Password:</label><input style={{width:"60%"}} type="password" onChange={this.getPass.bind(this)}></input><br/><br/>
            <div className={styles.gameButton} onClick={this.props.getUserInfo.bind(this,this.state.username,this.state.password)}>Login</div><br/><br/>
          </div>
        </div>
          <div className={styles.infoHolder}>
            <h2>Create a new account</h2>
            <div className={styles.panelHolder}>
            <label>Username:</label><input type="text" onChange={this.newUser.bind(this)}></input><br/>
            <label>Password:</label><input type="password" onChange={this.newPass.bind(this)}></input><br/><br/>
            <div className={styles.gameButton} onClick={this.props.getNewUserInfo.bind(this,this.state.createUser,this.state.createPass)}>Create User</div>
            </div>
          </div>
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
