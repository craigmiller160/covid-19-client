/*
 *     covid-19-client
 *     Copyright (C) 2021 Craig Miller
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
import { orderOptions, rankByOptions } from './compareTableConstants';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AutocompleteField, DateField, Form } from '../../../form';
import TextField from '@material-ui/core/TextField';
import { loadCountryCompareData, loadCountryCurrentData } from '../../../../store/countryData/actions';
import { loadStateCurrentData } from '../../../../store/stateData/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const countryListSelector = (state) => state.countryData.countries;
const stateListSelector = (state) => state.stateData.states;

const CompareSearch = (props) => {
    const {
        isState,
        formName
    } = props;
    const dispatch = useDispatch();
    const countrySubmit = (value) => dispatch(loadCountryCompareData(value));
    const stateSubmit = (value) => dispatch(loadStateCurrentData(value)); // TODO change this method
    const onSubmit = isState ? stateSubmit : countrySubmit;
    const onChangeSubmit = (value, arg2, arg3, fieldName) => onSubmit({ field: fieldName, value });
    const locationFilterLabel = isState ? 'States' : 'Countries';
    const listSelector = isState ? stateListSelector : countryListSelector;
    const list = useSelector(listSelector, shallowEqual);
    const listWithoutTotalElement = list.slice(1);

    return (
        <Form
            className="FilterForm"
            form={ formName }
            destroyOnUnmount={ false }
            onSubmit={ onSubmit }
            initialValues={ {
                sortKey: rankByOptions[0],
                sortOrder: orderOptions[0],
                location: [],
                startDate: '2019-11-30',
                endDate: '2021-12-31'
            } }
        >
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <DateField
                        name="startDate"
                        label="Start Date"
                        defaultValue="2019-11-30"
                        onChange={ onChangeSubmit }
                    />
                    <DateField
                        name="endDate"
                        label="End Date"
                        defaultValue="2021-12-31"
                        onChange={ onChangeSubmit }
                    />
                </Grid>
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
                        renderInput={ (params) => (
                            <TextField
                                { ...params }
                                label="Rank By"
                                variant="outlined"
                            />
                        ) }
                        name="sortKey"
                    />
                    <AutocompleteField
                        className="FilterField spacing"
                        options={ orderOptions }
                        getOptionLabel={ (option) => option.label ?? '' }
                        onChange={ onChangeSubmit }
                        renderInput={ (params) => (
                            <TextField
                                { ...params }
                                label="Order"
                                variant="outlined"
                            />
                        ) }
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
                        renderInput={ (params) => (
                            <TextField
                                { ...params }
                                label={ locationFilterLabel }
                                variant="outlined"
                            />
                        ) }
                        name="location"
                    />
                </Grid>
            </Paper>
        </Form>
    );
};
CompareSearch.propTypes = {
    isState: PropTypes.bool,
    formName: PropTypes.string
};

export default CompareSearch;
