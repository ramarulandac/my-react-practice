import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import { getPosts} from '../API/api'
import PostList from './PostList'

export default class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            filters:[],
            filter:null,
            value:null,
            flag:0
        }           
    }

    handleSubmit = async (evt) => {
        const filters = this.state.filters
        evt.preventDefault();
        const posts = await getPosts(filters);

        
        this.setState({
          posts:posts
        })
    }

    handleInput = (evt) => {      
        const value = evt.target.value
        const name = evt.target.name
        this.setState({
            [name]:value
        })
    }

    handleAdd = (evt) => {
      
        const queryFilter = this.state.filters;
        const {filter, value, flag} = this.state
       
        queryFilter.push({name:filter, value:value})      

        this.setState({
            filters:queryFilter,                      
            flag:flag + 1,
        })
    }

    render(){
        const {flag,filters,posts } = this.state
        return (<div>
            <h1>Articles For Sale</h1>
            <div key={flag}>
                <form onSubmit={this.handleSubmit}>
                    
                        <ul>{filters.map((par,y) =>{ 
                            return <li key={y}>
                                    {y+1}. {par.name} : {par.value}
                                    </li> })}
                        </ul>                
                        <select onChange={this.handleInput} name="filter">
                        <option value="" selected="selected"></option>
                            <option value="Name">name</option>
                            <option value="Price">price</option>
                            <option value="Tag">tag</option>
                            <option value="Sale">sale</option>
                        </select>
                        <input type="text" name="value" onChange={this.handleInput}/><button onClick={this.handleAdd}>add to search</button>
                    
                    <button type="Submit" value="Submit">Search</button>
                </form>
            </div> 
            <div className="posts">
                {(posts.length === 0 )?'':<h3>Found {posts.results.length}</h3> }
                <PostList anuncios={posts.results}></PostList>
               
            </div>

        </div>
        )
    }
}