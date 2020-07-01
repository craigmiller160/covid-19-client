import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import moment from 'moment';
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

    // TODO typing in a date value breaks this here

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const value = rfProps.input.value ? moment(rfProps.input.value).toDate() : defaultValue;
                return (
                    <KeyboardDatePicker
                        className={ className }
                        label={ label }
                        format="yyyy-MM-dd"
                        margin="normal"
                        disableToolbar
                        variant="outlined"
                        value={ value }
                        onBlur={ () => console.log('OnBlur') } // TODO trying this
                        onFocus={ () => console.log('OnFocus') } // TODO trying this
                        onChange={ (value) => {
                            const formattedValue = moment(value).format('YYYY-MM-DD');
                            rfProps.input.onChange(formattedValue);
                        } }
                    />
                );
            } }
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
