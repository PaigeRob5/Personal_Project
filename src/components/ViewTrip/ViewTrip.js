import React, { Component } from 'react';
import './viewtrip.css';
import Header from '../Header/Header.js';
import axios from 'axios';
import Photos from '../Photos/Photos.js';
import {Link} from 'react-router-dom';
import ViewMap from '../ViewMap/ViewMap.js';
import Unsplash, {toJson} from 'unsplash-js';
import 'react-confirm-alert/src/react-confirm-alert.css'

const unsplash = new Unsplash({
    applicationId: "85bd17ef0cf8f2266fcc489e00e849420cca79bcf7be2a00e8af5c7f9de8e49e",
    secret: "36a6e9b86dbe1328d571cab84a12b31e030470fbcf8d4a07f32f4dcc1378c022",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  });

class ViewTrip extends Component {
    constructor(){
        super();
        
        this.state ={
            tripInfo: null,
            Editing: false,
            newTitle: '',
            newStart: '',
            newEnd: '',
            picLocation:'',
            backgroundUrl:[]

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
                newEnd: trip.end_date,
                picLocation: trip.destination
            })
            unsplash.search.photos(`${trip.destination}`,1,1)
            .then(toJson)
            .then(json => {
              this.setState({backgroundUrl: json.results[0].urls.regular})
            })
           console.log(this.state.tripInfo)
        })
       
    }

    handleEditClick(){
        const updateInfo ={
            trip_name: this.state.newTitle,
            start_date: this.state.newStart,
            end_date: this.state.newEnd
        }
        // console.log(updateInfo)
        if(this.state.Editing){
            axios.put(`/api/trips/${this.props.match.params.id}`, updateInfo).then(response=>{
                let trip = response.data[0]

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
        
    }
  
    
  render() {
  let style ={
      backgroundImage: 'url('+(this.state.backgroundUrl)+')'
  }

    const tripLoaded = !!this.state.tripInfo
    return (
      <div className="ViewTrip" style ={style}>
        <div className ="coverImage">
          <Header/>
          <div className = "ViewtripBody">
              <div className = "trip-buttons">
                  
               { this.state.Editing ? <button className ="ViewTripButton" onClick ={this.handleEditClick}>Save</button>:<button className = "ViewTripButton"onClick ={this.handleEditClick}>Edit</button> }
                <Link to = '/dashboard'><button className = "ViewTripButtonDelete" onClick = {this.handleDeleteClick}>Delete</button></Link>

            </div>

        { this.state.Editing ?
            <div className = "changeTitleInput"><label>Edit Trip Title:<input className = 'ChangeTitle'onChange = {this.editTitle} value = {this.state.newTitle}/> </label></div> :
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
                    <label className ="changeStartDateLabel">Edit Start Date:<input className = "ChangeDate"onChange = {this.editStartDate} value = {this.state.newStart} type = "date"/></label>:
                    <div className = "Start">{tripLoaded? this.state.newStart:null} - </div>
                    }

                    {this.state.Editing ?
                    <label className ="changeEndDateLabel">Edit End Date:<input className = 'ChangeDate'onChange = {this.editEndDate} value = {this.state.newEnd} type = "date"/></label>:
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
            <div className = "viewMap">
                <div className = "viewMapTitle">Map</div>
                
                    {tripLoaded ? <ViewMap start_loc = {this.state.tripInfo.starting_loc} end_loc ={this.state.tripInfo.destination}/>: null}

            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default ViewTrip;