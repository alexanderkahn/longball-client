import {connect} from 'react-redux'
import TeamDetail from "../presenters/TeamDetail";
import {fetchTeamDetail} from "../../../../actions/teams";
import {resetView} from "../../../../actions/currentView";

function mapStateToProps(state, ownProps) {
    return {
        selectedTeamId: ownProps.match.params.teamId,
        team: state.data.teams[ownProps.match.params.teamId],
        currentView: state.currentView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetView: function () {
            dispatch(resetView());
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