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
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutocompleteField = (props) => {
	const {
		className,
		options,
		getOptionLabel,
		renderInput,
		name,
		multiple,
		onChange
	} = props;

	return (
		<Field
			name={name}
			onChange={onChange}
			component={(rfProps) => (
				<Autocomplete
					multiple={multiple}
					filterSelectedOptions={multiple}
					className={className}
					options={options}
					getOptionLabel={getOptionLabel}
					renderInput={renderInput}
					onChange={(event, newValue) =>
						rfProps.input.onChange(newValue)
					}
					value={rfProps.input.value}
					getOptionSelected={(option, value) =>
						option.value === value.value
					}
				/>
			)}
		/>
	);
};
AutocompleteField.propTypes = {
	className: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
			label: PropTypes.string
		})
	).isRequired,
	getOptionLabel: PropTypes.func.isRequired,
	renderInput: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	onChange: PropTypes.func
};
AutocompleteField.defaultProps = {
	multiple: false
};

export default AutocompleteField;
