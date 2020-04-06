import React, { Component } from "react";
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import SettingsBackupRestoreRoundedIcon from '@material-ui/icons/SettingsBackupRestoreRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const menus = [
    {
        path: '/',
        icon: HomeRoundedIcon,
        label: 'Home'
    },
    {
        path: '/items',
        icon: CollectionsBookmarkRoundedIcon,
        label: 'Items'
    },
    {
        path: '/stocks',
        icon: SettingsBackupRestoreRoundedIcon,
        label: 'Stocks'
    },
    {
        path: '/units',
        icon: StorageRoundedIcon,
        label: 'Units'
    }


]

class Navigation extends Component {


    render() {
        const { classes, theme, mobileOpen, handleDrawerToggle } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {menus.map((menu, index) => (
                        <Link key={index} to={menu.path}>
                            <ListItem button>
                                <ListItemIcon><menu.icon /></ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        );

        return (
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer

                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }

}


Navigation.propTypes = {
    mobileOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Navigation);