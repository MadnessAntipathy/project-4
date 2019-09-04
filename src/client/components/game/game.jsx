import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      username:"",
      password:"",
      createUser:"",
      createPass:""
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.props.getScorePage.bind(this)}>Go to score</button>
        <p>The game starts here...</p>

      </div>
    );
  }
}

Game.propTypes = {
  getNewUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

Game.propTypes = {
  getScorePage: PropTypes.func.isRequired,
};

export default Game;
