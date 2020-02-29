import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import {getPosts} from '../Services/api'
import PostList from './PostList'

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
                    venta:true                    
                },
            value:null,
            reset:0            
        }           
    }

    handleSubmit = async (evt) => {
        const filters = this.state.filters
        evt.preventDefault();
        const posts = await getPosts(filters);
        console.log(posts)
        this.setState({
          posts:posts.results
        })
    }

    handleInput = (evt) => {      
        const value = evt.target.value
       
        const name = evt.target.name;      
        this.setState({
            filters: {...this.state.filters, [name]:value}
        })
    }

    handleAdd = (evt) => {
      
        const queryFilter = this.state.filters;
        const {reset} = this.state

        this.setState({
            filters:queryFilter,                      
            reset:reset + 1,
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
                         <label for="Price">Price &nbsp;</label>
                         <input placeholder="how much would yo pay" value={filters.price} name="price" id="Price" onChange={this.handleInput}/><br/>
                         <label for="Tag">Tag &nbsp;&nbsp;&nbsp;&nbsp;</label>
                         <input placeholder="Look for tag" name="tag" id="Tag" onChange={this.handleInput}/><br/>
                         <label for="Sale">Sale or buy &nbsp;</label> 
                        <select name="venta" id="Sale" onChange={this.handleInput}>                         
                            <option value={true} selected="selected">Sale</option>                                                   
                            <option value={false}>Buy</option>
                        </select><br/>                     
                    <button type="Submit" value="Submit">Search</button>
                </form>
            </div> 
            <div className="posts">
                {(posts.length === 0 )?'':<h3>Found {posts.length}</h3> }
                <PostList anuncios={posts}></PostList>
            </div>
        </div>
        )
    }
}