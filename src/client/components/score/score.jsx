import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import { reconnectGame } from '../game/client';


class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      scoreList: [],
      displayList: [],
      myList: [],
      showMyList:[]
    };
  }

  componentDidMount(){
    var componentThis = this
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        var list = usableData.map((obj, index)=>{
          return <div key={index} id={obj.id} style={{border:"1px solid black"}}><div style={{display:"inline-block"}}>{obj.name}</div><div style={{display:"inline-block"}}>{obj.scores}</div></div>
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
        <h1>Top 10 Player Scores!</h1>
        <div style={{display:"flex", flexDirection:"row"}}>
        {this.state.displayList}
        </div>
        <h1>These are my best scores!</h1>
        {this.state.showMyList}
      </div>
    );
  }
}

Score.propTypes = {

};

export default Score;
