import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import { Start } from '../API/api'



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
         username: '',
         password: '',
         error:true,
         loggedIn:false,
         alert:false   
        };
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
        console.log(this.state.username + this.state.password)
        
        const {username, password} = this.state
        const response = await Start(username, password)

        if(response.success){
            console.log(response)
            this.props.history.push('/anuncios');
        }         
         else { 
            console.log(response) 
            this.setState({
                registered:false,
                error: response.error,
                alert:true})        
        }
    }

    render(){

        const {loggedIn, alert} = this.state

        return (
            <div class="container">
                <h1>Wellcome to Anuncios</h1>
                <p className={`entrance-msg ${(alert)?'alert':''}`}> {loggedIn?'Login to start!':`Error on Loggin. review user and password`}</p>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">User</label>
                    <input id="username" name="username" type="text" onChange={this.handleInput} placeholder="your username" /><br/>
                    <label for="pass">Password</label>
                    <input type="password" id="pass" name="password" onChange={this.handleInput} placeholder="your pass"/><br/>
                    <button type="Submit" value="Submit">Login</button>
                </form>
                <div>
                   <p> No account?</p>
                   <Link to="/signup"><button type="">Sign up!</button></Link>
                </div>
            </div>
        )
    }
}

export default Login