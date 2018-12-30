/*global chrome*/
import React from 'react';
import * as moment from "moment";

const titleStyle = {
    fontSize: '15px',
    color: '#0B7CAD',
};

const timestampStyle = {
    fontSize: '15px',
    color: '#797D82',

};

const toDate = (unixTime) => moment.unix(unixTime).format('HH:mm:ss');

export const Notification = (props) => {
    return (
        <div>
            <lable style={titleStyle}>{props.title}</lable>
            <label style={timestampStyle}>{toDate(props.timestamp)}</label>
        </div>
    );
};
