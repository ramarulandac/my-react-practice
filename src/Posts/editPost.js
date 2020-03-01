import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getPost, getPosts} from '../Services/api'


export default class newPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.anuncio,
            postDetail:{}            
        }
    }
    
    componentDidMount = async () => {
        const {id} = this.state
        console.log('siu')
        const data = await getPost(id)
        if(data.success){
            this.setState({
                postDetail:data.result
            })

        }

    }

    handleSubmit = async (evt) => {        
        evt.preventDefault();
        const postDetail = this.state
        console.log(this.props)  
      
       /* const data; /*= await getNew(post)
        if(data.success){
            this.props.history.push('/anuncios')        
        }*/
    }

    handleInput = (evt) => {
        const value = evt.target.value       
        const name = evt.target.name;    
        console.log(value)
        this.setState({
            [name]:value
        })
    }

    render(){
        const {postDetail} = this.state 
        return (
            <div class="container">
            <Link to="/anuncios">Back</Link>
            <h1>New Article</h1>
            <form onSubmit={this.handleSubmit}>
                <label for="name">Name</label>
                <input id="name"
                       name="name" 
                       type="text" onChange={this.handleInput} 
                       value={postDetail.name}
                       placeholder="Article name" /><br/>
                
                <label for="">Photo</label>
                <input id="name"
                       name="foto"
                       type="text" onChange={this.handleInput}
                       value={postDetail.photo}
                       placeholder="Pic URL" /><br/>

                <label for="description">Description</label>
                <input id="description"
                       name="description"
                       type="text" onChange={this.handleInput}
                       value={postDetail.description} 
                       placeholder="Description" /><br/>

                <label for="price">Price</label>
                <input id="price"
                       name="price"
                       type="number"
                       onChange={this.handleInput}
                       value={postDetail.price}
                       placeholder="Description" /><br/>

                <label for="Sale">Sale or buy &nbsp;</label> 
                <select name="venta"
                       id="Sale"
                       value={postDetail.venta}
                       onChange={this.handleInput}>                         
                        <option value='sell' selected="selected">Sale</option>                                                   
                        <option value='buy'>Buy</option>
                </select><br/> 

                <button type="Submit" value="Submit">Update</button>
            </form>            
        </div>
        )
    }

}

