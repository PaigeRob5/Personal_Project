import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom'


class Header extends Component {
  render() {
    return (
      <div className="Header">
          <div className = "main">
            <Link to = '/dashboard' className ="titleLink"><div className = "title">ROADI</div></Link>
            <a href = {process.env.REACT_APP_LOGOUT}>
                <button className = 'logout'>logout</button>
            </a>
            </div>
      </div>
    );
  }
}

export default Header;