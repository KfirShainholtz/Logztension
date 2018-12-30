/* global chrome */

import React, { Component } from 'react';
import './App.css';

const trigeredAlertDrillDown = "https://app.logz.io/#/dashboard/kibana/discover?_a=(columns:!(message),filters:!(),query:(language:lucene,query:'type:%20auto-scaler%20AND%20%22error%20occurred%20while%20calculating%20execution%20for%20autoScalingGroup%22%20AND%20NOT%20%22io.logz.auto.scaler.exception.ServersRateNotFound%22'),sort:!('@timestamp',desc))&_g=(refreshInterval:(display:Off,section:0,value:0),time:(from:'2018-12-26T20:39:52.925Z',mode:absolute,to:'2018-12-29T20:39:52.925Z'))&accountIds=16987&accountIds=300";

class App extends Component {

  state = { triggeredAlerts: null };

  alertLink(alert) {
    return <a className="App-link" href={trigeredAlertDrillDown} target="_blank" rel="noopener noreferrer">{alert.name}</a>;
  }

  getTriggeredAlertsList(alerts) {
      const listItems = alerts.map((alert, index) =>
          <li key={index}>{this.alertLink(alert)}</li>
      );

      return (<ul className="triggered-alerts-list">{listItems}</ul>);
  }

  componentWillMount() {
    chrome.storage.sync.get('triggeredAlerts', ({ triggeredAlerts }) => this.setState({ triggeredAlerts }));
  }

  render() {
    if (this.state.triggeredAlerts === null) {
      return 'Loading...'
    } else {
      return (
          <div className="App">
            <header className="App-header">
                Logz.io
                {this.getTriggeredAlertsList(this.state.triggeredAlerts.results)}
            </header>
          </div>
      );
    }
  }
}

export default App;
