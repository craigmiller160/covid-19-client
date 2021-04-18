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

import { shallowEqual, useSelector } from 'react-redux';

const countryDataSelector = (state) => state.countryData.historicalData;
const stateDataSelector = (state) => state.stateData.historicalData;

const countryLocationSelector = (state) =>
	state.form.countrySearch.values.location;
const stateLocationSelector = (state) => state.form.stateSearch.values.location;

const useHistoryData = (props) => {
	const { isState } = props;

	const dataSelector = isState ? stateDataSelector : countryDataSelector;
	const data = useSelector(dataSelector, shallowEqual);

	const locationSelector = isState
		? stateLocationSelector
		: countryLocationSelector;
	const location = useSelector(locationSelector, shallowEqual);

	return {
		data,
		location
	};
};

export default useHistoryData;
