/*
 *     covid-19-client
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import moment from 'moment'; // TODO get rid of this
import { KeyboardDatePicker } from '@material-ui/pickers'; // TODO this is probably a bundle problem

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
                const value = rfProps.input.value ? moment(rfProps.input.value).toDate() :
                    moment(defaultValue).toDate();

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
                        onChange={ (changeValue) => {
                            if (!focus) {
                                const formattedValue = moment(changeValue).format('YYYY-MM-DD');
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
