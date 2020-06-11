import { shallowEqual, useSelector } from 'react-redux';

const countryDataSelector = (state) => state.countryData.historicalData;
const stateDataSelector = (state) => state.stateData.historicalData;

const countryLocationSelector = (state) => state.form.countrySearch.values.location;
const stateLocationSelector = (state) => state.form.stateSearch.values.location;

const useHistoryData = (props) => {
    const {
        isState
    } = props;

    const dataSelector = isState ? stateDataSelector : countryDataSelector;
    const data = useSelector(dataSelector, shallowEqual);

    const locationSelector = isState ? stateLocationSelector : countryLocationSelector;
    const location = useSelector(locationSelector, shallowEqual);

    return {
        data,
        location
    };
};

export default useHistoryData;