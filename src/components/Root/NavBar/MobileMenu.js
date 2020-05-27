import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from 'react-redux';
import createMenuItems from './menuItems';
import './MobileMenu.scss';
import Typography from '@material-ui/core/Typography';
import displaySlice, {SECTION_HOME} from '../../../store/display/slice';

const MobileMenu = (props) => {
    const dispatch = useDispatch();
    const selectedSection = useSelector((state) => state.display.selectedSection);
    const {
        isMenuOpen,
        handleMenuClose
    } = props;

    const menuItems = createMenuItems(dispatch, selectedSection, handleMenuClose);
    const mergedMenuItems = [...menuItems.left, ...menuItems.right];
    const goHome = () => {
        handleMenuClose();
        dispatch(displaySlice.actions.setSelectedSection(SECTION_HOME));
    };

    return (
        <Drawer
            className="MobileMenu"
            open={ isMenuOpen }
            onClose={ handleMenuClose }
        >
            <Typography
                className="title"
                variant="h6"
                noWrap
                onClick={ goHome }
            >
                COVID-19 Data
            </Typography>
            {
                mergedMenuItems.map((item) => (
                    <ListItem
                        key={ item.id }
                        className={ `item ${item.active ? 'active' : ''}` }
                        onClick={ item.onClick }
                    >
                        <ListItemText>{ item.label }</ListItemText>
                    </ListItem>
                ))
            }
        </Drawer>
    );
};

export default MobileMenu;