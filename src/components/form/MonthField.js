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

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import { Field } from 'redux-form';
import format from 'date-fns/format/index';

const MonthField = (props) => {
    const {
        label,
        name,
        onChange
    } = props;

    return (
        <Field
            name={ name }
            onChange={ onChange }
            component={ (rfProps) => {
                const innerOnChange = (newValue) => {
                    const formattedValue = format(newValue, 'yyyy-MM-dd');
                    rfProps.input.onChange(formattedValue);
                };

                return (
                    <DatePicker
                        variant="outlined"
                        label={ label }
                        openTo="month"
                        views={ [
                            "year",
                            "month"
                        ] }
                        onChange={ innerOnChange }
                        value={ rfProps.value }
                    />
                );
            } }
        />
    );
};
MonthField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default MonthField;
