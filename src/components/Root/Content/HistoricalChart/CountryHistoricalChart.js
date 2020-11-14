/*
 *     covid-19-client
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import BaseHistoricalChart from './BaseHistoricalChart';
import CountrySearch from '../Search/CountrySearch';
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
