import displaySlice, {
    SECTION_COUNTRY_COMPARE_DATA,
    SECTION_COUNTRY_HIST_CHARTS,
    SECTION_COUNTRY_HIST_DATA,
    SECTION_STATE_COMPARE_DATA,
    SECTION_STATE_HIST_CHARTS,
    SECTION_STATE_HIST_DATA
} from '../../../store/display/slice';

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
        })
        // createMenuItem(SECTION_COUNTRY_HIST_DATA, 'Country History Data', ),
        // createMenuItem(SECTION_COUNTRY_HIST_CHARTS, 'Country History Charts'),
        // createMenuItem(SECTION_STATE_HIST_DATA, 'State History Data'),
        // createMenuItem(SECTION_STATE_HIST_CHARTS, 'State History Charts'),
        // createMenuItem(SECTION_COUNTRY_COMPARE_DATA, 'Compare Country Data'),
        // createMenuItem(SECTION_STATE_COMPARE_DATA, 'Compare State Data')
    ];

    const right = [];

    return {
        left,
        right
    };
};

export default createMenuItems;