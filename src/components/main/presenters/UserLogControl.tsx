import * as React from "react";
import Button from 'material-ui/Button';
import {User} from "../../../models/models";

interface UserLogControlProps {
    user?: User,
    onLogIn: Function
}


function UserLogControl(props: UserLogControlProps) {
    if (props.user) {
            return <span>{props.user.name}<Button color="contrast">Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn()}>Log in</Button>;
        }
}

export default UserLogControl;