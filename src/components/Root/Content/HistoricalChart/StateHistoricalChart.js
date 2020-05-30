import React from 'react';
import BaseHistoricalChart from './BaseHistoricalChart';
import StateSearch from '../Search/StateSearch';

const StateHistoricalChart = () => (
    <div>
        <StateSearch />
        <BaseHistoricalChart isState />
    </div>
);

export default StateHistoricalChart;