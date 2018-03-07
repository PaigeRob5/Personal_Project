import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios';
import './Photos.css';


const style ={
    width: '210px'
}
export default class Photos extends Component{
    constructor(){
        super();

        this.state = {
            imagesUploaded:[],
            tripImages:[]
        }
    }
    componentDidMount(){
        axios.get(`/api/photos/${this.props.tripId}`).then(response =>{
            this.setState({tripImages:response.data})
            
        })
    }

    uploadFile(files){
        const img = files[0];
        const cloudName = 'roadi';
        const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
        const timestamp = Date.now()/1000
        const uploadPreset = 'yijosthq'
        const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'fzoq_nzfeVNwNXK_k6ikprgiQMg'
        const signature =  sha1(paramsStr)
        const params = {
            'api_key': '182148199792585',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }
        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', img)
        
        Object.keys(params).forEach((key)=>{
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err,resp)=>{
            if(err){
                alert(err)
                return
            }
            const uploaded = resp.body;
            console.log("Resp Boyd",resp.body)
            
            let updatedImages = Object.assign([], this.state.tripImages);
            let localImages = Object.assign([], this.state.tripImages);
            localImages.push({img_url: uploaded.url});
            updatedImages.push(uploaded);


            axios.post(`/api/photos/${this.props.tripId}`,{img_url: updatedImages[updatedImages.length-1].url})
            this.setState({tripImages: localImages},()=>console.log('This is state',this.state))
        })

    }

    render(){
        const tripPhotos = this.state.tripImages.map((image,i)=>{
            return(
            <div className = "displayPhotos"key = {i}>
                <img className = "tripPhotos"src ={image.img_url} style={style} alt = 'trip photo'/>
             </div>
            )
        })
        return(
            <div className = "Photos">
                <div className = "photoTitle">Photos</div>
                <div className = "content">
                <Dropzone className ="Dropzone"onDrop ={this.uploadFile.bind(this)}>drag photos here or click to upload</Dropzone>
                 <div className = "listedPhotos">
                        {tripPhotos}
                    </div>
                </div>

            </div>

        )
    }
}