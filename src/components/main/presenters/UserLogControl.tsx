import * as React from 'react';
import Button from 'material-ui/Button';
import { User } from '../../../models/models';

export interface UserLogControlProps {
    user?: User;
}

export interface UserLogControlActions {
    onLogIn: () => void;
}

function UserLogControl(props: UserLogControlProps & UserLogControlActions) {
    if (props.user) {
            return <span>{props.user.name}<Button color="contrast">Log out</Button></span>;
        } else {
            return <Button color="contrast" onClick={props.onLogIn}>Log in</Button>;
        }
}

export default UserLogControl;