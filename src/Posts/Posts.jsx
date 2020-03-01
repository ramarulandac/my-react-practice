import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import {getPosts} from '../Services/api'
import PostList from './PostList'
import storage from '../Lib/storage'

export default class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            queryFilters:[],
            filters:{
                    name:'',
                    price:0,
                    tag:'',
                    venta:'sell'                    
                },
            value:null,
            reset:0            
        }           
    }
   
    componentDidMount= async () => {
        const filters = this.state.filters
        const posts  = await getPosts(filters);        
        if(posts.success){
            this.setState({
                posts:posts.results
            })
        } else if(!posts.false && posts.error === 'Error: Not logged in' ) {
           this.props.history.push('/login')
        }        
    }

    handleSubmit = async (evt) => {
        const filters = this.state.filters
        evt.preventDefault();
        const posts = await getPosts(filters);
        console.log(posts)
        if(posts.success){
            this.setState({
                posts:posts.results
            })
        } else if(!posts.false && posts.error === 'Error: Not logged in' ) {
           this.props.history.push('/login')
        }        
    }

    handleInput = (evt) => {
        const value = evt.target.value       
        const name = evt.target.name;    
        console.log(name)
        this.setState({
            filters: {...this.state.filters, [name]:value}
        })
    }

    render(){
        const {reset,filters,posts } = this.state
        return (<div>
            <h1>Articles For Sale</h1>
            <div key={reset}>
                <form onSubmit={this.handleSubmit}>
                         <label for="Name">Name&nbsp;</label>
                         <input type="text" placeholder="article" value={filters.name} name="name" id="Name" onChange={this.handleInput}/><br/>
                         <label type="number" for="Price">Price &nbsp;</label>
                         <input placeholder="how much would yo pay" value={filters.price} name="price" id="Price" onChange={this.handleInput}/><br/>
                         <label for="Tag">Tag &nbsp;&nbsp;&nbsp;&nbsp;</label>
                         <input placeholder="Look for tag" name="tag" id="Tag" onChange={this.handleInput}/><br/>
                         <label for="Sale">Sale or buy &nbsp;</label> 
                        <select name="venta" id="Sale" onChange={this.handleInput}>                         
                            <option value='sell' selected="selected">Sale</option>                                                   
                            <option value='buy'>Buy</option>
                        </select><br/>                     
                    <button type="Submit" value="Submit">Search</button>
                </form> 
            </div> 
            <div className="posts">
                <br/>
                {(posts.length === 0 )?'':<h4>Found {posts.length}</h4>}
                <PostList anuncios={posts}></PostList>
            </div>
        </div>
        )
    }
}