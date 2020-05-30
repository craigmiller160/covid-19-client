import React, { useEffect } from 'react';
import BaseHistoricalTable from './BaseHistoricalTable';
import CountrySearch from '../Search/CountrySearch';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountryHistoricalData } from '../../../../store/countryData/actions';
import Loading from '../Loading';

const CountryHistoricalTable = () => {
    const loading = useSelector((state) => state.core.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCountryHistoricalData());
    }, []);

    return (
        <div>
            {
                loading &&
                <Loading />
            }
            {
                !loading &&
                <div>
                    <CountrySearch />
                    <BaseHistoricalTable />
                </div>
            }
        </div>
    );
}

export default CountryHistoricalTable;