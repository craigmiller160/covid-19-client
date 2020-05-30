import React, { useEffect } from 'react';
import BaseHistoricalTable from './BaseHistoricalTable';
import CountrySearch from '../Search/CountrySearch';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountryHistoricalData } from '../../../../store/countryData/actions';
import Loading from '../Loading';
import useLoading from '../../../hooks/useLoading';

const Component = () => (
    <div>
        <CountrySearch />
        <BaseHistoricalTable />
    </div>
);

const CountryHistoricalTable = () => {
    const dispatch = useDispatch();
    const loader = () => dispatch(loadCountryHistoricalData());
    const DisplayComponent = useLoading({
        loader,
        component: Component
    });

    return (
        <DisplayComponent />
    );
}

export default CountryHistoricalTable;