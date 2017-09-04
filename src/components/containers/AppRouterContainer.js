import {connect} from "react-redux";
import AppRouter from "../AppRouter";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        user: state.auth.user
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