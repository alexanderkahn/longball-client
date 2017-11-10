// @flow

import React from "react";
import Button from 'material-ui/Button';
import type {User} from "../../../models/models";

type UserLogControlProps = {
    user: ?User,
    onLogIn(): void
}


function UserLogControl(props: UserLogControlProps) {
    if (props.user) {
            return <span>{props.user.name}<Button color="contrast">Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn}>Log in</Button>;
        }
}

export default UserLogControl;