import React, { useEffect, useState } from 'react';
import Loading from '../Root/Content/Loading';

const useLoading = (props) => {
    const {
        loader,
        component
    } = props;
    const [state, setState] = useState({ loading: true });

    const Component = component;

    useEffect(() => {
        const doLoad = async () => {
            await loader();
            setState({ loading: false });
        };
        doLoad();
    }, []);

    if (state.loading) {
        return Loading;
    }

    return Component;
};