/*global chrome*/
import React from "react";
import {Notification} from "./Notification";
import Switch from "@material-ui/core/Switch/Switch";

const alertsHeader = {
    fontSize: '14px',
    color: '#1C1E21',
};

const alertsBody = {
    margin: '30px',
};

const alertsFooter = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
};

export class NotificationsPage extends React.Component {
    state = {
        notificationsActive: null,
        triggeredAlerts: [],
    };

    componentWillMount() {
        chrome.storage.sync.get('triggeredAlerts',
            ({triggeredAlerts}) => this.setState({triggeredAlerts: triggeredAlerts.results}));
        chrome.storage.sync.get('NotificationsActive',
            ({ NotificationsActive }) => {
                console.log('notificationsActive -', NotificationsActive);
                this.setState({'notificationsActive': (NotificationsActive !== false)});
            });
    }

    handleChange = name => evt => {
        chrome.storage.sync.set({ 'NotificationsActive': evt.target.checked}, () => {
            this.setState({ [name]: evt.target.checked });
        });
    };
    // handleChange = name => event => {
    //     this.setState({ [name]: event.target.checked });
    // };

    render() {
        const notifications = this.state.triggeredAlerts.reverse().map(
            (alert) => <Notification id={alert.alertId} title={alert.name} timestamp={alert.eventDate}/>);

        return (
            <div>
                <div style={alertsHeader}>
                    Alerts
                </div>
                <div style={alertsBody}>
                    {notifications}
                </div>
                <div>
                    STATE:
                    <br/>
                    {JSON.stringify(this.state)}
                </div>
                <div style={alertsFooter}>
                    <Switch
                        checked={this.state.notificationsActive}
                        onChange={this.handleChange('notificationsActive')}
                        color="primary"
                        value="notificationsActive"
                    />
                    Turn notifications
                    <label>{this.state.notificationsActive ? ' off' : ' on'}</label>
                </div>
            </div>
        );
    }
}
