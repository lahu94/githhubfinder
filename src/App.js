import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exec path='/about' component={About} />
                <Route exec path='/user/:login' component={User}/>
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>    
    </GithubState>
  );
}

export default App;
