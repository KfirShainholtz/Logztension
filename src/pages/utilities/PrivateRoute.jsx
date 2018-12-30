/*global chrome*/
import React from "react";
import {Redirect, Route} from "react-router-dom";

export class PrivateRoute extends React.Component {
    state = {
        isConnected: null,
        isLoading: true,
    };

    componentWillMount() {
        chrome.storage.sync.get('apiToken',
            ({apiToken}) => this.setState({isConnected: Boolean(apiToken), isLoading: false}));
    }

    render() {
        const Component = this.props.component;
        return (
            <Route
                path={this.props.path}
                render={props =>
                    this.state.isConnected ?
                        (<Component {...props} />) :
                        (<Redirect to={'/login'}/>)
                }
            />);
    }
}
