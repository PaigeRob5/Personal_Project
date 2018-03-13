import React, {Component} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import "./GenPhotos.css"
import {Link} from 'react-router-dom';
import ViewTrip from '../ViewTrip/ViewTrip.js';

const unsplash = new Unsplash({
  applicationId: "4e05349e4d73309d50ea110bb0bb4155255501ac0f88631a950970a05f66da91",
  secret: "1001c0eb90a82831ad748213f38eb31212a97d6d7073b5b1ecbf6ad20dac7a46",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

export default class Photos extends Component{
    constructor(props){
        super(props);

        this.state = {
            photo:[]
        }
        

        this.getPhotos = this.getPhotos.bind(this);
    }
    componentWillMount(){
        this.getPhotos();
      }
      getPhotos(){
        
          unsplash.search.photos(`${this.props.end_loc}`,1,1)
          .then(toJson)
          .then(json => {
            this.setState({photo: json.results})
          })
        
      }

      render(){
        let mappedPhotos = this.state.photo.map((photo,i) =>{
            return(
        <div key = {i}>
            <img src = {photo.urls.small}></img>
            {/* <div className = "credit">photo by Unsplash</div> */}
            <div className = "stats">
            <div className = "locations">{this.props.start_loc} - {this.props.end_loc}</div>
            <div className = "dates">{this.props.start_date} to {this.props.end_date}</div>
            <Link to ={`/viewtrip/${this.props.trip_id}`}><button className = "viewTrip">View Trip</button></Link>
            </div>
        </div>
            )
        })
        return (
            <div>
                {mappedPhotos}
              </div>
              )
            }
}
