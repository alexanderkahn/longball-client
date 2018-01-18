import UserLogControl, { UserLogControlActions, UserLogControlProps } from '../presenters/UserLogControl';
import { connect, Dispatch } from 'react-redux';
import { redirectToAuthenticationProvider } from '../../../actions/session';
import { RootState } from '../../../reducers/rootReducer';

const mapStateToProps = (state: RootState): UserLogControlProps => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): UserLogControlActions => {
    return {
        onLogIn: function () {
            dispatch(redirectToAuthenticationProvider());
        },
    };
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogControl);

export default UserContainer;