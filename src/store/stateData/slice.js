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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    compareData: [],
    historicalData: [],
    currentData: [],
    states: []
};

const setStates = (draft, action) => {
    draft.states = action.payload;
};

const setHistoricalData = (draft, action) => {
    draft.historicalData = action.payload;
};

const setCurrentData = (draft, action) => {
    draft.currentData = action.payload;
};

const setCompareData = (draft, action) => {
    draft.compareData = action.payload;
};

export default createSlice({
    name: 'stateData',
    initialState,
    reducers: {
        setStates,
        setHistoricalData,
        setCurrentData,
        setCompareData
    }
});
