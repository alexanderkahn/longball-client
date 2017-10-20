import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import UserContainer from "../containers/UserLogControlContainer";
import DingerzCreditsContainer from "../containers/DingerzCreditsContainer";

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
        const showCredits = this.props.showCredits;
        const onClick = showCredits ? this.props.resetCounter : this.props.incrementCounter;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Dinger<span onClick={onClick}>z</span>!
                        </Typography>
                        <UserContainer />
                    </Toolbar>
                </AppBar>
                {showCredits && <DingerzCreditsContainer/>}
            </div>
        );
    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
    showCredits: PropTypes.bool.isRequired,
    incrementCounter: PropTypes.func.isRequired,
    resetCounter: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);