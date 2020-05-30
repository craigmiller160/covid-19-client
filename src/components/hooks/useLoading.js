import { useEffect } from 'react';
import Loading from '../Root/Content/Loading';
import { useSelector } from 'react-redux';

const useLoading = (props) => {
    const {
        loader,
        component
    } = props;
    const loading = useSelector((state) => state.core.loading);

    const Component = component;

    useEffect(() => {
        loader();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return Loading;
    }

    return Component;
};

export default useLoading;