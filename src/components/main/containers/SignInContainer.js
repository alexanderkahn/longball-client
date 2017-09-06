import SignInPage from "../presenters/SignInPage";
import {connect} from "react-redux";
import {redirectToAuthenticationProvider} from "../../../actions/session";

const mapStateToProps = dispatch => {
  return {}
};

const mapDispatchToProps = dispatch => {
    return {
        startSignInFlow: function () {
            dispatch(redirectToAuthenticationProvider());
        },
    }
};

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInPage);

export default SignInContainer