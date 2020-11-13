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

import moment from 'moment'; // TODO get rid of this
import { downloadData, getMetadata } from '../../services';
import coreSlice from './slice';
import { handleError } from '../utilityActions';
import { loadCountries } from '../countryData/actions';
import { loadStates } from '../stateData/actions';

const formatDownloadDate = (downloadDate) => {
    if (!downloadDate) {
        return 'No Data';
    }
    return moment(downloadDate, 'YYYY-MM-DD HH:mm:ssZ')
        .format('YYYY-MM-DD HH:mm:ss');
};

export const loadLists = () => async (dispatch) => {
    dispatch(coreSlice.actions.setLoading(true));
    dispatch(loadCountries());
    dispatch(loadStates());
    dispatch(coreSlice.actions.setLoading(false));
};

export const loadMetadata = () => async (dispatch) => {
    try {
        dispatch(coreSlice.actions.setLoading(true));
        const metadataRes = await getMetadata();
        dispatch(coreSlice.actions.setDownloadDate(formatDownloadDate(metadataRes.data.downloadDate)));
    } catch (ex) {
        dispatch(handleError(ex, 'Error getting metadata'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};

export const downloadNewData = () => async (dispatch) => {
    try {
        dispatch(coreSlice.actions.setLoading(true));
        await downloadData();

        dispatch(loadLists());
        dispatch(loadMetadata());
    } catch (ex) {
        dispatch(handleError(ex, 'Error downloading data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};
