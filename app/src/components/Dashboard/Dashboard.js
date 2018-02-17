import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';


class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      trips:[]
    }
  }
  componentDidMount(){
    axios.get('/api/trips').then(response =>{
      this.setState({trips:response.data})
      console.log(this.state.trips);
    })
  }

  render() {
    const colors =[
      '#8CD264', '#44A284','#2F958D'
    ]
    return (
      <div className="Dashboard">
        <Header/>
        <div className = "DashboardBody">
          <div className = 'create-card'>
            + New Trip
          </div>
          {this.state.trips.map((trip,i)=>{
            return(
              <Link to = {`/viewtrip/${trip.trip_id}`} key ={i}><div className = 'card-1' style={{backgroundColor:colors[i%colors.length]}}>{trip.trip_name}</div></Link>   
            )
          })}
          </div>
      </div>
    );
  }
}

export default Dashboard;