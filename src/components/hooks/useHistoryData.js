import { shallowEqual, useSelector } from 'react-redux';

const countrySelector = (state) => state.countryData.historicalData;
const stateSelector = (state) => state.stateData.historicalData;

const useHistoryData = (props) => {
    const {
        isState
    } = props;

    const selector = isState ? stateSelector : countrySelector;
    const data = useSelector(selector, shallowEqual);

    return {
        data
    };
};

export default useHistoryData;