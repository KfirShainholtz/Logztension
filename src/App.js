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
import {PrivateRoute} from "./pages/utilities/PrivateRoute";

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
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('authToken',
            ({authToken}) => this.setState({isConnected: Boolean(authToken), isLoading: false}));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Router>
                    <div>
                        {this.state.isConnected ?
                            <Redirect to="/notifications"/> :
                            <Redirect to="/login" />}
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/notifications" component={NotificationsPage} />
                    </div>
                </Router>
            </div>
            );
    }
}

export default withStyles(styles)(App);
