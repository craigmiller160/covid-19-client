import React from 'react';
import BaseHistoricalChart from './BaseHistoricalChart';
import StateSearch from '../Search/StateSearch';
import { useDispatch } from 'react-redux';
import { loadStateHistoricalData } from '../../../../store/stateData/actions';
import useLoading from '../../../hooks/useLoading';

const Component = () => (
    <div>
        <StateSearch />
        <BaseHistoricalChart isState />
    </div>
);

const StateHistoricalChart = () => {
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

export default StateHistoricalChart;