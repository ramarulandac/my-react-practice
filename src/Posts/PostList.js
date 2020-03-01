import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PostList extends Component {
    constructor(props){
        super(props);
    }
   
     render() {

        const anuncios = this.props.anuncios
        return (
                
             <div>
               <Link to="/create">Creat an article</Link>
               <hr></hr>
               {(anuncios)? anuncios.map(post => 
                                { return  <div>
                                             <hr></hr>
                                            <div key = {post._id} className="post">
                                                <Link to={`/anuncios/${post._id}`}>
                                                    <img src={`${post.photo}`} 
                                                         alt={post.description} 
                                                         className="img-rounded"/> 
                                                    {post.description}
                                                </Link>
                                              <Link to={`/edit/${post._id}`}><button>Edit this ad</button></Link>
                                            </div>                                            
                                          </div>}):null}                                        
            
            </div>
            
        )        
    }
}