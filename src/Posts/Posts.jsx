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
                    minPrice:1,
                    maxPrice:5000,
                    tag:[],
                    venta:'true'                    
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
        console.log(posts.results)
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
                         <label type="number" for="minPrice">Price from &nbsp;</label>
                         <input placeholder="min price" value={filters.minPrice} name="minPrice" id="minPrice" onChange={this.handleInput}/>
                         <label type="number" for="maxPrice">to &nbsp;</label>
                         <input placeholder="max price" value={filters.maxPrice} name="maxPrice" id="maxPrice" onChange={this.handleInput}/>
                         <br/>
                         <label for="Tag">Tag &nbsp;&nbsp;&nbsp;&nbsp;</label>
                         <input placeholder="Look for tag" name="tag" id="Tag" onChange={this.handleInput}/><br/>
                         <label for="Sale">Sale or buy &nbsp;</label> 
                        <select name="venta" id="Sale" onChange={this.handleInput}>                         
                            <option value='true' selected="selected">Sale</option>                                                   
                            <option value='false'>Buy</option>
                        </select><br/>                     
                    <button type="Submit" value="Submit">Search</button>
                </form> 
            </div> 
            <div className="posts">
                <br/>
                {(posts.length === 0 )?'':<h4>Found {posts.length}</h4>}
                <hr></hr>
                <PostList anuncios={posts}></PostList>
            </div>
        </div>
        )
    }
}