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
import MuiAlert from '@material-ui/lab/Alert';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AlertTitle from '@material-ui/lab/AlertTitle';
import './Alert.scss';
import coreSlice from '../../../../store/core/slice';

const Alert = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.core.error, shallowEqual);

	if (!error) {
		return <div />;
	}

	return (
		<MuiAlert
			className="Alert"
			severity="error"
			variant="filled"
			onClose={() => dispatch(coreSlice.actions.setError(null))}
		>
			<AlertTitle>{error.title}</AlertTitle>
			{error.details}
		</MuiAlert>
	);
};

export default Alert;
