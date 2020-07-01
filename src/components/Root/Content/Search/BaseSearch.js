import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import './BaseSearch.scss';
import { AutocompleteField, DateField, Form } from '../../../form';
import Button from '@material-ui/core/Button';
import { usOption, worldOption } from '../../../../util/countryOptions';
import { loadCountryHistoricalData } from '../../../../store/countryData/actions';
import { loadStateHistoricalData } from '../../../../store/stateData/actions';
import Paper from '@material-ui/core/Paper';

export const COUNTRY_SEARCH_FORM = 'countrySearch';
export const STATE_SEARCH_FORM = 'stateSearch';
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
    const countrySubmit = () => dispatch(loadCountryHistoricalData());
    const stateSubmit = () => dispatch(loadStateHistoricalData());
    const onSubmit = isState ? stateSubmit : countrySubmit;

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
                            onChange={ (arg1, arg2, previousValue, fieldName) => {
                                console.log('OnChange', arg1, arg2, previousValue, fieldName); // TODO delete this
                                onSubmit();
                            } }
                            renderInput={ (params) =>
                                <TextField
                                    { ...params }
                                    label={ searchLabel }
                                    variant="outlined"
                                />
                            }
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
                                defaultValue={ new Date('2019-12-01T00:00:00.000Z') }
                            />
                        </Grid>
                        <Grid item className="date-item">
                            <DateField
                                name="endDate"
                                label="End Date"
                                defaultValue={ new Date('2021-12-31T00:00:00.000Z') }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                    >
                        <Button variant="contained" color="primary" type="submit">Search</Button>
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
