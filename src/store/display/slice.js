import { createSlice } from '@reduxjs/toolkit';

export const SECTION_HOME = 0;
export const SECTION_COUNTRY_HIST_DATA = 1;
export const SECTION_COUNTRY_HIST_CHARTS = 2;
export const SECTION_STATE_HIST_DATA = 3;
export const SECTION_STATE_HIST_CHARTS = 4;
export const SECTION_COUNTRY_COMPARE_DATA = 5;
export const SECTION_STATE_COMPARE_DATA = 6;
export const CHART_TOTAL_CASES = 1;
export const CHART_NEW_CASES = 2;
export const CHART_TOTAL_DEATHS = 3;
export const CHART_NEW_DEATHS = 4;

const initialState = {
    selectedSection: SECTION_HOME,
    selectedChart: CHART_TOTAL_CASES
};

const setSelectedSection = (state, action) => {
    state.selectedSection = action.payload;
};

const setSelectedChart = (state, action) => {
    state.selectedChart = action.payload;
};

export default createSlice({
    name: 'display',
    initialState,
    reducers: {
        setSelectedSection,
        setSelectedChart
    }
});