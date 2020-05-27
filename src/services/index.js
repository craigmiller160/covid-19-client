import api from './api';
import qs from 'qs';

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

export const getCountriesList = () => api.get('/countries');

export const getStatesList = () => api.get('/states');

export const downloadData = () => api.get('/download');

export const getMetadata = () => api.get('/metadata');