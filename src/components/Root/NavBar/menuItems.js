const menuItemCreator = (dispatch, pathname, closeMenu) => ({ label, to, exact = false }) => {
    const active = exact ? to === pathname : pathname !== '/' && to.startsWith(pathname);
    return {
        label,
        to,
        exact,
        active,
        onClick: () => {
            if (closeMenu) {
                closeMenu();
            }
        }
    };
};

const createMenuItems = (dispatch, pathname, closeMenu) => {
    const createMenuItem = menuItemCreator(dispatch, pathname, closeMenu);

    const left = [
        createMenuItem({
            label: 'Country History Data',
            to: '/country/history/data',
            exact: true
        }),
        createMenuItem({
            label: 'Country History Charts',
            to: '/country/history/chart'
        }),
        createMenuItem({
            label: 'State History Data',
            to: '/state/history/data',
            exact: true
        }),
        createMenuItem({
            label: 'State History Charts',
            to: '/state/history/chart'
        }),
        createMenuItem({
            label: 'Compare Country Data',
            to: '/country/compare'
        }),
        createMenuItem({
            label: 'Compare State Data',
            to: '/state/compare'
        })
    ];

    const right = [];

    return {
        left,
        right
    };
};

export default createMenuItems;