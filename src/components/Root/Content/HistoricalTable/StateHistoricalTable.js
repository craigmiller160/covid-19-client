import React from 'react';
import BaseHistoricalTable from './BaseHistoricalTable';
import StateSearch from '../Search/StateSearch';

const StateHistoricalTable = () => (
    <div>
        <StateSearch />
        <BaseHistoricalTable isState />
    </div>
);

export default StateHistoricalTable;