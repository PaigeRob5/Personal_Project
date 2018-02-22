import React, {Component} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import "/Users/dallinfawcett/devmtn/projects/personal-project/app/src/components/GenPhotos/GenPhotos.css"



const unsplash = new Unsplash({
  applicationId: "360860dc6de41390ed1db193ac1b95848fc1f756d1b7b3768e72037b9a95a271",
  secret: "8ff5b767edfd8180649db73f1aaf41f3bddec150411245dbc8da9c5afaf66ad0",
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
