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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BaseHistoricalTable from './BaseHistoricalTable';
import StateSearch from '../Search/StateSearch';
import { loadStateHistoricalData } from '../../../../store/stateData/actions';
import useLoading from '../../../hooks/useLoading';
import stateSlice from '../../../../store/stateData/slice';

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

	useEffect(
		() => () => {
			dispatch(stateSlice.actions.setHistoricalData([]));
		},
		[dispatch]
	);

	return <DisplayComponent />;
};

export default StateHistoricalTable;
