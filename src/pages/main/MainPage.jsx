/*global chrome*/
import React from "react";
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withStyles, Grid, AppBar, Tabs, Tab, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { NotificationsPage } from '../notifications/NotificationsPage';

const styles = theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    topMenu: {
        backgroundColor: '#0B7CAD',
    },
    contentContainer: {
        marginTop: 8,
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
});

class MainPage extends React.Component {

    state = { };

    handleBottomNavigationChange(event, value) {
        if(value === 'logout'){
           this.logout();
        }
        if(value === 'docs'){
            this.openDocs();
        }
    }

    openDocs() {
        chrome.tabs.getSelected(null, function(tab) {
            console.log('getSelected tab:', tab);

            if (tab.url.includes('logz.io')) {
                console.log('MainPage::toggle-docs', arguments);
                // chrome.tabs.executeScript({file: 'content-scripts/toggle-docs.js'});
                chrome.tabs.executeScript({code: 'console.log(\'docsIframe.style.display before:\', document.getElementById(\'help-docs\').style.display);\n' +
                        'if (document.getElementById(\'help-docs\').style.display === "none") {\n' +
                        '    document.getElementById(\'help-docs\').style.display = "block";\n' +
                        '} else {\n' +
                        '    document.getElementById(\'help-docs\').style.display = "none";\n' +
                        '}\n' +
                        'console.log(\'docsIframe.style.display after:\', document.getElementById(\'help-docs\').style.display);\n'});
            } else {
                chrome.tabs.create({ url: 'https://docs.logz.io/' });
            }
        });
    }

    logout() {
        chrome.storage.sync.set({ 'apiToken': null }, () => {
            console.log('MainPage::logout', arguments);
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Route
                    path="/"
                    render={({ location }) => (
                    <AppBar position="static">
                        <Tabs value={location.pathname} className={classes.topMenu}>
                            <Tab label="Notifications" component={Link} to="/notification" />
                        </Tabs>
                    </AppBar>
                )} />

                <Grid container justify={'center'} className={classes.contentContainer}>
                    <Redirect from="/" to="/notification" /> {/* default state */}
                    <Route path="/notification" component={NotificationsPage} />
                </Grid>

                <BottomNavigation
                    className={classes.stickToBottom}
                    onChange={this.handleBottomNavigationChange.bind(this)}
                    showLabels
                >
                    <BottomNavigationAction label="Logz.io" href="https://app.logz.io/" target="_blank"/>
                    <BottomNavigationAction label="Logz.io Docs" value="docs"/>
                    <BottomNavigationAction value="logout" label="Logout" />
                </BottomNavigation>

            </div>
        );
    }
}

export default withStyles(styles)(MainPage);

/* eslint-enable-rule no-undef */
