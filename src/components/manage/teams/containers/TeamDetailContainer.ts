import { connect, Dispatch } from 'react-redux';
import { fetchTeamDetail, saveTeam } from '../../../../actions/teams';
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
                type: 'leagues',
                id: ''
            },
        }
    }
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : TeamDetailFormProps => {
    const teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            team: deepCopy(emptyTeam),
            currentView: state.currentView,
            isEdit: true
        };
    } else {
        return {
            team: state.data.teams.get(teamId),
            currentView: state.currentView,
            isEdit: false
        };
    }
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