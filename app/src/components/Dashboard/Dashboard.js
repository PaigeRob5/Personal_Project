import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import GenPhotos from '../GenPhotos/GenPhotos.js'
import ReactModal from 'react-modal';
import Map from '../Map/Map.js';



class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      trips:[],
      showModal: false,
      start_date:'',
      end_date:'',
      starting_loc:'',
      end_loc: '',
      trip_name:''
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStartLocChange = this.handleStartLocChange.bind(this);
    this.handleEndLocChange = this.handleEndLocChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.tripCreated = this.tripCreated.bind(this);
  }
  componentDidMount(){
    axios.get('/api/trips').then(response =>{
      this.setState({trips:response.data})
      
    })
  }

  handleOpenModal(){
    this.setState({showModal:!this.state.showModal})
  }

  handleCloseModal(){
    this.setState({showModal:!this.state.showModal})
  }
  tripCreated(){
    this.setState({showModal:!this.state.showModal})
    axios.get('/api/trips').then(response =>{
      console.log(response.data)
      this.setState({trips:response.data})
      
    })
  }

  handleStartDateChange(e){
    this.setState({start_date:e.target.value})
    // console.log(this.state.start_date)
  }

  handleEndDateChange(e){
    this.setState({end_date:e.target.value})
    // console.log(this.state.end_date)
  }

  handleStartLocChange(e){
    this.setState({start_loc: e.target.value})
    //console.log(this.state.start_loc);
  }

  handleEndLocChange(e){
    this.setState({end_loc: e.target.value})
    //console.log(this.state.end_loc)
  }
  handleTitleChange(e){
    this.setState({trip_name: e.target.value})
    // console.log(this.state.trip_name)
  }

  render() {
    return (
      <div className="Dashboard">
        <Header/>
        <div className = "DashboardBody">
          <div className = 'create-card'>
            <div onClick ={this.handleOpenModal}>+ New Trip</div>

              <ReactModal
              closeTimeoutMS={400}
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              className="Modal"
              overlayClassName="Overlay"
              ariaHideApp={false}>

              <div className = "topModal">
                <div className = "modalTitle">New Trip</div>
                <button className = "ModalClose"onClick={this.handleCloseModal}>X</button>
              </div>
              <div className = "ModalBody">
                <div className = "modalText">
                  
                    <div className = "TripDates">
                      <div className = "statsTitle">Dates of Travel</div>
                      <label>Start:</label><input className ="newTripInput" type = "date" onChange = {this.handleStartDateChange}/>
                      <label>End:</label><input className ="newTripInput" type = "date" onChange = {this.handleEndDateChange}/>
                    </div>

                    <div className = "TripLocations">
                      <div className = "statsTitle">Locations</div>
                      <label>Origin:</label><input className ="newTripInput" type = "text" defaultValue = "city, state" onChange = {this.handleStartLocChange}/>
                      <label>Destination:</label><input className ="newTripInput" type = "text" defaultValue = "city, state" onChange = {this.handleEndLocChange}/>
                    </div>

                    <div className = "TripTitle">
                      <div className = "statsTitle">Trip Title</div>
                      <label>What will you call this trip?</label><input className ="newTripInput" type = "text" defaultValue = "ex: Spring Break" onChange={this.handleTitleChange}/>
                    </div>
                  </div>
              </div>
            <div className = "mapContainer">
              <Map tripCreated = {this.tripCreated} start_date = {this.state.start_date} end_date = {this.state.end_date} starting_loc = {this.state.start_loc} end_loc = {this.state.end_loc} trip_name ={this.state.trip_name}/>
            </div>
              </ReactModal>
          </div>

          {this.state.trips.map((trip,i)=>{
            return(
              <div key = {i}className = 'card-1'>
                <div className = "card-side card-side--front">{trip.trip_name}</div>
                <div className = "card-side card-side--back">
                  <GenPhotos trip_id = {trip.trip_id}name ={trip.trip_name} start_loc = {trip.starting_loc} end_loc ={trip.destination} start_date = {trip.start_date} end_date={trip.end_date}/>
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