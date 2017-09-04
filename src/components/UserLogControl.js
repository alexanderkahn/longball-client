import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({});

function UserLogControl(props) {
    console.info(props.user);
    if (props.user) {
            return <span>{props.user.name}<Button color="contrast">Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn}>Log in</Button>;
        }
}


UserLogControl.propTypes = {
    onLogIn: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
};

export default withStyles(styles)(UserLogControl);