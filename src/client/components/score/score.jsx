import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

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
      console.log("``````````````````this.responseText``````````````````")
      console.log(this.responseText)
      var usableData = JSON.parse(this.responseText)
      console.log("``````````````````usableData``````````````````")
      console.log(usableData)
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
        {this.state.displayList}
      </div>
    );
  }
}

Score.propTypes = {

};

export default Score;
