import {connect} from 'react-redux'
import LeagueDetail from "../presenters/LeagueDetail";
import {fetchLeagueDetail} from "../../../../actions/leagues";
import {setCurrentViewFetching} from "../../../../actions/currentView";

function mapStateToProps(state, ownProps) {
    return {
        selectedLeagueId: ownProps.match.params.leagueId,
        league: state.data.leagues[ownProps.match.params.leagueId],
        currentView: state.currentView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetView: function () {
            dispatch(setCurrentViewFetching(false));
        },
        fetchLeagueDetail: function (leagueId) {
            dispatch(fetchLeagueDetail(leagueId));
        }
    }
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetail);

export default LeagueDetailContainer