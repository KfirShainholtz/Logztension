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
import { LoginPage } from './pages/login/LoginPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 250,
    height: 300,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <Router>
              <div>
                  <ul>
                      <li>
                          <Link to="/login">Login Page</Link>
                      </li>
                      <li>
                          <Link to="/notifications">Notifications Page</Link>
                      </li>
                  </ul>
                  <Route path="/notifications" component={NotificationsPage} />
                  <Route path="/login" component={LoginPage} />
              </div>
          </Router>
    </div>
    );
  }
}

export default withStyles(styles)(App);
