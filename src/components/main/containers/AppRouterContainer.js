import {connect} from "react-redux";
import AppRouter from "../presenters/AppRouter";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isFetching: state.auth.isFetching
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

const AppRouterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter);

export default withRouter(AppRouterContainer)