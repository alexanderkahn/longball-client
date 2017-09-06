import UserLogControl from "../presenters/UserLogControl";
import {connect} from "react-redux";
import {redirectToAuthenticationProvider} from "../../../actions/session";

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: function () {
            dispatch(redirectToAuthenticationProvider())
        },
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogControl);

export default UserContainer