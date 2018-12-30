/*global chrome*/
import React from "react";
import {Notification} from "./Notification";

const alertsHeader = {
    fontSize: '14px',
    color: '#1C1E21',
};

const alertsBody = {
    margin: '30px',
};

export class NotificationsPage extends React.Component {
    state = {
        triggeredAlerts: [],
    };

    componentWillMount() {
        chrome.storage.sync.get('triggeredAlerts',
            ({triggeredAlerts}) => this.setState({triggeredAlerts: triggeredAlerts.results}));
    }

    render() {
        const notifications = this.state.triggeredAlerts.map(
            (alert) => <Notification title={alert.name} timestamp={alert.eventDate}/>);
        return (
            <div>
                <div style={alertsHeader}>
                    Alerts
                </div>
                <div style={alertsBody}>
                    {notifications}
                </div>
            </div>
        );
    }
}
