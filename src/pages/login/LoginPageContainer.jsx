/*global chrome*/

import React from "react";
import {Redirect} from "react-router-dom";

export class LoginPageContainer extends React.Component {
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('apiToken',
            ({apiToken}) => this.setState({isConnected: Boolean(apiToken), isLoading: false}));
    }

    render() {
        const loginForm = (
            <div>
                Login Page
            </div>);
        return (
            <div>
                {this.state.isConnected ?
                    <Redirect to="/"/> :
                    loginForm}
            </div>)
    }
}

/* eslint-enable-rule no-undef */
