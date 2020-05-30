import React from 'react';
import BaseHistoricalChart from './BaseHistoricalChart';
import CountrySearch from '../Search/CountrySearch';

const CountryHistoricalChart = () => (
    <div>
        <CountrySearch />
        <BaseHistoricalChart />
    </div>
);

export default CountryHistoricalChart;