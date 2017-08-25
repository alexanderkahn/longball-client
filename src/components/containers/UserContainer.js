import UserLogControl from "../UserLogControl";
import {connect} from "react-redux";
import {logIn, logOut} from "../../actions";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: function () {
            dispatch(logIn())
        },
        onLogOut: function () {
            dispatch(logOut());
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogControl);

export default UserContainer