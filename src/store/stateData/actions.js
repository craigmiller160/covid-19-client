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

import { change } from 'redux-form';
import {
	getCountryHistoricalData,
	getStateCompareData,
	getStateCurrentData,
	getStateHistoricalData,
	getStatesList
} from '../../services';
import stateDataSlice from './slice';
import { handleError } from '../utilityActions';
import coreSlice from '../core/slice';
import { STATE_SEARCH_FORM } from '../../components/Root/Content/Search/searchConstants';
import { usOption } from '../../util/countryOptions';
import {
	orderOptions,
	rankByOptions,
	STATE_COMPARE_FORM
} from '../../components/Root/Content/CompareTable/compareTableConstants';

const formatStateData = (data) =>
	data.map((state) => ({
		label: state.displayLocation,
		value: state.location
	}));

export const loadStates = () => async (dispatch) => {
	try {
		const res = await getStatesList();
		dispatch(stateDataSlice.actions.setStates(formatStateData(res.data)));
	} catch (ex) {
		dispatch(handleError(ex, 'Error loading state list'));
	}
};

export const loadStateCompareData = () => async (dispatch) => {
	try {
		dispatch(coreSlice.actions.setLoading(true));

		const res = await getStateCompareData();
		dispatch(stateDataSlice.actions.setCompareData(res.data));
	} catch (ex) {
		dispatch(handleError(ex, 'Error loading state compare data'));
	} finally {
		dispatch(coreSlice.actions.setLoading(false));
	}
};

export const loadStateHistoricalData = ({ field, value } = {}) => async (
	dispatch,
	getState
) => {
	try {
		if (field) {
			dispatch(change(STATE_SEARCH_FORM, field, value));
		}

		const formValues = getState().form[STATE_SEARCH_FORM]?.values ?? {};
		dispatch(coreSlice.actions.setLoading(true));

		const values = {
			...formValues,
			location: formValues.location || usOption
		};

		dispatch(change(STATE_SEARCH_FORM, 'location', values.location));

		let res;
		if (values.location.value === usOption.value) {
			res = await getCountryHistoricalData(
				values.location.value,
				values.startDate,
				values.endDate
			);
		} else {
			res = await getStateHistoricalData(
				values.location.value,
				values.startDate,
				values.endDate
			);
		}
		dispatch(stateDataSlice.actions.setHistoricalData(res.data));
	} catch (ex) {
		dispatch(handleError(ex, 'Error loading state historical data'));
	} finally {
		dispatch(coreSlice.actions.setLoading(false));
	}
};

export const loadStateCurrentData = ({ field, value } = {}) => async (
	dispatch,
	getState
) => {
	try {
		if (field) {
			dispatch(change(STATE_COMPARE_FORM, field, value));
		}

		dispatch(coreSlice.actions.setLoading(true));
		const { sortKey, sortOrder } =
			getState().form[STATE_COMPARE_FORM]?.values ?? {};

		const realSortKey = sortKey || rankByOptions[0];
		const realSortOrder = sortOrder || orderOptions[0];

		dispatch(change(STATE_COMPARE_FORM, 'sortKey', realSortKey));
		dispatch(change(STATE_COMPARE_FORM, 'sortOrder', realSortOrder));

		const res = await getStateCurrentData(sortKey.value, sortOrder.value);
		const formattedData = res.data.map((record, index) => ({
			...record,
			rank: index + 1
		}));
		dispatch(stateDataSlice.actions.setCurrentData(formattedData));
	} catch (ex) {
		dispatch(handleError(ex, 'Error loading state current data'));
	} finally {
		dispatch(coreSlice.actions.setLoading(false));
	}
};
