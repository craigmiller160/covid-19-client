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
import Grid from '@material-ui/core/Grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import './BaseSearch.scss';
import Paper from '@material-ui/core/Paper';
import { AutocompleteField, DateField, Form } from '../../../form';
import { usOption, worldOption } from '../../../../util/countryOptions';
import { loadCountryHistoricalData } from '../../../../store/countryData/actions';
import { loadStateHistoricalData } from '../../../../store/stateData/actions';
import { COUNTRY_SEARCH_FORM, STATE_SEARCH_FORM } from './searchConstants';

const countriesSelector = (state) => state.countryData.countries;
const statesSelector = (state) => state.stateData.states;

const BaseSearch = (props) => {
    const {
        isState
    } = props;
    const dispatch = useDispatch();
    const selector = isState ? statesSelector : countriesSelector;
    const locations = useSelector(selector, shallowEqual);
    const formName = isState ? STATE_SEARCH_FORM : COUNTRY_SEARCH_FORM;
    const searchLabel = isState ? 'State' : 'Country';
    const initialLocation = isState ? usOption : worldOption;
    const countrySubmit = (value) => dispatch(loadCountryHistoricalData(value));
    const stateSubmit = (value) => dispatch(loadStateHistoricalData(value));
    const onSubmit = isState ? stateSubmit : countrySubmit;
    const onChangeSubmit = (value, arg2, arg3, fieldName) => onSubmit({ field: fieldName, value });

    return (
        <Paper className="Search">
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Form
                    form={ formName }
                    onSubmit={ onSubmit }
                    destroyOnUnmount={ false }
                    initialValues={ {
                        location: initialLocation
                    } }
                >
                    <Grid item className="search-box-wrapper">
                        <AutocompleteField
                            className="search-box"
                            options={ locations }
                            getOptionLabel={ (option) => option.label ?? '' }
                            onChange={ onChangeSubmit }
                            renderInput={ (params) =>
                                <TextField
                                    { ...params }
                                    label={ searchLabel }
                                    variant="outlined"
                                />}
                            name="location"
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        className="date-wrapper"
                    >
                        <Grid item className="date-item">
                            <DateField
                                name="startDate"
                                label="Start Date"
                                defaultValue="2019-11-30"
                                onChange={ onChangeSubmit }
                            />
                        </Grid>
                        <Grid item className="date-item">
                            <DateField
                                name="endDate"
                                label="End Date"
                                defaultValue="2021-12-31"
                                onChange={ onChangeSubmit }
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Grid>
        </Paper>
    );
};
BaseSearch.propTypes = {
    isState: PropTypes.bool
};
BaseSearch.defaultProps = {
    isState: false
};

export default BaseSearch;
