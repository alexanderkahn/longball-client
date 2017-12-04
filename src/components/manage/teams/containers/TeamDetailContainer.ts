import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/resourceobjects/teams';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailProps } from '../presenters/TeamDetailForm';
import { RootState } from '../../../../reducers/index';
import { RouteComponentProps } from 'react-router';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { deepCopy, FetchingState, Team } from '../../../../models/models';

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
                type: 'leagues',
                id: ''
            },
        }
    }
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): TeamDetailProps => {
    const teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            team: deepCopy(emptyTeam),
            currentView: {
                fetchingState: FetchingState.FETCHED
            },
            isEdit: true
        };
    } else {
        const teamCache = state.data.teams.data.get(teamId);
        return {
            team: teamCache ? teamCache.object : null,
            currentView: {
                fetchingState: teamCache ? teamCache.fetchingState : FetchingState.NOT_FETCHED
            },
            isEdit: false
        };
    }
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormActions => {
    const teamId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: function () {
            dispatch(fetchTeamDetail(teamId));
        },
        saveTeam: function (team: Team) {
            dispatch(saveTeam(team));
        }
    };
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetailForm);

export default TeamDetailContainer;