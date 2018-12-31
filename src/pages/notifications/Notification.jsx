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
    textAlign: 'right',

};

const editAlert = (id) => "https://app.logz.io/#/dashboard/kibana/discover?_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:%5Blogz-uxidmgzqmlkpusfvzsvaidonfurcwiyk-%5DYYMMDD,key:logLevel,negate:!f,type:phrase,value:ERROR),query:(match:(logLevel:(query:ERROR,type:phrase))))),query:(language:lucene,query:'%22Failed%20to%20create%20lead%20in%20marketo%20lead%20db%22%20AND%20-%22_mkto_trk%22'),sort:!('@timestamp',desc))&_g=(refreshInterval:(display:Off,section:0,value:0),time:(from:'2018-12-26T07:38:00.377Z',mode:absolute,to:'2018-12-31T07:38:00.377Z'))&accountIds=16987";
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
