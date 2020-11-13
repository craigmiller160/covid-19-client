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

import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { NavLink, useLocation } from 'react-router-dom';
import createMenuItems from './menuItems';
import MobileMenu from './MobileMenu';

const NavBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const loading = useSelector((state) => state.core.loading);
    const [ isMenuOpen, setMenuOpen ] = useState(false);
    const theme = useTheme();
    const isNotPhone = useMediaQuery(theme.breakpoints.up('md'));

    const handleMenuOpen = () => {
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    const menuItems = createMenuItems(dispatch, location.pathname);

    return (
        <div>
            <AppBar position="static" className="NavBar" >
                <Toolbar>
                    {
                        !isNotPhone && !loading &&
                        <IconButton edge="start" color="inherit" onClick={ handleMenuOpen }>
                            <MenuIcon />
                        </IconButton>
                    }
                    <Button variant="text" color="inherit">
                        <NavLink
                            to="/"
                            exact
                            className="NavLink"
                        >
                            <Typography className="title" variant="h6" noWrap>COVID-19 Data</Typography>
                        </NavLink>
                    </Button>
                    {
                        !loading && isNotPhone &&
                        <>
                            <div className="left">
                                {
                                    menuItems.left.map((item, index) => (
                                        <Button
                                            key={ index }
                                            variant={ item.active ? 'contained' : 'text' }
                                            color={ item.active ? 'default' : 'inherit' }
                                            onClick={ item.onClick }
                                        >
                                            <NavLink
                                                to={ item.to }
                                                exact={ item.exact }
                                                className="NavLink"
                                            >
                                                { item.label }
                                            </NavLink>
                                        </Button>
                                    ))
                                }
                            </div>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <MobileMenu
                isMenuOpen={ isMenuOpen && !loading }
                handleMenuClose={ handleMenuClose }
            />
        </div>
    );
};

export default NavBar;
