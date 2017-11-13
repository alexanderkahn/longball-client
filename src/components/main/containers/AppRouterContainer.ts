import { connect } from 'react-redux';
import AppRouter, { AppRouterProps } from '../presenters/AppRouter';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any): AppRouterProps => {
    return {
        user: state.auth.user,
        isFetching: state.auth.isFetching
    };
};

const AppRouterContainer = connect(
    mapStateToProps,
)(AppRouter);

export default withRouter(AppRouterContainer);