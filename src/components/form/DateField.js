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

    // TODO detect enter key when focused

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const value = rfProps.input.value ? moment(rfProps.input.value).toDate() : moment(defaultValue).toDate();
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
                            if (moment(event.target.value).isValid() && !moment(value).isSame(moment(event.target.value))) {
                                rfProps.input.onChange(event.target.value);
                            }
                        } }
                        onFocus={ () => setFocus(true) }
                        onChange={ (value) => {
                            if (!focus) {
                                const formattedValue = moment(value).format('YYYY-MM-DD');
                                rfProps.input.onChange(formattedValue);
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
