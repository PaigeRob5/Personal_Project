import React, { Component } from 'react';
import './Landing.css';
import video from './RoadiLandingVideo.mp4'
import {Helmet} from 'react-helmet';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className = "Main">
          <div className = "background-wrap">
            <video id = 'video-bg-element'preload='auto'autoPlay = 'true'loop="loop"muted = 'muted'>
              /* <source src = {video}type = 'video/mp4'/> */

            </video>
          </div>
            <div className = "sub">The roadtrip planner</div>
            <div className = "Title">ROADI</div>
        <a href ={ process.env.REACT_APP_LOGIN}>
            <button className = "login">login/register</button>
        </a>
        </div>
        </div>
      
    );
  }
}

export default Landing;