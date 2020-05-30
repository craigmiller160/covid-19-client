import React from 'react';
import BaseCompareTable from './BaseCompareTable';
import { useDispatch } from 'react-redux';
import { loadCountryCurrentData } from '../../../../store/countryData/actions';
import useLoading from '../../../hooks/useLoading';

const Component = () => <BaseCompareTable />;

const CountryCompareTable = () =>{
    const dispatch = useDispatch();
    const loader = () => dispatch(loadCountryCurrentData());
    const DisplayComponent = useLoading({
        loader,
        component: Component
    });

    return (
        <DisplayComponent />
    );
};

export default CountryCompareTable;