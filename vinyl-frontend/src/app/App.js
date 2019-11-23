import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import About from '../views/About/About'
import Home from '../views/Home/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Profile from '../views/Profile/Profile'
import './App.css';

function App() {
  return (
    <BrowserRouter>

    <div className="container">
        <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile' component={Profile} />
        </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
