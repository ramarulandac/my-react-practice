import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Auth/Login'
import Signup from './Auth/SignUp'
import Posts from './Posts/Posts'
import {BrowserRouter as Router, Switch,Route,Link, Redirect} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Anuncios</h1>
      <header className="App-header">
          
        <Router>
           <Switch>
             <Route path="/login" component={Login} />
             <Route path="/signup" component={Signup} />
             <Route path="/anuncios" component={Posts}/>
             <Redirect to="/login"/>
           </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
