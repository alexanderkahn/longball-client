import SignInPage from '../presenters/SignInPage';
import { connect, Dispatch } from 'react-redux';
import { redirectToAuthenticationProvider } from '../../../actions/session';
import { RootState } from '../../../reducers/index';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
    return {
        startSignInFlow: function () {
            dispatch(redirectToAuthenticationProvider());
        },
    };
};

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInPage);

export default SignInContainer;