import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios';

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
            console.log(this.state.tripImages)
        })
    }

    uploadFile(files){
        console.log('uploadFile: ');
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
            console.log('Upload Complete: ' + JSON.stringify(resp.body))
            const uploaded = resp.body;
            
            let updatedImages = Object.assign([], this.state.tripImages);
            updatedImages.push(uploaded);

            console.log(updatedImages);

            axios.post(`/api/photos/${this.props.tripId}`,{img_url: updatedImages[0].url})
            this.setState({tripImages: updatedImages})
        })
    }

    render(){
        const tripPhotos = this.state.tripImages.map((image,i)=>{
            return(
            <li key = {i}>
                <img src ={image.img_url} alt = 'trip photo'/>
            </li>
            )
        })
        return(
            <div>
                Photos
                <Dropzone onDrop ={this.uploadFile.bind(this)}/>
                <ol>
                    {/* {list} */}
                    {tripPhotos}
                </ol>

            </div>

        )
    }
}