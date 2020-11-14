/*
 *     covid-19-client
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const menuItemCreator = (dispatch, pathname, closeMenu) => ({ label, to, exact = false }) => {
    const active = exact ? to === pathname : pathname !== '/' && pathname.startsWith(to);
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
            to: '/country/compare',
            exact: true
        }),
        createMenuItem({
            label: 'Compare State Data',
            to: '/state/compare',
            exact: true
        })
    ];

    const right = [];

    return {
        left,
        right
    };
};

export default createMenuItems;
