import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail } from '../../../../actions/teams';
import { resetView } from '../../../../actions/currentView';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailFormProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers/index';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { deepCopy, Team } from '../../../../models/models';

const emptyTeam: Team = {
    id: '',
    type: 'teams',
    attributes: {
        abbreviation: '',
        location: '',
        nickname: ''
    },
    relationships: {
        league: {
            data: {
                type: '',
                id: ''
            },
        }
    }
};

const getTeam = (id: string, storedTeams: Map<string, Team>): Team | undefined => {
    if (id === 'add') {
        return deepCopy(emptyTeam);
    }
    return storedTeams.get(id);
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormProps => {
    const teamId = ownProps.match.params.itemId;
    return {
        team: getTeam(teamId, state.data.teams),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        resetView: function () {
            dispatch(resetView());
        },
        fetchItemDetail: function () {
            dispatch(fetchTeamDetail(teamId));
        }
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;