import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
//import Dates from './components/NewTrip/Dates';
import Locations from './components/NewTrip/Locations';
import Name from './components/NewTrip/Name';
import Stats from './components/NewTrip/Stats';
import ViewTrip from './components/ViewTrip/ViewTrip';


class App extends Component {
  render() {
    return (
      
      <div className="App">
        <HashRouter>
          
          <Switch>
            <Route exact path = '/' component = {Landing}/>
            <Route path = '/dashboard' component = {Dashboard}/>
            <Route path = '/viewtrip/:id' component = {ViewTrip}/>
            {/* <Route exact path = '/newtrip' component ={Dates}/> */}
            <Route path = '/newtrip/locations' component = {Locations}/>
            <Route path = '/newtrip/name' component = {Name}/>
            <Route path = '/newtrip/stats' component = {Stats}/>


          </Switch>
        
        </HashRouter>
      </div>
    );
  }
}

export default App;
