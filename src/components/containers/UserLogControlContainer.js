import UserLogControl from "../UserLogControl";
import {connect} from "react-redux";
import {redirectToAuthenticationProvider} from "../../actions/auth";

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