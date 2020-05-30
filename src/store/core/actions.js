import { downloadData, getMetadata } from '../../services';
import coreSlice from './slice';
import moment from 'moment';
import { handleError } from '../utilityActions';
import { loadCountries } from '../countryData/actions';
import { loadStates } from '../stateData/actions';

export const downloadNewData = () => async (dispatch) => {
    try {
        dispatch(coreSlice.actions.setLoading(true));
        await downloadData();

        dispatch(loadLists());
        dispatch(loadMetadata());
        dispatch(coreSlice.actions.setStarted(false));
    } catch (ex) {
        dispatch(handleError(ex, 'Error downloading data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
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

export const loadLists = () => async (dispatch) => {
    dispatch(coreSlice.actions.setLoading(true));
    dispatch(loadCountries());
    dispatch(loadStates());
    dispatch(coreSlice.actions.setLoading(false));
};

const formatDownloadDate = (downloadDate) => {
    if (!downloadDate) {
        return 'No Data';
    }
    return moment(downloadDate, 'YYYY-MM-DD HH:mm:ssZ')
        .format('YYYY-MM-DD HH:mm:ss');
};