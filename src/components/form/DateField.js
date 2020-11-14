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

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import parse from 'date-fns/parse/index';
import isValid from 'date-fns/isValid/index';
import isEqual from 'date-fns/isEqual/index';
import format from 'date-fns/format/index';
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

const DATE_FORMAT = 'yyyy-MM-dd';

const parseValue = (value, defaultValue) => {
    if (value) {
        return parse(value, DATE_FORMAT, new Date());
    }

    return parse(defaultValue, DATE_FORMAT, new Date());
};

const DateField = (props) => {
    const {
        name,
        className,
        label,
        defaultValue,
        onChange
    } = props;

    const focus = useRef(false);

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const value = parseValue(rfProps.input.value, defaultValue);

                const keyOnChange = (newValue) => {
                    const parsedNewValue = parse(newValue, DATE_FORMAT, new Date());
                    if (isValid(parsedNewValue) && !isEqual(value, parsedNewValue)) {
                        rfProps.input.onChange(newValue);
                    }
                };

                const onChange = (newValue) => {
                    if (!focus.current) {
                        const formattedValue = format(newValue, 'yyyy-MM-dd');
                        rfProps.input.onChange(formattedValue);
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
                            focus.current = false;
                            keyOnChange(event.target.value);
                        } }
                        onFocus={ () => focus.current = true }
                        onChange={ onChange }
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
