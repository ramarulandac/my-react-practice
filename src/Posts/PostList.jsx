import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PostList extends Component {
    constructor(props){
        super(props);
    }
   

   render() {
    const anuncios = this.props.anuncios
    return (
         (anuncios)? anuncios.map(post => { return  <div>
                                                    <Link to={post._id}><img src={`${post.photo}`} alt={post.description}/> {post.description}</Link>
                                                    </div>}):null 
    )
   }
}