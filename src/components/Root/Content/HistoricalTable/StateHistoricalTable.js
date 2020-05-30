import React from 'react';
import BaseHistoricalTable from './BaseHistoricalTable';
import StateSearch from '../Search/StateSearch';
import { useDispatch } from 'react-redux';
import { loadStateHistoricalData } from '../../../../store/stateData/actions';
import useLoading from '../../../hooks/useLoading';

const Component = () => (
    <div>
        <StateSearch />
        <BaseHistoricalTable isState />
    </div>
);

const StateHistoricalTable = () => {
    const dispatch = useDispatch();
    const loader = () => dispatch(loadStateHistoricalData());
    const DisplayComponent = useLoading({
        loader,
        component: Component
    });

    return (
        <DisplayComponent />
    );
};

export default StateHistoricalTable;