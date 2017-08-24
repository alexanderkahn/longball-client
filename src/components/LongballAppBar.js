// @flow weak

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import UserLogControl from './UserLogControl';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
    root: {
        width: '100%',
        marginBottom: 30,
    },
    flex: {
        flex: 1,
    },
};

class LongballAppBar extends Component {
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
                        <UserLogControl/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


LongballAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongballAppBar);