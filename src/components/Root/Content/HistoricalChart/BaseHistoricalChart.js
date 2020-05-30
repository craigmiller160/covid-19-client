import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './BaseHistoricalChart.scss';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router';

const CHART_NEW_CASES = 'newcases';
const CHART_TOTAL_DEATHS = 'totaldeaths';
const CHART_NEW_DEATHS = 'newdeaths';
const CHART_TOTAL_CASES = 'totalcases';

const countrySelector = (state) => state.countryData.historicalData;
const stateSelector = (state) => state.stateData.historicalData;

const getChartKeys = (location) => {
    const pathParts = location.pathname.split('/');
    const chartType = pathParts[pathParts.length - 1];

    let dataKey;
    let dataName;
    switch (chartType) {
        case CHART_NEW_CASES:
            dataKey = 'newCases';
            dataName = 'New Cases';
            break;
        case CHART_TOTAL_DEATHS:
            dataKey = 'totalDeaths';
            dataName = 'Total Deaths';
            break;
        case CHART_NEW_DEATHS:
            dataKey = 'newDeaths';
            dataName = 'New Deaths';
            break;
        case CHART_TOTAL_CASES:
        default:
            dataKey = 'totalCases';
            dataName = 'Total Cases';
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
    const selector = isState ? stateSelector : countrySelector;
    const dispatch = useDispatch();
    const data = useSelector(selector, shallowEqual);
    const selectedChart = useSelector((state) => state.display.selectedChart);
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('sm'));
    const chartData = data ? data.slice().reverse() : [];

    // const chartWidth = isNotPhone ? 800 : 390;
    const chartHeight = isNotPhone ? 500 : 300;

    const { dataKey, dataName } = getChartKeys(location);

    if (location.pathname.endsWith('/history/chart')) {
        history.push(`${location.pathname}/${CHART_TOTAL_CASES}`);
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
            <Grid
                container
                direction="row"
                justify="center"
                className="buttons"
            >
                <Button
                    variant="contained"
                    color={ selectedChart === CHART_TOTAL_CASES ? 'primary' : 'default' }
                    // onClick={ () => dispatch(displaySlice.actions.setSelectedChart(CHART_TOTAL_CASES)) }
                >
                    Total Cases
                </Button>
                <Button
                    variant="contained"
                    color={ selectedChart === CHART_NEW_CASES ? 'primary' : 'default' }
                    // onClick={ () => dispatch(displaySlice.actions.setSelectedChart(CHART_NEW_CASES)) }
                >
                    New Cases
                </Button>
                <Button
                    variant="contained"
                    color={ selectedChart === CHART_TOTAL_DEATHS ? 'primary' : 'default' }
                    // onClick={ () => dispatch(displaySlice.actions.setSelectedChart(CHART_TOTAL_DEATHS)) }
                >
                    Total Deaths
                </Button>
                <Button
                    variant="contained"
                    color={ selectedChart === CHART_NEW_DEATHS ? 'primary' : 'default' }
                    // onClick={ () => dispatch(displaySlice.actions.setSelectedChart(CHART_NEW_DEATHS)) }
                >
                    New Deaths
                </Button>
            </Grid>
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