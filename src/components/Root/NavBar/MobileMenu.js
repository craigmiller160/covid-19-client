import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from 'react-redux';
import createMenuItems from './menuItems';
import './MobileMenu.scss';
import Typography from '@material-ui/core/Typography';
import displaySlice, {SECTION_HOME} from '../../../store/display/slice';
import { NavLink, useLocation } from 'react-router-dom';

const MobileMenu = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {
        isMenuOpen,
        handleMenuClose
    } = props;

    const menuItems = createMenuItems(dispatch, location.pathname, handleMenuClose);
    const mergedMenuItems = [...menuItems.left, ...menuItems.right];

    return (
        <Drawer
            className="MobileMenu"
            open={ isMenuOpen }
            onClose={ handleMenuClose }
        >
            <NavLink
                to="/"
                exact
                className="NavLink"
            >
                <Typography
                    className="title"
                    variant="h6"
                    noWrap
                    onClick={ handleMenuClose }
                >
                    COVID-19 Data
                </Typography>
            </NavLink>
            {
                mergedMenuItems.map((item, index) => (
                    <ListItem
                        key={ index }
                        className={ `item ${item.active ? 'active' : ''}` }
                        onClick={ item.onClick }
                    >
                        <NavLink
                            to={ item.to }
                            exact={ item.exact }
                            className="NavLink"
                        >
                            <ListItemText>{ item.label }</ListItemText>
                        </NavLink>
                    </ListItem>
                ))
            }
        </Drawer>
    );
};

export default MobileMenu;