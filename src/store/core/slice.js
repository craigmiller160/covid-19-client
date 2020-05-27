import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    downloadDate: null,
    started: false
};

const setLoading = (state, action) => {
    state.loading = action.payload;
};

const setError = (state, action) => {
    state.error = action.payload;
};

const setDownloadDate = (state, action) => {
    state.downloadDate = action.payload;
};

const setStarted = (state, action) => {
    state.started = action.payload;
};

export default createSlice({
    name: 'core',
    initialState,
    reducers: {
        setLoading,
        setError,
        setDownloadDate,
        setStarted
    }
});