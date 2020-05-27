import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    historicalData: [],
    currentData: [],
    countries: []
};

const setCountries = (state, action) => {
    state.countries = action.payload;
};

const setHistoricalData = (state, action) => {
    state.historicalData = action.payload;
};

const setCurrentData = (state, action) => {
    state.currentData = action.payload;
};

export default createSlice({
    name: 'countryData',
    initialState,
    reducers: {
        setCountries,
        setHistoricalData,
        setCurrentData
    }
})