import React, { Component } from 'react';
import './viewtrip.css';
import Header from '../Header/Header.js';
import axios from 'axios';
import Photos from '../Photos/Photos.js';
import {Link} from 'react-router-dom';


class ViewTrip extends Component {
    constructor(){
        super();
        
        this.state ={
            tripInfo: null,
            Editing: false,
            newTitle: '',
            newStart: '',
            newEnd: ''

        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.editStartDate = this.editStartDate.bind(this);
        this.editEndDate = this.editEndDate.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/trips/${this.props.match.params.id}`).then(response =>{
            let trip = response.data[0];
            this.setState({
                tripInfo: trip,
                newTitle: trip.trip_name,
                newStart: trip.start_date,
                newEnd: trip.end_date
            })
            console.log(this.state.tripInfo.trip_name);
        })
    }

    handleEditClick(){
        const updateInfo ={
            trip_name: this.state.newTitle,
            start_date: this.state.newStart,
            end_date: this.state.newEnd
        }
        console.log(updateInfo)
        if(this.state.Editing){
            axios.put(`/api/trips/${this.props.match.params.id}`, updateInfo).then(response=>{
                let trip = response.data[0]
                console.log(trip);
                this.setState({
                    tripInfo: trip,
                    newTitle: trip.trip_name,
                    newStart: trip.start_date,
                    newEnd: trip.end_date})
            }).catch(console.log)
        }
        this.setState({Editing:!this.state.Editing});
    }

    editTitle(e){
        this.setState({newTitle: e.target.value})
    }

    editStartDate(e){
        this.setState({newStart:e.target.value})
    }

    editEndDate(e){
        this.setState({newEnd: e.target.value})
    }


    handleDeleteClick(){
        axios.delete(`/api/trips/${this.props.match.params.id}`)
        console.log(this.props.match.params.id)
    }
    
  render() {
    const tripLoaded = !!this.state.tripInfo
    return (
      <div className="ViewTrip">
          <Header/>
          <div className = "ViewtripBody">
              <div className = "trip-buttons">
                  
               { this.state.Editing ? <button onClick ={this.handleEditClick}>Save</button>:<button onClick ={this.handleEditClick}>Edit</button> }
                <Link to = '/dashboard'><button onClick = {this.handleDeleteClick}>Delete</button></Link>

            </div>

        { this.state.Editing ?
            <div className = "changeTitleInput"><input className = 'ChangeTitle'onChange = {this.editTitle} value = {this.state.newTitle}/> </div> :
            <div className = "TripName">{tripLoaded ? this.state.newTitle : null}</div>
        }
            <div className = "orig-dest">
                <div className = "TripOrigin">{tripLoaded? this.state.tripInfo.starting_loc:null}</div>
                <div>to</div>
                <div className = "TripOrigin">{tripLoaded? this.state.tripInfo.destination: null}</div>
            </div>

            <div className = "datesandmiles">

                
                <div className = "Dates">

                    {this.state.Editing ?
                    <input className = "ChangeDate"onChange = {this.editStartDate} value = {this.state.newStart}/>:
                    <div className = "Start">{tripLoaded? this.state.newStart:null} - </div>
                    }

                    {this.state.Editing ?
                    <input className = 'ChangeDate'onChange = {this.editEndDate} value = {this.state.newEnd}/>:
                    <div className = "End">{tripLoaded? this.state.newEnd : null}</div>
                    }
                </div>
                
                <div className = "Stats">
                    <div className = "miles">Total miles: {tripLoaded? this.state.tripInfo.total_miles: null} </div>
                    <div className = "time">Travel time: {tripLoaded ? this.state.tripInfo.travel_time: null}</div>
                </div>
            </div>
            <div className = "photos">
                {tripLoaded ? <Photos tripId = {this.state.tripInfo.trip_id}/> : null}
            </div>
          </div>
      </div>
    );
  }
}

export default ViewTrip;