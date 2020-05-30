import React from 'react';
import BaseHistoricalChart from './BaseHistoricalChart';
import CountrySearch from '../Search/CountrySearch';
import { useDispatch } from 'react-redux';
import { loadCountryHistoricalData } from '../../../../store/countryData/actions';
import useLoading from '../../../hooks/useLoading';

const Component = () => (
    <div>
        <CountrySearch />
        <BaseHistoricalChart />
    </div>
);

const CountryHistoricalChart = () => {
    const dispatch = useDispatch();
    const loader = () => dispatch(loadCountryHistoricalData());
    const DisplayComponent = useLoading({
        loader,
        component: Component
    });

    return (
        <DisplayComponent />
    );
};

export default CountryHistoricalChart;