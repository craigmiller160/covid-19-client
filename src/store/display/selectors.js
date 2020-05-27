import { createSelector } from '@reduxjs/toolkit';
import { SECTION_STATE_HIST_CHARTS, SECTION_STATE_HIST_DATA } from './slice';

const selectedSectionSelector = (state) => state.display.selectedSection;

export const isStateSelector = createSelector(
    selectedSectionSelector,
    (selectedSection) =>
        selectedSection === SECTION_STATE_HIST_CHARTS || selectedSection === SECTION_STATE_HIST_DATA
);