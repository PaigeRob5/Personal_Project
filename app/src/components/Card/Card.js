import React, {Component} from 'react'
import unsplash, {toJson} from 'unsplash-js'


export default class Card extends Component{
    constructor(props){
        super(props);

        this.state ={
            photo:[]
        }
    }

    componentDidMount(){
        unsplash.search.photos(`${this.props.tripName}`,1,1)
        .then(toJson)
        .then(json =>{
            this.setState({photo: json.results})
        })
        console.log(this.state.photo)
    }

    render(){
        return(
        this.state.photo ? <img src = {this.state.photo.urls.small}/> : <div>image loading</div>
        )
        
    }


}