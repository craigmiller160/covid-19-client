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

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import './BaseCompareTable.scss';
import format from 'date-fns/format/index';
import parse from 'date-fns/parse/index';
import compareAsc from 'date-fns/compareAsc/index';
import Table from '../../../ui/Table';
import {
	COUNTRY_COMPARE_FORM,
	STATE_COMPARE_FORM
} from './compareTableConstants';
import CompareSearch from './CompareSearch';

const countrySelector = (state) => state.countryData.compareData;
const stateSelector = (state) => state.stateData.compareData;

const MONTH_FORMAT = 'yyyyMM';
const DATE_FORMAT = 'yyyy-MM-dd';

const createColumnNames = (isState) => [
	'Rank',
	isState ? 'State' : 'Country',
	'Population',
	'Total Cases',
	'Total Deaths',
	'Cases Per-Million',
	'Deaths Per-Million'
];

const BaseCompareTable = (props) => {
	const { isState } = props;

	const dataSelector = isState ? stateSelector : countrySelector;
	const data = useSelector(dataSelector, shallowEqual);
	const columnNames = createColumnNames(isState);
	const formName = isState ? STATE_COMPARE_FORM : COUNTRY_COMPARE_FORM;
	const formValues = useSelector(
		(state) => state.form[formName]?.values ?? {},
		shallowEqual
	);

	const formattedData = useMemo(() => {
		const startDate = parse(formValues.startDate, DATE_FORMAT, new Date());
		const endDate = parse(formValues.endDate, DATE_FORMAT, new Date());

		const formatSortData = data
			.map((record) => {
				const firstDate = new Date(record.firstDate);
				const lastDate = new Date(record.lastDate);

				let startDateKey = format(startDate, MONTH_FORMAT);
				if (compareAsc(firstDate, startDate) > 0) {
					startDateKey = format(firstDate, MONTH_FORMAT);
				}

				let endDateKey = format(endDate, MONTH_FORMAT);
				if (compareAsc(lastDate, endDate) < 0) {
					endDateKey = format(lastDate, MONTH_FORMAT);
				}

				const startTotalCases =
					record[`startTotalCases_${startDateKey}`];
				const endTotalCases = record[`endTotalCases_${endDateKey}`];
				const startTotalDeaths =
					record[`startTotalDeaths_${startDateKey}`];
				const endTotalDeaths = record[`endTotalDeaths_${endDateKey}`];

				const totalCases = endTotalCases - startTotalCases;
				const totalDeaths = endTotalDeaths - startTotalDeaths;
				const totalCasesPerMillion =
					(totalCases / record.population) * 1_000_000;
				const totalDeathsPerMillion =
					(totalDeaths / record.population) * 1_000_000;

				return {
					location: record.location,
					displayLocation: record.displayLocation,
					population: record.population,
					totalDeaths,
					totalCases,
					totalCasesPerMillion,
					totalDeathsPerMillion,
					_id: record._id // eslint-disable-line no-underscore-dangle
				};
			})
			.sort((one, two) => {
				const diff =
					one[formValues.sortKey?.value] -
					two[formValues.sortKey?.value];
				if (formValues.sortOrder?.value === 'desc') {
					return diff * -1;
				}
				return diff;
			})
			.map((record, index) => ({
				...record,
				rank: index + 1
			}));
		if (formValues.location?.length > 0) {
			return formatSortData.filter((element) =>
				formValues.location.find(
					(location) => location.value === element.location
				)
			);
		}
		return formatSortData;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		data.length,
		formValues.startDate,
		formValues.endDate,
		formValues.sortKey,
		formValues.sortOrder,
		formValues.location
	]);

	return (
		<Grid
			className="CompareTable"
			container
			direction="column"
			alignItems="center"
		>
			<CompareSearch formName={formName} isState={isState} />
			<Table
				rootClassName="Table"
				data={formattedData}
				columnNames={columnNames}
				dataRow={({ record }) => (
					<TableRow>
						<TableCell>{record.rank}</TableCell>
						<TableCell>
							{record.displayLocation || record.location}
						</TableCell>
						<TableCell>
							{record.population?.toLocaleString() ?? 'N/A'}
						</TableCell>
						<TableCell>
							{record.totalCases.toLocaleString()}
						</TableCell>
						<TableCell>
							{record.totalDeaths.toLocaleString()}
						</TableCell>
						<TableCell>
							{record.totalCasesPerMillion?.toLocaleString() ??
								'N/A'}
						</TableCell>
						<TableCell>
							{record.totalDeathsPerMillion?.toLocaleString() ??
								'N/A'}
						</TableCell>
					</TableRow>
				)}
			/>
		</Grid>
	);
};
BaseCompareTable.propTypes = {
	isState: PropTypes.bool
};
BaseCompareTable.defaultProps = {
	isState: false
};

export default BaseCompareTable;
