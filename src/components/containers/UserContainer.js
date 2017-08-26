import UserLogControl from "../UserLogControl";
import {connect} from "react-redux";
import {LOG_IN, LOG_OUT} from "../../actions";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: function () {
            dispatch(LOG_IN())
        },
        onLogOut: function () {
            dispatch(LOG_OUT());
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogControl);

export default UserContainer