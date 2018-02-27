import React, {Component} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import "/Users/dallinfawcett/devmtn/projects/personal-project/app/src/components/GenPhotos/GenPhotos.css"



const unsplash = new Unsplash({
  applicationId: "342b08ad25bf34ae903d8d4d077a9f87472a4d9f507082314a820cf94c2e84bc",
  secret: "a41565b5a97dd73f9467bad280f2ec6836612f5b528bde721a052c409206f55c",
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
        
          unsplash.search.photos(`${this.props.name}`,1,1)
          .then(toJson)
          .then(json => {
            this.setState({photo: json.results})
            console.log(json.results)
          })
        
        
      }

      render(){
        let mappedPhotos = this.state.photo.map(photo =>{
            return(
        <div>
            <img src = {photo.urls.small}/>
            <div className = "stats">Statistics</div>
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
