import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {getPost,getUpdate} from '../Services/api'


export default class newPost extends Component {
    constructor(props){
        super(props);

        this.state = {
            id:props.match.params.anuncio,
            postDetail:{},
            name:'',
            foto:'',
            description:'',
            price:'',
            venta:'sell',
            tags:''            
        }
    }
    
    componentDidMount = async () => {
        const {id} = this.state        
        const data = await getPost(id)
        const {name, photo, description, price, type, tags} = data.result
       
        if(data.success){
            this.setState({
                postDetail:data.result,
                name:name,
                foto:photo,
                description:description,
                price:price,
                venta:type,
                tags:tags
            })
        }

    }

    handleSubmit = async (evt) => {        
        
        evt.preventDefault();
        const {name, foto, description, price, venta, id, tags} = this.state           
        const data= await getUpdate(id, {name:name,
                                         foto:foto,
                                         description:description,
                                         price:price,
                                         venta:venta,
                                         tags:tags })
        if(data.success){
            this.props.history.push('/anuncios')        
        } else {
            console.log(data)
        }        
    }

    handleInput = (evt) => {
        const value = evt.target.value       
        const name = evt.target.name;    
        
        this.setState({
            [name]:value            
        })
    }

    render(){
           const {name, foto, description, price, venta}  = this.state 
        return (
            <div class="container">
            <Link to="/anuncios">Back</Link>
            <h1>Update Article</h1>
            <form onSubmit={this.handleSubmit}>
                <label for="name">Name</label>
                <input id="name"
                       name="name" 
                       type="text" onChange={this.handleInput} 
                       value={name}
                       placeholder="Article name" /><br/>
                
                <label for="">Photo</label>
                <input id="name"
                       name="foto"
                       type="text" onChange={this.handleInput}
                       value={foto}
                       placeholder="Pic URL" /><br/>

                <label for="description">Description</label>
                <input id="description"
                       name="description"
                       type="text" onChange={this.handleInput}
                       value={description} 
                       placeholder="Description" /><br/>

                <label for="price">Price</label>
                <input id="price"
                       name="price"
                       type="number"
                       onChange={this.handleInput}
                       value={price}
                       placeholder="Description" /><br/>

                <label for="Sale">Sale or buy &nbsp;</label> 
                <select name="venta"
                       id="Sale"
                       value={venta}
                       onChange={this.handleInput}>                         
                        <option value='sell' selected="selected">Sale</option>                                                   
                        <option value='buy'>Buy</option>
                </select><br/> 
                <label for="tag">Tag</label>
                <input id="tag" name="tags" type="text" onChange={this.handleInput} placeholder="add Tag" /><br/>
                <button type="Submit" value="Submit">Update</button>
            </form>            
        </div>
        )
    }

}

