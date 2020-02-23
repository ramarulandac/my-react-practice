import React, {Component} from 'react'
import {BrowserRouter as Router, Switch,Route,Link, Redirect} from "react-router-dom";
import {signUp} from '../API/api'

class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:'',
            registered: true,
            error:''
        }
      }
  
    handleInput = (evt) => {
        const name = evt.target.name
        const value = evt.target.value
      
        this.setState({
            [name]:value
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault() 
        const {username,password} = this.state
        const response = await signUp(username,password)
        if(response.success) {           
           this.props.history.push('/login')
        } else {       
            this.setState({
                registered:false,
                error: response.error})        
        }
    }

    render(){
        const {registered,error} = this.state
        return (
            <div class="container">
                <h1>Sign Up to start viewing Anuncios!</h1>
                <p> {registered?'Login to start!':`Error on Sign Up Error${error}`}</p>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">User</label>
                    <input id="username" name="username" type="text" onChange={this.handleInput} placeholder="your username" /><br/>
                    <label for="pass"> Password</label>
                    <input type="password" id="pass" name="password" onChange={this.handleInput} placeholder="your pass"/><br/>
                    <input type="password" id="pass" onChange={this.handleInput} placeholder="retype your pass"/><br/>
                    <button>SignUp!</button>
                </form>
            </div>)
    }
}

     
    


export default SignUp