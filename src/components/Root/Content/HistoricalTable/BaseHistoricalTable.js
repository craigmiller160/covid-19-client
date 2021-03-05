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
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '../../../ui/Table';
import useHistoryData from '../../../hooks/useHistoryData';

const calcMortality = (entry) => {
    if (entry.totalCases === 0) {
        return '0.00%';
    }
    const value = (entry.totalDeaths / entry.totalCases) * 100;
    return `${value.toFixed(2)}%`;
};

const columnNames = [
    'Date',
    'New Cases',
    'Total Cases',
    'New Deaths',
    'Total Deaths',
    'Total Mortality Rate'
];

const vaccineColumnNames = [
    'New Vaccinated',
    'Total Vaccinated'
];

const BaseHistoricalTable = (props) => {
    const {
        isState
    } = props;
    const { data } = useHistoryData({ isState });

    const fullData = [ ...data ];
    let fullColumnNames = columnNames;
    let hasVaccineData = false;
    if (fullData.length > 0) {
        hasVaccineData = fullData[0].totalVaccines !== undefined;
        const currentItem = {
            _id: 'CURRENT',
            date: 'CURRENT',
            newCases: 'N/A',
            totalCases: data[0].totalCases,
            newDeaths: 'N/A',
            totalDeaths: data[0].totalDeaths,
            caseDoubleDays: data[0].caseDoubleDays
        };
        if (hasVaccineData) {
            currentItem.newVaccines = 'N/A';
            currentItem.totalVaccines = data[0].totalVaccines;

            fullColumnNames = [
                ...columnNames,
                ...vaccineColumnNames
            ];
        }

        fullData.unshift(currentItem);
    }

    return (
        <Table
            columnNames={ fullColumnNames }
            data={ fullData }
            dataRow={ ({ record }) => (
                <TableRow>
                    <TableCell>{ record.date }</TableCell>
                    <TableCell>{ record.newCases?.toLocaleString() }</TableCell>
                    <TableCell>{ record.totalCases?.toLocaleString() }</TableCell>
                    <TableCell>{ record.newDeaths?.toLocaleString() }</TableCell>
                    <TableCell>{ record.totalDeaths?.toLocaleString() }</TableCell>
                    <TableCell>{ calcMortality(record) }</TableCell>
                    {
                        hasVaccineData &&
                        <>
                            <TableCell>{ record.newVaccines.toLocaleString() }</TableCell>
                            <TableCell>{ record.totalVaccines.toLocaleString() }</TableCell>
                        </>
                    }
                </TableRow>
            ) }
        />
    );
};
BaseHistoricalTable.propTypes = {
    isState: PropTypes.bool
};
BaseHistoricalTable.defaultProps = {
    isState: false
};

export default BaseHistoricalTable;
