/*global chrome*/
import React from "react";
import {Redirect} from "react-router-dom";

export class NotificationsPageContainer extends React.Component {
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('apiToken',
            ({apiToken}) => this.setState({isConnected: Boolean(apiToken), isLoading: false}));
    }

    render() {
        const notification = <div>Hello there :) - Notifications page</div>;
        return (
            <div>
                {this.state.isConnected ?
                    <Redirect to="/"/> :
                    notification}
            </div>)
    }
}

/* eslint-enable-rule no-undef */
