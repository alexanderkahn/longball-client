import {connect} from 'react-redux'
import TeamDetail from "../presenters/TeamDetail";
import {fetchTeamDetail, selectTeamDetail} from "../../../../actions/teams";

function mapStateToProps(state, ownProps) {
    return {
        selectedTeamId: ownProps.match.params.teamId,
        teamDetailView: state.views.teamDetail,
        team: state.data.teams[ownProps.match.params.teamId],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectTeamDetail: function (teamId) {
            dispatch(selectTeamDetail(teamId));
        },
        fetchTeamDetail: function (teamId) {
            dispatch(fetchTeamDetail(teamId));
        }
    }
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetail);

export default TeamDetailContainer