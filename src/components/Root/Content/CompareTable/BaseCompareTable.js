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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import { TableCell } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import './BaseCompareTable.scss';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { AutocompleteField, Form } from '../../../form';
import { loadCountryCurrentData } from '../../../../store/countryData/actions';
import { loadStateCurrentData } from '../../../../store/stateData/actions';
import Table from '../../../ui/Table';

export const COUNTRY_COMPARE_FORM = 'countryCompare';
export const STATE_COMPARE_FORM = 'stateCompare';

const countrySelector = (state) => state.countryData.currentData;
const stateSelector = (state) => state.stateData.currentData;
const countryListSelector = (state) => state.countryData.countries;
const stateListSelector = (state) => state.stateData.states;

const createColumnNames = (isState) => ([
    'Rank',
    isState ? 'State' : 'Country',
    'Population',
    'Total Cases',
    'Total Deaths',
    'Cases Per-Million',
    'Deaths Per-Million'
]);

export const rankByOptions = [
    { label: 'Total Cases', value: 'totalCases' },
    { label: 'Total Deaths', value: 'totalDeaths' },
    { label: 'Cases Per-Million', value: 'totalCasesPerMillion' },
    { label: 'Deaths Per-Million', value: 'totalDeathsPerMillion' }
];

export const orderOptions = [
    { label: 'Highest to Lowest', value: 'desc' },
    { label: 'Lowest to Highest', value: 'asc' }
];

const BaseCompareTable = (props) => {
    const {
        isState
    } = props;
    const dispatch = useDispatch();
    const dataSelector = isState ? stateSelector : countrySelector;
    const listSelector = isState ? stateListSelector : countryListSelector;
    const locationFilterLabel = isState ? 'States' : 'Countries';
    const data = useSelector(dataSelector, shallowEqual);
    const list = useSelector(listSelector, shallowEqual);
    const listWithoutTotalElement = list.slice(1);
    const columnNames = createColumnNames(isState);
    const formName = isState ? STATE_COMPARE_FORM : COUNTRY_COMPARE_FORM;
    const formValues = useSelector((state) => state.form[formName]?.values ?? {}, shallowEqual);
    const countrySubmit = (value) => dispatch(loadCountryCurrentData(value));
    const stateSubmit = (value) => dispatch(loadStateCurrentData(value));
    const onSubmit = isState ? stateSubmit : countrySubmit;
    const onChangeSubmit = (value, arg2, arg3, fieldName) => onSubmit({ field: fieldName, value });

    let filteredData = data;
    if (formValues.location?.length > 0) {
        filteredData = filteredData.filter((element) =>
            formValues.location.find((location) => location.value === element.location));
    }

    return (
        <Grid
            className="CompareTable"
            container
            direction="column"
            alignItems="center"
        >
            <Form
                className="FilterForm"
                form={ formName }
                destroyOnUnmount={ false }
                onSubmit={ onSubmit }
                initialValues={ {
                    sortKey: rankByOptions[0],
                    sortOrder: orderOptions[0],
                    location: []
                } }
            >
                <Paper>
                    <Grid
                        className="Filters"
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <AutocompleteField
                            className="FilterField spacing"
                            options={ rankByOptions }
                            getOptionLabel={ (option) => option.label ?? '' }
                            onChange={ onChangeSubmit }
                            renderInput={ (params) =>
                                <TextField
                                    { ...params }
                                    label="Rank By"
                                    variant="outlined"
                                />}
                            name="sortKey"
                        />
                        <AutocompleteField
                            className="FilterField spacing"
                            options={ orderOptions }
                            getOptionLabel={ (option) => option.label ?? '' }
                            onChange={ onChangeSubmit }
                            renderInput={ (params) =>
                                <TextField
                                    { ...params }
                                    label="Order"
                                    variant="outlined"
                                />}
                            name="sortOrder"
                        />
                    </Grid>
                    <Grid
                        className="Filters"
                        container
                        direction="row"
                        justify="space-around"
                    >
                        <AutocompleteField
                            multiple
                            className="FilterField long"
                            options={ listWithoutTotalElement }
                            getOptionLabel={ (option) => option?.label ?? [] }
                            renderInput={ (params) =>
                                <TextField
                                    { ...params }
                                    label={ locationFilterLabel }
                                    variant="outlined"
                                />}
                            name="location"
                        />
                    </Grid>
                </Paper>
            </Form>
            <Table
                rootClassName="Table"
                data={ filteredData }
                columnNames={ columnNames }
                dataRow={ ({ record }) => (
                    <TableRow>
                        <TableCell>{ record.rank }</TableCell>
                        <TableCell>{ record.displayLocation }</TableCell>
                        <TableCell>{ record.population?.toLocaleString() ?? 'N/A' }</TableCell>
                        <TableCell>{ record.totalCases.toLocaleString() }</TableCell>
                        <TableCell>{ record.totalDeaths.toLocaleString() }</TableCell>
                        <TableCell>{ record.totalCasesPerMillion?.toLocaleString() ?? 'N/A' }</TableCell>
                        <TableCell>{ record.totalDeathsPerMillion?.toLocaleString() ?? 'N/A' }</TableCell>
                    </TableRow>
                ) } />
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
