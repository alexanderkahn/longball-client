import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({});

function UserLogControl(props) {
    if (props.user) {
            return <span>{props.user.first} {props.user.last}<Button color="contrast" onClick={props.onLogOut}>Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn}>Log in</Button>;
        }
}


UserLogControl.propTypes = {
    onLogIn: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
    user: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired
    }),
};

export default withStyles(styles)(UserLogControl);