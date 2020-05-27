import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loading.scss';

const spinnerStyle = {
    width: '100%',
    height: '100%'
};

const Loading = () => {
    return (
        <div className="Loading" >
            <CircularProgress style={ spinnerStyle } />
        </div>
    );
};

export default Loading;