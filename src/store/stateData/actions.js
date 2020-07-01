import { getCountryHistoricalData, getStateCurrentData, getStateHistoricalData, getStatesList } from '../../services';
import stateDataSlice from './slice';
import { handleError } from '../utilityActions';
import moment from 'moment';
import coreSlice from '../core/slice';
import { STATE_SEARCH_FORM } from '../../components/Root/Content/Search/BaseSearch';
import { usOption } from '../../util/countryOptions';
import { change } from 'redux-form';
import {
    orderOptions,
    rankByOptions,
    STATE_COMPARE_FORM
} from '../../components/Root/Content/CompareTable/BaseCompareTable';

export const loadStates = () => async (dispatch) => {
    try {
        const res = await getStatesList();
        dispatch(stateDataSlice.actions.setStates(formatStateData(res.data)));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading state list'));
    }
};

const formatStateData = (data) =>
    data.map((state) => ({
        label: state.displayLocation,
        value: state.location
    }));

export const loadStateHistoricalData = ({ field, value } = {}) => async (dispatch, getState) => {
    try {
        if (field) {
            dispatch(change(STATE_SEARCH_FORM, field, value));
        }

        const formValues = getState().form[STATE_SEARCH_FORM]?.values ?? {};
        dispatch(coreSlice.actions.setLoading(true));

        const values = {
            ...formValues,
            location: formValues.location || usOption
        };

        dispatch(change(STATE_SEARCH_FORM, 'location', values.location));

        const startDate = values.startDate ? moment(values.startDate).format('YYYY-MM-DD') : undefined;
        const endDate = values.endDate ? moment(values.endDate).format('YYYY-MM-DD') : undefined;

        let res;
        if (values.location.value === usOption.value) {
            res = await getCountryHistoricalData(values.location.value, startDate, endDate);
        } else {
            res = await getStateHistoricalData(values.location.value, startDate, endDate);
        }
        dispatch(stateDataSlice.actions.setHistoricalData(res.data));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading state historical data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};

export const loadStateCurrentData = () => async (dispatch, getState) => {
    try {
        dispatch(coreSlice.actions.setLoading(true));
        const { sortKey, sortOrder } = getState().form[STATE_COMPARE_FORM]?.values ?? {};

        const realSortKey = sortKey || rankByOptions[0];
        const realSortOrder = sortOrder || orderOptions[0];

        dispatch(change(STATE_COMPARE_FORM, 'sortKey', realSortKey));
        dispatch(change(STATE_COMPARE_FORM, 'sortOrder', realSortOrder));

        const res = await getStateCurrentData(sortKey.value, sortOrder.value);
        const formattedData = res.data.map((record, index) => ({
            ...record,
            rank: index + 1
        }));
        dispatch(stateDataSlice.actions.setCurrentData(formattedData));
    } catch (ex) {
        dispatch(handleError(ex, 'Error loading state current data'));
    } finally {
        dispatch(coreSlice.actions.setLoading(false));
    }
};
