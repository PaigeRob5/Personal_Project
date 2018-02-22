import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import GenPhotos from '../GenPhotos/GenPhotos.js'



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
    return (
      <div className="Dashboard">
        <Header/>
        <div className = "DashboardBody">
          <Link to='/newtrip'><div className = 'create-card'>+ New Trip</div></Link>
          {this.state.trips.map((trip,i)=>{
            return(
              <div id = {i}className = 'card-1'>
                <div className = "card-side card-side--front">{trip.trip_name}</div>
                <div className = "card-side card-side--back">
                  <GenPhotos name ={trip.trip_name} start_loc = {trip.starting_loc} end_loc ={trip.destination} start_date = {trip.start_date} end_date={trip.end_date}/>
                </div>
              </div>  
            )
          })}
          </div>
      </div>
    );
  }
}

export default Dashboard;