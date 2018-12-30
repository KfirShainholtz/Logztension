/*global chrome*/
import React from "react";
import {Redirect} from "react-router-dom";
import { withStyles, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { VpnKey } from '@material-ui/icons';
import { Field, Formik } from 'formik';

const styles = theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    logoContainer: {
        backgroundColor: '#0B7CAD',
        padding: '24px 12px',
    },
    logo: {
        height: 40,
    },
    formContainer: {
        margin: '12px 24px',
    },
    formRow: {
        marginTop: 16,
    }
});

class LoginPage extends React.Component {

    state = {
        isConnected: null,
    };

    componentWillMount() {
        chrome.storage.sync.get('apiToken', ({ apiToken }) => {
            this.setState({isConnected: Boolean(apiToken)});
        });
    }

    handleSubmit(values, actions) {
        actions.setSubmitting(true);

        //TODO: check token via API
        setTimeout(() => {
            console.log('values', values);
            chrome.storage.sync.set({ 'apiToken': values.token }, () => {
                actions.setSubmitting(false);
                this.setState({ isConnected: true });
            });
        }, 2000);
    }

    render() {

        const { classes } = this.props;

        if(this.state.isConnected) {
            return (<Redirect to="/notifications"/>);
        }

        return (
            <div className={classes.root}>

                <Grid container justify={'center'} className={classes.logoContainer}>
                    <img className={classes.logo}
                        src="logo_white.png"
                        alt="logo" />
                </Grid>

                <div className={classes.formContainer}>
                    <Formik
                        initialValues={{ token: '' }}
                        onSubmit={this.handleSubmit.bind(this)}
                        render={({ handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={16} alignItems="flex-end" className={classes.formRow}>
                                    <Grid item>
                                        <VpnKey />
                                    </Grid>
                                    <Grid item md={true} sm={true} xs={true}>
                                        <Field
                                            name="token"
                                            render={({ field, form: { isSubmitting } }) => (
                                                <TextField {...field}
                                                    label="API Token"
                                                    type="text"
                                                    placeholder="XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
                                                    fullWidth
                                                    required
                                                    disabled={isSubmitting}
                                                    size='small'
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" justify="space-between" className={classes.formRow}>
                                    <Grid item>
                                        <Button disableFocusRipple disableRipple
                                            style={{ textTransform: "none" }}
                                            variant="text"
                                            color="primary"
                                            size="small"
                                            href='https://app.logz.io/#/dashboard/settings/api-tokens'
                                            target='_blank'>
                                            Don't have an API token ?
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container justify="center" className={classes.formRow}>
                                    <Button variant="outlined"
                                        color="primary"
                                        disabled={isSubmitting}
                                        style={{ textTransform: "none" }}
                                        fullWidth
                                        type='submit'>
                                        {isSubmitting ? <CircularProgress size="16px" /> : 'Login'}
                                    </Button>
                                </Grid>
                            </form>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LoginPage);

/* eslint-enable-rule no-undef */
