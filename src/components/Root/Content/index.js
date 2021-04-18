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
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Alert from './Alert';
import './Content.scss';
import { loadLists, loadMetadata } from '../../../store/core/actions';
import CountryHistoricalTable from './HistoricalTable/CountryHistoricalTable';
import CountryHistoricalChart from './HistoricalChart/CountryHistoricalChart';
import StateHistoricalTable from './HistoricalTable/StateHistoricalTable';
import StateHistoricalChart from './HistoricalChart/StateHistoricalChart';
import CountryCompareTable from './CompareTable/CountryCompareTable';
import StateCompareTable from './CompareTable/StateCompareTable';
import Home from './Home';

const Content = () => {
	const downloadDate = useSelector((state) => state.core.downloadDate);
	const dispatch = useDispatch();

	useEffect(() => {
		const startup = async () => {
			await dispatch(loadLists());
			await dispatch(loadMetadata());
		};
		startup();
    }, []); // eslint-disable-line

	return (
		<Container className="Content">
			<Alert />
			<h3>
				<span>Last updated: </span>
				<span>{downloadDate}</span>
			</h3>
			<Switch>
				<Route
					path="/country/history/data"
					component={CountryHistoricalTable}
				/>
				<Route
					path="/country/history/chart"
					component={CountryHistoricalChart}
				/>
				<Route
					path="/state/history/data"
					component={StateHistoricalTable}
				/>
				<Route
					path="/state/history/chart"
					component={StateHistoricalChart}
				/>
				<Route
					path="/country/compare"
					component={CountryCompareTable}
				/>
				<Route path="/state/compare" component={StateCompareTable} />
				<Route path="/" exact component={Home} />
				<Redirect to="/" />
			</Switch>
		</Container>
	);
};

export default Content;
