import UserLogControl, { UserLogControlActions, UserLogControlProps } from '../presenters/UserLogControl';
import { connect } from 'react-redux';
import { redirectToAuthenticationProvider } from '../../../actions/session';

const mapStateToProps = (state: any): UserLogControlProps => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch: any): UserLogControlActions => {
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