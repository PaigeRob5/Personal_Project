import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="Header">
          <div className = "main">
            <Link to = '/dashboard'><div className = "title">ROADI</div></Link>
            <a href = 'http://localhost:3005/logout'>
                <button className = 'logout'>logout</button>
            </a>
            </div>
      </div>
    );
  }
}

export default Header;