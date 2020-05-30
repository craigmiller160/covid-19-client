import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import './Content.scss';
import { loadLists, loadMetadata } from '../../../store/core/actions';
import CountryHistoricalTable from './HistoricalTable/CountryHistoricalTable';
import CountryHistoricalChart from './HistoricalChart/CountryHistoricalChart';
import StateHistoricalTable from './HistoricalTable/StateHistoricalTable';
import StateHistoricalChart from './HistoricalChart/StateHistoricalChart';
import CountryCompareTable from './CompareTable/CountryCompareTable';
import StateCompareTable from './CompareTable/StateCompareTable';
import Home from './Home';
import { Redirect, Route, Switch } from 'react-router-dom';

const Content = () => {
    const downloadDate = useSelector((state) => state.core.downloadDate);
    const dispatch = useDispatch();

    useEffect(() => {
        const startup = async () => {
            await dispatch(loadLists());
            await dispatch(loadMetadata());
        };
        startup();
    }, []); // eslint-disable-line

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
                    path="/country/compare"
                    component={ CountryCompareTable }
                />
                <Route
                    path="/state/compare"
                    component={ StateCompareTable }
                />
                <Route
                    path="/"
                    exact
                    component={ Home }
                />
                <Redirect to="/" />
            </Switch>
        </Container>
    );
};

export default Content;