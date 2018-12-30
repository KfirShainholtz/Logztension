import React from "react";
import {Notification} from "./Notification";

export class NotificationsPageContainer extends React.Component {
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
                {notifications}
            </div>
        );
    }
}
