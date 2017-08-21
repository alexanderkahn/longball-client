// @flow weak

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
};

class LongballAppBar extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        console.info("setting true");
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        console.info("setting false");
        this.setState({isLoggedIn: false});
    }

    render() {
        const classes = this.props.classes;
        const userButton = this.getLogButton(this.state.isLoggedIn);
        console.info("rendering!");
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Longball
                        </Typography>
                        {userButton}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    getLogButton(isLoggedIn) {
        if (isLoggedIn) {
            return <Button color="contrast" onClick={this.handleLogoutClick}>Log out</Button>
        } else {
            return <Button color="contrast"onClick={this.handleLoginClick}>Log in</Button>
        }
    }
}


LongballAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongballAppBar);