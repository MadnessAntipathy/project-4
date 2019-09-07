import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';



class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleScore: true,
      scoreList: [],
      displayList: [],
      myList: [],
      showMyList:[],
      display: "",
    };
  }

  componentDidMount(){
    var componentThis = this
    var responseHandler = function() {
      var usableData = JSON.parse(this.responseText)
      if (usableData.length > 0){
        var list = usableData.map((obj, index)=>{
          return <tr key={index}><td>{obj.name}</td><td></td><td>{obj.scores}</td></tr>
        })
        componentThis.setState({
          scoreList:usableData,
          displayList: list,
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

  toggleScore(){
    this.setState({
      toggleScore: !this.state.toggleScore
    })
    if (this.state.toggleScore){
      this.setState({
        display: <table cellPadding="10">
        <thead>
          <tr><th colSpan="3"><h1>Top 10 Player Scores!</h1></th></tr>
        </thead>
        <tbody>
          <tr><td>Player Name</td><td></td><td>Score</td></tr>
          {this.state.displayList}
        </tbody>
        </table>
      })
    }else {
      this.setState({
        display: <table cellPadding="10">
        <thead>
          <tr><th colSpan="3"><h1>These are my best scores!</h1></th></tr>
        </thead>
        <tbody>
          <tr><td>Score</td><td></td><td>Played on</td></tr>
          {this.state.showMyList}
        </tbody>
        </table>
      })
    }
  }

  render() {
    return (
      <div style={{textAlign:"center"}}>
        My latest score<br/><br/><br/>
        {this.props.latestScore}
        <br/><br/><br/>
        <button onClick={this.toggleScore.bind(this)}>Toggle Global and Player Score</button>
        {this.state.display}
      </div>

    );
  }
}

Score.propTypes = {
  latestScore: PropTypes.number.isRequired,
};

export default Score;
