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

import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import './BaseCompareTable.scss';
import Table from '../../../ui/Table';
import { COUNTRY_COMPARE_FORM, STATE_COMPARE_FORM } from './compareTableConstants';
import CompareSearch from './CompareSearch';
import { loadStateCompareData, loadStateCurrentData } from '../../../../store/stateData/actions';
import { loadCountryCompareData } from '../../../../store/countryData/actions';
import moment from 'moment';

const countrySelector = (state) => state.countryData.compareData;
const stateSelector = (state) => state.stateData.compareData;

const createColumnNames = (isState) => ([
    'Rank',
    isState ? 'State' : 'Country',
    'Population',
    'Total Cases',
    'Total Deaths',
    'Cases Per-Million',
    'Deaths Per-Million'
]);

const BaseCompareTable = (props) => {
    const {
        isState
    } = props;

    const dispatch = useDispatch();
    const dataSelector = isState ? stateSelector : countrySelector;
    const data = useSelector(dataSelector, shallowEqual);
    const columnNames = createColumnNames(isState);
    const formName = isState ? STATE_COMPARE_FORM : COUNTRY_COMPARE_FORM;
    const formValues = useSelector((state) => state.form[formName]?.values ?? {}, shallowEqual);

    let formattedData = useMemo(() => {
        const startDate = moment(formValues.startDate);
        const endDate = moment(formValues.endDate);

        const formatSortData = data.map((record) => {
            const firstDate = moment(record.firstDate);
            const lastDate = moment(record.lastDate);

            let startDateKey = startDate.format('YYYYMM');
            if (firstDate.diff(startDate) > 0) {
                startDateKey = firstDate.format('YYYYMM');
            }

            let endDateKey = endDate.format('YYYYMM');
            if (lastDate.diff(endDate) < 0) {
                endDateKey = lastDate.format('YYYYMM');
            }

            const startTotalCases = record[`startTotalCases_${startDateKey}`];
            const endTotalCases = record[`endTotalCases_${endDateKey}`];
            const startTotalDeaths = record[`startTotalDeaths_${startDateKey}`];
            const endTotalDeaths = record[`endTotalDeaths_${endDateKey}`];

            const totalCases = endTotalCases - startTotalCases;
            const totalDeaths = endTotalDeaths - startTotalDeaths;
            const totalCasesPerMillion = (totalCases / record.population) * 1_000_000;
            const totalDeathsPerMillion = (totalDeaths / record.population) * 1_000_000;

            return {
                location: record.location,
                displayLocation: record.displayLocation,
                population: record.population,
                totalDeaths,
                totalCases,
                totalCasesPerMillion,
                totalDeathsPerMillion,
                _id: record._id
            };
        })
            .sort((one, two) => {
                const diff = one[formValues.sortKey?.value] - two[formValues.sortKey?.value];
                if (formValues.sortOrder?.value === 'desc') {
                    return diff * -1;
                }
                return diff;
            })
            .map((record, index) => ({
                ...record,
                rank: index + 1
            }))
        if (formValues.location?.length > 0) {
            return formatSortData.filter((element) =>
                formValues.location.find((location) => location.value === element.location));
        }
        return formatSortData;
    }, [data.length, formValues.startDate,
        formValues.endDate, formValues.sortKey,
        formValues.sortOrder, formValues.location]);

    return (
        <Grid
            className="CompareTable"
            container
            direction="column"
            alignItems="center"
        >
            <CompareSearch
                formName={ formName }
                isState={ isState }
            />
            <Table
                rootClassName="Table"
                data={ formattedData }
                columnNames={ columnNames }
                dataRow={ ({ record }) => (
                    <TableRow>
                        <TableCell>{ record.rank }</TableCell>
                        <TableCell>{ record.displayLocation || record.location }</TableCell>
                        <TableCell>{ record.population?.toLocaleString() ?? 'N/A' }</TableCell>
                        <TableCell>{ record.totalCases.toLocaleString() }</TableCell>
                        <TableCell>{ record.totalDeaths.toLocaleString() }</TableCell>
                        <TableCell>{ record.totalCasesPerMillion?.toLocaleString() ?? 'N/A' }</TableCell>
                        <TableCell>{ record.totalDeathsPerMillion?.toLocaleString() ?? 'N/A' }</TableCell>
                    </TableRow>
                ) }
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
