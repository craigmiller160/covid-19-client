import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import './Content.scss';
import { loadLists, loadMetadata } from '../../../store/core/actions';
import { loadCountryCurrentData, loadCountryHistoricalData } from '../../../store/countryData/actions';
import StateSearch from './Search/StateSearch';
import CountrySearch from './Search/CountrySearch';
import { loadStateCurrentData, loadStateHistoricalData } from '../../../store/stateData/actions';
import {
    SECTION_COUNTRY_COMPARE_DATA,
    SECTION_COUNTRY_HIST_CHARTS,
    SECTION_COUNTRY_HIST_DATA, SECTION_STATE_COMPARE_DATA,
    SECTION_STATE_HIST_CHARTS,
    SECTION_STATE_HIST_DATA,
    SECTION_HOME
} from '../../../store/display/slice';
import CountryHistoricalTable from './HistoricalTable/CountryHistoricalTable';
import CountryHistoricalChart from './HistoricalChart/CountryHistoricalChart';
import StateHistoricalTable from './HistoricalTable/StateHistoricalTable';
import StateHistoricalChart from './HistoricalChart/StateHistoricalChart';
import CountryCompareTable from './CompareTable/CountryCompareTable';
import StateCompareTable from './CompareTable/StateCompareTable';
import coreSlice from '../../../store/core/slice';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';

const getData = (selectedSection) => {
    switch (selectedSection) {
        case SECTION_HOME:
            return Home;
        case SECTION_STATE_HIST_DATA:
            return StateHistoricalTable;
        case SECTION_STATE_HIST_CHARTS:
            return StateHistoricalChart;
        case SECTION_COUNTRY_HIST_CHARTS:
            return CountryHistoricalChart;
        case SECTION_COUNTRY_COMPARE_DATA:
            return CountryCompareTable;
        case SECTION_STATE_COMPARE_DATA:
            return StateCompareTable;
        case SECTION_COUNTRY_HIST_DATA:
        default:
            return CountryHistoricalTable;
    }
};

const getSearch = (selectedSection) => {
    switch (selectedSection) {
        case SECTION_STATE_HIST_DATA:
        case SECTION_STATE_HIST_CHARTS:
            return StateSearch;
        case SECTION_COUNTRY_COMPARE_DATA:
        case SECTION_STATE_COMPARE_DATA:
        case SECTION_HOME:
            return () => <div />;
        case SECTION_COUNTRY_HIST_CHARTS:
        case SECTION_COUNTRY_HIST_DATA:
        default:
            return CountrySearch;
    }
};

const getLoad = (selectedSection) => {
    switch (selectedSection) {
        case SECTION_HOME:
            return null;
        case SECTION_STATE_HIST_DATA:
        case SECTION_STATE_HIST_CHARTS:
            return loadStateHistoricalData;
        case SECTION_COUNTRY_COMPARE_DATA:
            return loadCountryCurrentData;
        case SECTION_STATE_COMPARE_DATA:
            return loadStateCurrentData;
        case SECTION_COUNTRY_HIST_CHARTS:
        case SECTION_COUNTRY_HIST_DATA:
        default:
            return loadCountryHistoricalData;
    }
};

const Content = () => {
    const loading = useSelector((state) => state.core.loading);
    const downloadDate = useSelector((state) => state.core.downloadDate);
    const selectedSection = useSelector((state) => state.display.selectedSection);
    const started = useSelector((state) => state.core.started);
    const dispatch = useDispatch();
    const [state, setState] = useState({ started: false });

    useEffect(() => {
        const startup = async () => {
            await dispatch(loadLists());
            await dispatch(loadMetadata());
            setState({ started: true });
        };
        startup();
    }, []); // eslint-disable-line

    useEffect(() => {
        // TODO move all these loading actions to individual components
        const load = async () => {
            const load = getLoad(selectedSection);
            if (load) {
                dispatch(load());
            }

            dispatch(coreSlice.actions.setStarted(true));
        };
        load();
    }, [dispatch, selectedSection, started]);

    return (
        <Container className="Content">
            <Alert />
            <h3>Last updated: { downloadDate }</h3>
            <Switch>
                <Route
                    path="/country/history/data"
                    component={ CountryHistoricalTable }
                />
                <Route
                    path="/country/history/chart"
                    component={ CountryHistoricalChart }
                />
                <Route
                    path="/state/history/data"
                    component={ StateHistoricalTable }
                />
                <Route
                    path="/state/history/chart"
                    component={ StateHistoricalChart }
                />
                <Route
                    path="/"
                    exact
                    component={ Home }
                />
            </Switch>
        </Container>
    );
};

export default Content;