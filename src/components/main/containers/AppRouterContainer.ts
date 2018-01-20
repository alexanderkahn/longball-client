import { connect } from 'react-redux';
import AppRouter, { AppRouterProps } from '../presenters/AppRouter';
import { withRouter } from 'react-router-dom';
import { RootState } from '../../../reducers/rootReducer';

const mapStateToProps = (state: RootState): AppRouterProps => {
    return {
        token: state.auth.token
    };
};

const AppRouterContainer = connect(
    mapStateToProps,
)(AppRouter);

export default withRouter(AppRouterContainer);