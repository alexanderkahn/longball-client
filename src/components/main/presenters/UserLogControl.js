import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {userProp} from "../../../models/models";

const styles = theme => ({});

function UserLogControl(props) {
    if (props.user) {
            return <span>{props.user.name}<Button color="contrast">Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn}>Log in</Button>;
        }
}


UserLogControl.propTypes = {
    onLogIn: PropTypes.func.isRequired,
    user: userProp,
};

export default withStyles(styles)(UserLogControl);