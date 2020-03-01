import React, {Component} from 'react'
import {getPost, getPosts} from '../Services/api'
import {Link} from 'react-router-dom'


export default class PostDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.anuncio,
            postDetail:{}
        }
    }
         
    getPostDetail = async () => {
        return await getPost(this.state.id)    
    }

    componentDidMount(){
     this.getPostDetail().then(data =>
        this.setState({
            postDetail:data.result
        })
     )
        
    }

    render(){
        const {postDetail} = this.state
         return (
            <div> 
                 <Link to="/anuncios">Back</Link>
                <div className="postDetail"> 
                    <img src={postDetail.photo} alt="article"/>      
                    <p>Name:&nbsp;{postDetail.name}</p> 
                    <p>Description:&nbsp;{postDetail.description}</p>
                    <p>Price:&nbsp;{postDetail.price}</p>
                    <p>Type:&nbsp;{postDetail.type}</p>
                    <p>Date:&nbsp;{postDetail.createdAt}</p>
                </div>
            </div>
        )
    }
}


