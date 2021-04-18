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

import dataSlice from './core/slice';

export const handleError = (ex, message) => (dispatch) => {
	let errorPayload;
	if (ex.response) {
		let exMessage = ex.response.data;
		if (typeof exMessage === 'object') {
			exMessage = ex.response.data.message;
		}
		errorPayload = {
			title: exMessage,
			details: `Status: ${ex.response.status}. Message: ${exMessage}`
		};
	} else {
		errorPayload = {
			title: message,
			details: ex.message
		};
	}
	console.error(ex);
	dispatch(dataSlice.actions.setError(errorPayload));
};
