import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { reconnectGame } from '../game/client';


class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      scoreList: [],
      displayList: []
    };
  }

  componentDidMount(){
    var componentThis = this
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        var list = usableData.map((obj, index)=>{
          return <div key={index}>{obj.id}:{obj.name}:{obj.scores}</div>
        })
        componentThis.setState({
          scoreList:usableData,
          displayList: list
        })
      }
    };
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    var url = "/score";
    request.open("get", url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.props.getGamePage.bind(this)}>Go to game</button>
        <h1>Score will be displayed below here!</h1>
        {this.state.displayList}
      </div>
    );
  }
}

Score.propTypes = {
  getGamePage: PropTypes.func.isRequired,
};

export default Score;
