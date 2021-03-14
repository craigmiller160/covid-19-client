/*
 *     covid-19-client
 *     Copyright (C) 2021 Craig Miller
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
import { DatePicker } from '@material-ui/pickers';
import { Field } from 'redux-form';
import parse from 'date-fns/parse/index';
import format from 'date-fns/format/index';
import startOfMonth from 'date-fns/startOfMonth/index';

const DATE_FORMAT = 'yyyy-MM-dd';

const parseValue = (value, defaultValue) => {
    if (value) {
        return parse(value, DATE_FORMAT, new Date());
    }

    return parse(defaultValue, DATE_FORMAT, new Date());
};

const MonthField = (props) => {
    const {
        label,
        name,
        onChange,
        defaultValue
    } = props;

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const value = parseValue(rfProps.input.value, defaultValue);
                const innerOnChange = (newValue) => {
                    const formattedValue = format(startOfMonth(newValue), DATE_FORMAT);
                    rfProps.input.onChange(formattedValue);
                };

                return (
                    <DatePicker
                        variant="outlined"
                        label={ label }
                        openTo="month"
                        views={ [
                            'year',
                            'month'
                        ] }
                        onChange={ innerOnChange }
                        value={ value }
                    />
                );
            } }
        />
    );
};
MonthField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

export default MonthField;
