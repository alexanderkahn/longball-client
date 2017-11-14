import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail } from '../../../../actions/teams';
import { resetView } from '../../../../actions/currentView';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailFormProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers/index';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>):
    TeamDetailFormProps => {
    const teamId = ownProps.match.params.itemId;
    return {
        team: state.data.teams.get(teamId),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>):
    TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchTeamDetail(teamId));
        }
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;