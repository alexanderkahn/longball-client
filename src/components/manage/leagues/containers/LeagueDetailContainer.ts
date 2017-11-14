import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail } from '../../../../actions/leagues';
import { resetView, toggleCurrentViewEdit } from '../../../../actions/currentView';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailFormProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>):
    LeagueDetailFormProps => {
    const leagueId = ownProps.match.params.itemId;
    return {
        league: state.data.leagues.get(leagueId),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>):
    LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchLeagueDetail(leagueId));
        },
        toggleCurrentViewEdit: function() {
            dispatch(toggleCurrentViewEdit());
        }
    };
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer;