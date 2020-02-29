import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PostList extends Component {
    constructor(props){
        super(props);
    }
   
     render() {
    const anuncios = this.props.anuncios
    return (
         (anuncios)? anuncios.map(post => { return  <div key = {post._id} className="post">
                                                    <Link to={`/anuncios/${post._id}`}><img src={`${post.photo}`} alt={post.description} className="img-rounded"/> {post.description}</Link>
                                                    </div>}):null 
    )
   }
}