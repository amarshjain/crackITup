import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Myprofile from './components/myprofile/Myprofile';
import CreateProfile from './components/profile_form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
      store.dispatch(loadUser())
    }, []);
    return( 
      <Provider store={store}>
        <Router>
          <Fragment className="App">
            <Navbar />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/myprofile" component={Myprofile} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
    )};


export default App;
