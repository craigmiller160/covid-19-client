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
    getCountriesList, getCountryCompareData,
    getCountryCurrentData,
    getCountryHistoricalData,
    getWorldHistoricalData
} from '../../services';
import countryDataSlice from './slice';
import coreSlice from '../core/slice';
import { handleError } from '../utilityActions';
import { COUNTRY_SEARCH_FORM } from '../../components/Root/Content/Search/searchConstants';
import { worldOption } from '../../util/countryOptions';
import {
    COUNTRY_COMPARE_FORM,
    orderOptions,
    rankByOptions
} from '../../components/Root/Content/CompareTable/compareTableConstants';

const formatCountryData = (data) =>
    data.map((country) => ({
        label: country.displayLocation,
        value: country.location
    }));

export const loadCountries = () => async (dispatch) => {
    try {
        const res = await getCountriesList();
        dispatch(countryDataSlice.actions.setCountries(formatCountryData(res.data)));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading country list'));
    }
};

export const loadCountryHistoricalData = ({ field, value } = {}) => async (dispatch, getState) => {
    try {
        if (field) {
            dispatch(change(COUNTRY_SEARCH_FORM, field, value));
        }

        const formValues = getState().form[COUNTRY_SEARCH_FORM]?.values ?? {};
        dispatch(coreSlice.actions.setLoading(true));

        const values = {
            ...formValues,
            location: formValues.location || worldOption
        };

        dispatch(change(COUNTRY_SEARCH_FORM, 'location', values.location));

        let res;
        if (values.location.value === worldOption.value) {
            res = await getWorldHistoricalData(values.startDate, values.endDate);
        } else {
            res = await getCountryHistoricalData(values.location.value, values.startDate, values.endDate);
        }
        dispatch(countryDataSlice.actions.setHistoricalData(res.data));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading country historical data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};

export const loadCountryCompareData = ({ field, value } = {}) => async (dispatch, getState) => {
    try {
        const res = await getCountryCompareData();
        dispatch(countryDataSlice.actions.setCurrentData(res.data));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading country compare data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};

export const loadCountryCurrentData = ({ field, value } = {}) => async (dispatch, getState) => {
    try {
        if (field) {
            dispatch(change(COUNTRY_COMPARE_FORM, field, value));
        }

        dispatch(coreSlice.actions.setLoading(true));
        const { sortKey, sortOrder } = getState().form[COUNTRY_COMPARE_FORM]?.values ?? {};

        const realSortKey = sortKey || rankByOptions[0];
        const realSortOrder = sortOrder || orderOptions[0];

        dispatch(change(COUNTRY_COMPARE_FORM, 'sortKey', realSortKey));
        dispatch(change(COUNTRY_COMPARE_FORM, 'sortOrder', realSortOrder));

        const res = await getCountryCurrentData(realSortKey.value, realSortOrder.value);
        const formattedData = res.data.map((record, index) => ({
            ...record,
            rank: index + 1
        }));
        dispatch(countryDataSlice.actions.setCurrentData(formattedData));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading country current data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};
