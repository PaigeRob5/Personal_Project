import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className = "Main">
          <div className = "center">
            <div className = "sub">The roadtrip planner</div>
            <div className = "Title">ROADI</div>
            <a href ={ process.env.REACT_APP_LOGIN}>
            <button className = "login">login/register</button>
        </a>
        </div>
        </div>
      </div>
    );
  }
}

export default Landing;