import UserLogControl, { UserLogControlActions, UserLogControlProps } from '../presenters/UserLogControl';
import { connect, Dispatch } from 'react-redux';
import { redirectToAuthenticationProvider } from '../../../actions/session';
import { RootState } from '../../../reducers/rootReducer';

// FIXME: get user details from the server!
const mapStateToProps = (state: RootState): UserLogControlProps => {
    return {
        user: {
            name: 'Edgar Martinez belongs in the Hall of Fame'
        }
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