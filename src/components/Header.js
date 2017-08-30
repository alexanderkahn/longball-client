// @flow weak

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import UserContainer from "./containers/UserContainer";

const styles = {
    root: {
        width: '100%',
        marginBottom: 30,
    },
    flex: {
        flex: 1,
    },
};

class Header extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Longball
                        </Typography>
                        <UserContainer />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);