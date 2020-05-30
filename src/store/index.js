import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import coreSlice from './core/slice';
import countryDataSlice from './countryData/slice';
import stateDataSlice from './stateData/slice';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    core: coreSlice.reducer,
    countryData: countryDataSlice.reducer,
    stateData: stateDataSlice.reducer,
    form: formReducer
});

export default configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
});