import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

const Form = (props) => {
    const {
        children,
        className,
        handleSubmit
    } = props;

    return (
        <form
            className={ className }
            onSubmit={ (event) => {
                event.preventDefault();
                handleSubmit(event);
            } }
        >
            { children }
        </form>
    );
};
Form.propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func
};

const ReduxForm = reduxForm({})(Form);
ReduxForm.propTypes = {
    form: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
};

export default ReduxForm;