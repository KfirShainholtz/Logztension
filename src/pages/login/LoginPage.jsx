/*global chrome*/

import React from "react";
import {Redirect} from "react-router-dom";

export class LoginPage extends React.Component {
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('authToken',
            ({authToken}) => this.setState({isConnected: Boolean(authToken), isLoading: false}));
    }

    render() {
        const loginForm = (
            <div>
                Login Page
            </div>);
        return (
            <div>
                {this.state.isConnected ?
                    <Redirect to="/notifications"/> :
                    loginForm}
            </div>)
    }
}

/* eslint-enable-rule no-undef */
