import {connect} from 'react-redux'
import LeagueDetail from "../presenters/LeagueDetail";
import {fetchLeagueDetail, selectLeagueDetail} from "../../../../actions/leagues";

function mapStateToProps(state, ownProps) {
    return {
        selectedLeagueId: ownProps.match.params.leagueId,
        leagueDetailView: state.views.leagueDetail,
        league: state.data.leagues[ownProps.match.params.leagueId],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLeagueDetail: function (leagueId) {
            dispatch(selectLeagueDetail(leagueId));
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