import {connect} from 'react-redux'
import {fetchLeagueDetail} from "../../../../actions/leagues";
import {resetView, toggleCurrentViewEdit} from "../../../../actions/currentView";
import LeagueDetailForm from "../presenters/LeagueDetailForm";

const mapStateToProps = (state, ownProps) => {
    const leagueId = ownProps.match.params.leagueId;
    return {
        league: state.data.leagues[leagueId],
        currentView: state.currentView
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const leagueId = ownProps.match.params.leagueId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchLeagueDetail(leagueId));
        },
        toggleEdit: function() {
            dispatch(toggleCurrentViewEdit());
        }
    }
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer