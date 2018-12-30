/* global chrome */
import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import {PrivateRoute} from "./pages/utilities/PrivateRoute";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 400,
    height: 420,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('apiToken',
            ({apiToken}) => this.setState({isConnected: Boolean(apiToken), isLoading: false}));
    }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
              <Router>
                  <div>
                      <Route path="/login" component={LoginPage} />
                      <Redirect from="/" to='/notification' />
                      <PrivateRoute path="/" component={MainPage} />
                  </div>
              </Router>
          </div>
        );
    }
}

export default withStyles(styles)(App);
