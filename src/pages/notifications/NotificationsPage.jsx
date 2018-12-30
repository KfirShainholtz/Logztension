/*global chrome*/
import React from "react";
import {Notification} from "./Notification";
import Switch from "@material-ui/core/Switch/Switch";

const alertsBody = {
    margin: '30px',
};

const alertsFooter = {
    // position: 'fixed',
    // bottom: 0,
    width: '100%',
    marginLeft: '10px',
    marginRight: '30px',
    marginBottom: '56px',
};

export class NotificationsPage extends React.Component {
    state = {
        notificationsActive: true,
        triggeredAlerts: [],
    };

    componentWillMount() {
        chrome.storage.sync.get('triggeredAlerts', ({triggeredAlerts}) => {
            this.setState({triggeredAlerts: triggeredAlerts.results});
        });

        chrome.storage.onChanged.addListener(({ triggeredAlerts }) => {
            if(triggeredAlerts && triggeredAlerts.newValue) {
                this.setState({ triggeredAlerts: triggeredAlerts.newValue.results });
            }
        });

        chrome.storage.sync.get('NotificationsActive', ({ NotificationsActive }) => {
            console.log('notificationsActive -', NotificationsActive);
            this.setState({'notificationsActive': (NotificationsActive !== false)});
        });
    }

    handleChange = name => evt => {
        chrome.storage.sync.set({ 'NotificationsActive': evt.target.checked });
        this.setState({ [name]: evt.target.checked });
    };

    render() {
        const notifications = this.state.triggeredAlerts.map(
            (alert) => <Notification id={alert.alertId} title={alert.name} timestamp={alert.eventDate}/>)
            .reverse();

        return (
            <div>
                <div style={alertsBody}>
                    {notifications}
                </div>
                <div style={alertsFooter}>
                    <Switch
                        checked={this.state.notificationsActive}
                        onChange={this.handleChange('notificationsActive')}
                        color="primary"
                        value="notificationsActive"
                    />
                    Notifications is
                    <label>{this.state.notificationsActive ? ' on' : ' off'}</label>
                </div>
            </div>
        );
    }
}
