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
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './BaseHistoricalChart.scss';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory, useLocation } from 'react-router';
import useHistoryData from '../../../hooks/useHistoryData';

const PATH_NEW_CASES = 'newcases';
const PATH_TOTAL_CASES = 'totalcases';
const PATH_NEW_DEATHS = 'newdeaths';
const PATH_TOTAL_DEATHS = 'totaldeaths';
const PATH_NEW_TESTS = 'newtests';
const PATH_POS_TESTS = 'positivetests';
const PATH_NEW_HOSPITAL = 'newhospital';

const DATA_KEY_NEW_CASES = 'newCases';
const DATA_KEY_TOTAL_CASES = 'totalCases';
const DATA_KEY_NEW_DEATHS = 'newDeaths';
const DATA_KEY_TOTAL_DEATHS = 'totalDeaths';
const DATA_KEY_NEW_TESTS = 'newTests';
const DATA_KEY_POS_TESTS = 'newPositivePercent';
const DATA_KEY_NEW_HOSPITAL = 'newHospitalized';

const DATA_NAME_NEW_CASES = 'New Cases';
const DATA_NAME_TOTAL_CASES = 'Total Cases';
const DATA_NAME_NEW_DEATHS = 'New Deaths';
const DATA_NAME_TOTAL_DEATHS = 'Total Deaths';
const DATA_NAME_NEW_TESTS = 'New Tests';
const DATA_NAME_POS_TESTS = 'New Positive Test %';
const DATA_NAME_NEW_HOSPITAL = 'New Hospital';

const getChartKeys = (location) => {
    const pathParts = location.pathname.split('/');
    const chartType = pathParts[pathParts.length - 1];

    let dataKey;
    let dataName;
    switch (chartType) {
        case PATH_NEW_CASES:
            dataKey = DATA_KEY_NEW_CASES;
            dataName = DATA_NAME_NEW_CASES;
            break;
        case PATH_TOTAL_DEATHS:
            dataKey = DATA_KEY_TOTAL_DEATHS;
            dataName = DATA_NAME_TOTAL_DEATHS;
            break;
        case PATH_NEW_DEATHS:
            dataKey = DATA_KEY_NEW_DEATHS;
            dataName = DATA_NAME_NEW_DEATHS;
            break;
        case PATH_NEW_TESTS:
            dataKey = DATA_KEY_NEW_TESTS;
            dataName = DATA_NAME_NEW_TESTS;
            break;
        case PATH_POS_TESTS:
            dataKey = DATA_KEY_POS_TESTS;
            dataName = DATA_NAME_POS_TESTS;
            break;
        case PATH_NEW_HOSPITAL:
            dataKey = DATA_KEY_NEW_HOSPITAL;
            dataName = DATA_NAME_NEW_HOSPITAL;
            break;
        case PATH_TOTAL_CASES:
        default:
            dataKey = DATA_KEY_TOTAL_CASES;
            dataName = DATA_NAME_TOTAL_CASES;
            break;
    }
    return {
        dataKey,
        dataName
    };
};

const BaseHistoricalChart = (props) => {
    const {
        isState
    } = props;
    const location = useLocation();
    const history = useHistory();
    const basePath = isState ? '/state/history/chart' : '/country/history/chart';
    const { data, location: selectedLocation } = useHistoryData({ isState });
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('sm'));
    const chartData = data ? data.slice().reverse() : [];
    const showMoreOptions = isState && selectedLocation?.value !== null &&
        selectedLocation?.value !== 'United_States_of_America';

    // const chartWidth = isNotPhone ? 800 : 390;
    const chartHeight = isNotPhone ? 500 : 300;

    const { dataKey, dataName } = getChartKeys(location);

    if (location.pathname.endsWith('/history/chart')) {
        return <Redirect to={ `${basePath}/${PATH_TOTAL_CASES}` } />;
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className="Chart"
        >
            <ResponsiveContainer
                height={ chartHeight }
            >
                <LineChart
                    data={ chartData }
                >
                    <XAxis dataKey="date" name="Dates" />
                    <YAxis dataKey={ dataKey } name={ dataName } width={ 70 } />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey={ dataKey } stroke="#ff7300" yAxisId={ 0 } />
                </LineChart>
            </ResponsiveContainer>
            <div className="ButtonContainer">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    className="buttons"
                >
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_TOTAL_CASES ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_TOTAL_CASES}`) }
                    >
                        { DATA_NAME_TOTAL_CASES }
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_NEW_CASES ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_NEW_CASES}`) }
                    >
                        { DATA_NAME_NEW_CASES }
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_TOTAL_DEATHS ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_TOTAL_DEATHS}`) }
                    >
                        { DATA_NAME_TOTAL_DEATHS }
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_NEW_DEATHS ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_NEW_DEATHS}`) }
                    >
                        { DATA_NAME_NEW_DEATHS }
                    </Button>
                </Grid>
                {
                    showMoreOptions &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        className="buttons"
                    >
                        <Button
                            variant="contained"
                            color={ dataKey === DATA_KEY_NEW_TESTS ? 'primary' : 'default' }
                            onClick={ () => history.push(`${basePath}/${PATH_NEW_TESTS}`) }
                        >
                            { DATA_NAME_NEW_TESTS }
                        </Button>
                        <Button
                            variant="contained"
                            color={ dataKey === DATA_KEY_POS_TESTS ? 'primary' : 'default' }
                            onClick={ () => history.push(`${basePath}/${PATH_POS_TESTS}`) }
                        >
                            { DATA_NAME_POS_TESTS }
                        </Button>
                        <Button
                            variant="contained"
                            color={ dataKey === DATA_KEY_NEW_HOSPITAL ? 'primary' : 'default' }
                            onClick={ () => history.push(`${basePath}/${PATH_NEW_HOSPITAL}`) }
                        >
                            { DATA_NAME_NEW_HOSPITAL }
                        </Button>
                    </Grid>
                }
            </div>
        </Grid>
    );
};
BaseHistoricalChart.propTypes = {
    isState: PropTypes.bool
};
BaseHistoricalChart.defaultProps = {
    isState: false
};

export default BaseHistoricalChart;
