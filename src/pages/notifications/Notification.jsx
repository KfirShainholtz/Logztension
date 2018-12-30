/*global chrome*/
import React from 'react';

const titleStyle = {
    fontSize: '15px',
    color: 'rgb(0,121,174)',
};

const timestampStyle = {
    fontSize: '10px',
    color: 'rgb(152,156,158)',

};

export const Notification = (props) => {
    return (
        <div>
            <lable style={titleStyle}>{props.title}</lable>
            <label>{props.timestamp}</label>
        </div>
    );
};
