import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
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

const DATA_KEY_NEW_CASES = 'newCases';
const DATA_KEY_TOTAL_CASES = 'totalCases';
const DATA_KEY_NEW_DEATHS = 'newDeaths';
const DATA_KEY_TOTAL_DEATHS = 'totalDeaths';
const DATA_KEY_NEW_TESTS = 'newTests';

const DATA_NAME_NEW_CASES = 'New Cases';
const DATA_NAME_TOTAL_CASES = 'Total Cases';
const DATA_NAME_NEW_DEATHS = 'New Deaths';
const DATA_NAME_TOTAL_DEATHS = 'Total Deaths';
const DATA_NAME_NEW_TESTS = 'New Tests';

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
    const { data } = useHistoryData({ isState });
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('sm'));
    const chartData = data ? data.slice().reverse() : [];

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
                        Total Cases
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_NEW_CASES ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_NEW_CASES}`) }
                    >
                        New Cases
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_TOTAL_DEATHS ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_TOTAL_DEATHS}`) }
                    >
                        Total Deaths
                    </Button>
                    <Button
                        variant="contained"
                        color={ dataKey === DATA_KEY_NEW_DEATHS ? 'primary' : 'default' }
                        onClick={ () => history.push(`${basePath}/${PATH_NEW_DEATHS}`) }
                    >
                        New Deaths
                    </Button>
                </Grid>
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
                        New Tests
                    </Button>
                </Grid>
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