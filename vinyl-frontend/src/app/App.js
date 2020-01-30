import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import About from '../views/About/About'
import Home from '../views/Home/Home'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Profile from '../views/Profile/Profile'
import FormPreferences from '../components/FormPreferences'
import Collection from '../views/Collection/Collection'
import './App.css';

function App() {
  
  return (
    <BrowserRouter>

    <div className="container">
        <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile/user' component={Profile} />
            <Route path='/form' component={FormPreferences}/>
            <Route path='/profile/collection' component={Collection}/>
        </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
