import React from "react";
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {userProp} from "../../../models/models";

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

export default UserLogControl;