import React,{Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import './ViewMap.css'

const style ={
  width: '700px',
  height:'350px'
}
export class ViewMap extends React.Component {
  constructor(props){
    super(props)
  
    this.state = {
      data:[],
      origin: this.props.start_loc,
      destination:this.props.end_loc,
      distance:'',
      duration:''
  }
  this.calculateDistance = this.calculateDistance.bind(this);
}

loadMapRoute=()=>
  { 
    if(this.state.origin){
    this.calculateDistance()
    this.getDirections()
  }
    else{
      console.log("loading . . .")
  }
}
  
  getDirections=()=>
  {
    var request = {
    origin: this.state.origin,
    destination: this.state.destination,
    travelMode: 'DRIVING'
    };
  this.directionsService.route(request, (result, status)=> {
    if (status === 'OK') {
      this.directionsDisplay.setDirections(result);
    }
    else
    {
        window.alert('Directions request failed due to ' + status);
    }
  });
  }
  calculateDistance=()=>
  {
    const {google} = this.props;
    var service = new google.maps.DistanceMatrixService;
       service.getDistanceMatrix({
         origins: [this.state.origin],
         destinations: [this.state.destination],
         travelMode: 'DRIVING',
         unitSystem: google.maps.UnitSystem.IMPERIAL,
         avoidHighways: false,
         avoidTolls: false
       }, (response, status)=> {
         if (status !== 'OK') {
           alert('Error was: ' + status);
         } else {
           this.setState({distance:response.rows[0].elements[0].distance.text})
           this.setState({duration: response.rows[0].elements[0].duration.text})
         }
       });
  }
  componentDidMount=()=> {
    // this.google = this.props.google
    // setTimeout(()=>this.loadMapRoute(), 1000)
  }
  onMapReady=(mapProps, map)=>
  {
    this.map = map
    const {google} = this.props;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map)
    this.loadMapRoute();
  }
render() {
  if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }
    return (
      <div className = "mapWrapper">
        <div>
          {this.state.data}
        </div>
      <Map className = "Map"google={this.props.google}
       initialCenter={{
            lat: 39.5,
            lng: -98.35
          }}
          zoom={3}
          style ={style} 
          onReady={this.onMapReady}>
      </Map>
    </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA6CPBW4zwuXvVkmZSIFQaNjeuVQML9HtI',
  version: '3'
})(ViewMap)