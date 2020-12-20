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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Home.scss';
import covidImg from '../../../../assets/images/2760147.svg';

const Home = () => (
        <Grid
            className="Home"
            container
            direction="row"
        >
            <Grid
                className="Section"
                item
                sm={ 5 }
            >
                <Paper>
                    <h1>Welcome to COVID 19 Statistics</h1>
                    <h3>
                        <span>This application presents accurate data, both raw statistics </span>
                        <span>and analysis on the COVID 19 pandemic.</span>
                    </h3>
                    <img className="CovidImg" src={ covidImg } alt="COVID Icon" />
                </Paper>
            </Grid>
            <Grid item sm={ 2 } />
            <Grid
                className="Section"
                item
                sm={ 5 }
            >
                <Paper>
                    <h1>Sources</h1>
                    <h3>This application would not be possible without data from the following sources.</h3>
                    <p>
                        <strong>Disease.sh: </strong>
                        <span>for providing the API for all COVID stats, population data,</span>
                        <span>etc worldwide.</span>
                    </p>
                    <p>
                        <strong>Worldometers: </strong>
                        <span>For being the source of many of the COVID stats provided</span>
                        <span>by Disease.sh.</span>
                    </p>
                    <p>
                        <strong>John&apos;s Hopkins: </strong>
                        <span>For being the source of many of the COVID stats provided</span>
                        <span>by Disease.sh.</span>
                    </p>
                    <p>
                        <strong>The COVID Tracking Project: </strong>
                        <span>for providing the raw COVID case statistics for US states.</span>
                    </p>
                    <p>
                        <strong>US Census Bureau: </strong>
                        <span>for providing US state population data.</span>
                    </p>
                </Paper>
            </Grid>
        </Grid>
    );

export default Home;
