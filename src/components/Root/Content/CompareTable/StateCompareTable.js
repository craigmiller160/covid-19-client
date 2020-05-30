import React from 'react';
import BaseCompareTable from './BaseCompareTable';
import { useDispatch } from 'react-redux';
import useLoading from '../../../hooks/useLoading';
import { loadStateCurrentData } from '../../../../store/stateData/actions';

const Component = () => <BaseCompareTable isState />;

const StateCompareTable = () => {
    const dispatch = useDispatch();
    const loader = () => dispatch(loadStateCurrentData());
    const DisplayComponent = useLoading({
        loader,
        component: Component
    });

    return (
        <DisplayComponent />
    );
};

export default StateCompareTable;