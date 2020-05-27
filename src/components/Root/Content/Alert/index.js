import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AlertTitle from '@material-ui/lab/AlertTitle';
import './Alert.scss';
import coreSlice from '../../../../store/core/slice';

const Alert = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.core.error, shallowEqual);

    if (!error) {
        return (
            <div />
        );
    }

    return (
        <MuiAlert
            className="Alert"
            severity="error"
            variant="filled"
            onClose={ () => dispatch(coreSlice.actions.setError(null)) }
        >
            <AlertTitle>{ error.title }</AlertTitle>
            { error.details }
        </MuiAlert>
    );
};

export default Alert;