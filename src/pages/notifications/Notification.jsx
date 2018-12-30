/*global chrome*/
import React from 'react';
import * as moment from "moment";
import { Grid, Paper}  from "@material-ui/core";

const containerStyle ={
    marginBottom: '5px',
};

const titleStyle = {
    fontSize: '15px',
    color: '#0B7CAD',
    textDecoration: 'none',
};

const timestampStyle = {
    fontSize: '15px',
    color: '#797D82',
    align: 'right',
};

const editAlert = (id) => `https://app.logz.io/#/dashboard/alerts/optimizer-wizard/${id}`;
const toDate = (unixTime) => moment.unix(unixTime).format('HH:mm:ss');

export const Notification = (props) => {
    return (
        <div>
            <Grid container spacing={12} style={containerStyle}>
                <Grid item xs={9} style={titleStyle}>
                    <a style={titleStyle} target="_blank" href={editAlert(props.id)}>{props.title}</a>
                </Grid>
                <Grid item xs={3} style={timestampStyle}>
                    <label>{toDate(props.timestamp)}</label>
                </Grid>
            </Grid>
        </div>
    );
};
