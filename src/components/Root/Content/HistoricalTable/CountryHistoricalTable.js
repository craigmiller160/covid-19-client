import React from 'react';
import BaseHistoricalTable from './BaseHistoricalTable';
import CountrySearch from '../Search/CountrySearch';

const CountryHistoricalTable = () => (
    <div>
        <CountrySearch />
        <BaseHistoricalTable />
    </div>
);

export default CountryHistoricalTable;