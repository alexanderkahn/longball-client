import { connect } from 'react-redux';
import { fetchTeamDetail } from '../../../../actions/teams';
import { resetView } from '../../../../actions/currentView';
import TeamDetailForm, { TeamDetailFormActions, TeamDetailFormProps } from '../presenters/TeamDetailForm';

const mapStateToProps = (state: any, ownProps: any): TeamDetailFormProps => {
    const teamId = ownProps.match.params.teamId;
    return {
        team: state.data.teams[teamId],
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any): TeamDetailFormActions => {
    const teamId = ownProps.match.params.teamId;
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