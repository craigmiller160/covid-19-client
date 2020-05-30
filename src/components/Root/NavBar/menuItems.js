import displaySlice, {
    SECTION_COUNTRY_COMPARE_DATA,
    SECTION_COUNTRY_HIST_CHARTS,
    SECTION_COUNTRY_HIST_DATA,
    SECTION_STATE_COMPARE_DATA,
    SECTION_STATE_HIST_CHARTS,
    SECTION_STATE_HIST_DATA
} from '../../../store/display/slice';

const menuItemCreator = (dispatch, selected, closeMenu) =>(id, label) => ({
    id,
    label,
    active: selected === id,
    onClick: () => {
        if (closeMenu) {
            closeMenu();
        }
        dispatch(displaySlice.actions.setSelectedSection(id));
    }
});

const createMenuItems = (dispatch, selected, closeMenu) => {
    const createMenuItem = menuItemCreator(dispatch, selected, closeMenu);

    const left = [
        createMenuItem(SECTION_COUNTRY_HIST_DATA, 'Country History Data'),
        createMenuItem(SECTION_COUNTRY_HIST_CHARTS, 'Country History Charts'),
        createMenuItem(SECTION_STATE_HIST_DATA, 'State History Data'),
        createMenuItem(SECTION_STATE_HIST_CHARTS, 'State History Charts'),
        createMenuItem(SECTION_COUNTRY_COMPARE_DATA, 'Compare Country Data'),
        createMenuItem(SECTION_STATE_COMPARE_DATA, 'Compare State Data')
    ];

    const right = [];

    return {
        left,
        right
    };
};

export default createMenuItems;