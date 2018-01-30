import UserLogControl, { UserLogControlActions, UserLogControlProps } from '../presenters/UserLogControl';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../../reducers/rootReducer';
import { fetchCurrentUser } from '../../../actions/resource/usersActions';
import { attemptClearAuthentication } from '../../../actions/session';

const mapStateToProps = (state: RootState): UserLogControlProps => {
    return {
        user: state.auth.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): UserLogControlActions => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        logout: () => dispatch(attemptClearAuthentication())
    };
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogControl);

export default UserContainer;