import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    historicalData: [],
    currentData: [],
    states: []
};

const setStates = (state, action) => {
    state.states = action.payload;
};

const setHistoricalData = (state, action) => {
    state.historicalData = action.payload;
};

const setCurrentData = (state, action) => {
    state.currentData = action.payload;
};

export default createSlice({
    name: 'stateData',
    initialState,
    reducers: {
        setStates,
        setHistoricalData,
        setCurrentData
    }
});