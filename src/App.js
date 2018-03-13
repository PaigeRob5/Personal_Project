import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
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


          </Switch>
        
        </HashRouter>
      </div>
    );
  }
}

export default App;
