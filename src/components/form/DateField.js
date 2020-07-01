import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { KeyboardDatePicker } from '@material-ui/pickers';

/*
 * Necessary when using this:
 *
 * import { MuiPickerUtilsProvider } from '@material-ui/pickers';
 * import DateFnsUtils from '@date-io/date-fns';
 *
 * <MuiPickerUtilsProvider utils={ DateFnsUtils }>
 *      // Pickers go here
 * </MuiPickerUtilsProvider>
 */

const DateField = (props) => {
    const {
        name,
        className,
        label,
        defaultValue,
        onChange
    } = props;

    // TODO non-serializable value warning occurs here... figure out how to fix it. not catastrophic yet
    // TODO typing in a date value breaks this here

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => (
                <KeyboardDatePicker
                    className={ className }
                    label={ label }
                    format="yyyy-MM-dd"
                    margin="normal"
                    disableToolbar
                    variant="outlined"
                    value={ rfProps.input.value || defaultValue }
                    onChange={ (value) => rfProps.input.onChange(value) }
                />
            ) }
        />
    );
};
DateField.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
};

export default DateField;
