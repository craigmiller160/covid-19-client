import React from 'react';
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

    let focus = false;
    const setFocus = (value) => {
        focus = value;
    };

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const value = rfProps.input.value ? moment(rfProps.input.value).toDate() : moment(defaultValue).toDate();

                const keyOnChange = (newValue) => {
                    if (moment(newValue).isValid() && !moment(value).isSame(moment(newValue))) {
                        rfProps.input.onChange(newValue);
                    }
                };

                return (
                    <KeyboardDatePicker
                        className={ className }
                        label={ label }
                        format="yyyy-MM-dd"
                        margin="normal"
                        disableToolbar
                        variant="outlined"
                        value={ value }
                        onBlur={ (event) => {
                            setFocus(false);
                            keyOnChange(event.target.value);
                        } }
                        onFocus={ () => setFocus(true) }
                        onChange={ (value) => {
                            if (!focus) {
                                const formattedValue = moment(value).format('YYYY-MM-DD');
                                rfProps.input.onChange(formattedValue);
                            }
                        } }
                        onKeyDown={ (event) => {
                            if (event.key === 'Enter') {
                                keyOnChange(event.target.value);
                            }
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
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default DateField;
