import React, {Component} from "react";
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({});

class UserLogControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        if (isLoggedIn) {
            return <Button color="contrast" onClick={this.handleLogoutClick}>Log out</Button>;
        } else {
            return <Button color="contrast" onClick={this.handleLoginClick}>Log in</Button>;
        }
    }
}


UserLogControl.propTypes = {};

export default withStyles(styles)(UserLogControl);