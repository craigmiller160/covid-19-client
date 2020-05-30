import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MobileMenu from './MobileMenu';
import createMenuItems from './menuItems';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import displaySlice, {SECTION_HOME} from '../../../store/display/slice';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const loading = useSelector((state) => state.core.loading);
    const selectedSection = useSelector((state) => state.display.selectedSection);
    const [isMenuOpen, setMenuOpen] = useState(false);
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