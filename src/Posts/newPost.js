import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getNew} from '../Services/api'


export default class newPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:'',
            foto:'',
            description:'',
            price:'',
            venta: 'sell'
        }
    }


    handleSubmit = async (evt) => {        
        evt.preventDefault();
        const post = this.state
        console.log(this.props)  
      
        const data = await getNew(post)
        if(data.success){
            this.props.history.push('/anuncios')        
        }
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

        return (
            <div class="container">
            <Link to="/anuncios">Back</Link>
            <h1>New Article</h1>
            <form onSubmit={this.handleSubmit}>
                <label for="name">Name</label>
                <input id="name" name="name" type="text" onChange={this.handleInput} placeholder="Article name" /><br/>
                <label for="">Photo</label>
                <input id="name" name="foto" type="text" onChange={this.handleInput} placeholder="Pic URL" /><br/>
                <label for="description">Description</label>
                <input id="description" name="description" type="text" onChange={this.handleInput} placeholder="Description" /><br/>
                <label for="price">Price</label>
                <input id="price" name="price" type="number" onChange={this.handleInput} placeholder="Description" /><br/>
                <label for="Sale">Sale or buy &nbsp;</label> 
                <select name="venta" id="Sale" onChange={this.handleInput}>                         
                    <option value='sell' selected="selected">Sale</option>                                                   
                    <option value='buy'>Buy</option>
                </select><br/>    
                <button type="Submit" value="Submit">Crear</button>
            </form>            
        </div>
        )
    }

}

