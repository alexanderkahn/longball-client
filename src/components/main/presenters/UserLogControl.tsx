import * as React from 'react';
import Button from 'material-ui/Button';
import { User } from '../../../reducers/resource/user';
import { isUnfetched, isPresent, ResourceCache } from '../../../reducers/resource/cache';
import LoadingProgressIndicator from '../../shared/presenters/LoadingProgressIndicator';

export interface UserLogControlProps {
    user: ResourceCache<string, User>;
}

export interface UserLogControlActions {
    fetchCurrentUser: () => void;
}

export default class UserLogControl extends React.Component<UserLogControlProps & UserLogControlActions> {

    componentWillMount() {
        this.updateControl();
    }

    componentDidUpdate() {
        this.updateControl();
    }

    render() {
        const { user } = this.props;
        if (isPresent(user)) {
            return <span>{user.object.attributes.displayName}<Button color="contrast">Log out</Button></span>;
        } else {
            return <LoadingProgressIndicator enabled={true}/>;
        }
    }

    private updateControl() {
        if (isUnfetched(this.props.user)) {
            this.props.fetchCurrentUser();
        }
    }
}