import dataSlice from './core/slice';

export const handleError = (ex, message) => (dispatch) => {
    let errorPayload;
    if (ex.response) {
        let message = ex.response.data;
        if (typeof message === 'object') {
            message = ex.response.data.message;
        }
        errorPayload = {
            title: message,
            details: `Status: ${ex.response.status}. Message: ${message}`
        };
    } else {
        errorPayload = {
            title: message,
            details: ex.message
        };
    }
    console.log(ex);
    dispatch(dataSlice.actions.setError(errorPayload));
};