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

import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { NavLink, useLocation } from 'react-router-dom';
import createMenuItems from './menuItems';
import './MobileMenu.scss';

const MobileMenu = (props) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { isMenuOpen, handleMenuClose } = props;

	const menuItems = createMenuItems(
		dispatch,
		location.pathname,
		handleMenuClose
	);
	const mergedMenuItems = [...menuItems.left, ...menuItems.right];

	return (
		<Drawer
			className="MobileMenu"
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<NavLink to="/" exact className="NavLink">
				<Typography
					className="title"
					variant="h6"
					noWrap
					onClick={handleMenuClose}
				>
					COVID-19 Data
				</Typography>
			</NavLink>
			{mergedMenuItems.map((item) => (
				<ListItem
					key={item.to}
					className={`item ${item.active ? 'active' : ''}`}
					onClick={item.onClick}
				>
					<NavLink
						to={item.to}
						exact={item.exact}
						className="NavLink"
					>
						<ListItemText>{item.label}</ListItemText>
					</NavLink>
				</ListItem>
			))}
		</Drawer>
	);
};
MobileMenu.propTypes = {
	isMenuOpen: PropTypes.bool,
	handleMenuClose: PropTypes.func.isRequired
};

export default MobileMenu;
