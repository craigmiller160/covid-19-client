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

import qs from 'qs';
import api from './api';

export const getCountryHistoricalData = (country, startDate, endDate) =>
    api.get(`/country/historical/${country}?${qs.stringify({ startDate, endDate })}`);

export const getWorldHistoricalData = (startDate, endDate) =>
    api.get(`/country/historical?${qs.stringify({ startDate, endDate })}`);

export const getCountryCurrentData = (sortKey, sortOrder) =>
    api.get(`/countries/current?${qs.stringify({ sortKey, sortOrder })}`);

export const getStateCurrentData = (sortKey, sortOrder) =>
    api.get(`/states/current?${qs.stringify({ sortKey, sortOrder })}`);

export const getStateHistoricalData = (state, startDate, endDate) =>
    api.get(`/state/historical/${state}?${qs.stringify({ startDate, endDate })}`);

export const getCountryCurrentRangeData = (startMonth, endMonth, sortKey, sortOrder) =>
    api.get(`/countries/current/range?${qs.stringify({ startMonth, endMonth, sortKey, sortOrder })}`);

export const getCountriesList = () => api.get('/countries');

export const getStatesList = () => api.get('/states');

export const downloadData = () => api.get('/download');

export const getMetadata = () => api.get('/metadata');
