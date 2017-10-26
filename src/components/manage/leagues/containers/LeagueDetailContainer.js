import React from "react";
import {connect} from 'react-redux'
import LeagueDetail from "../../shared/presenters/ManagementItemDetail";
import {fetchLeagueDetail} from "../../../../actions/leagues";
import {resetView} from "../../../../actions/currentView";
import LeagueDetailForm from "../presenters/LeagueDetailForm";

const mapStateToProps = (state, ownProps) => {
    const leagueId = ownProps.match.params.leagueId;
    return {
        itemDetailForm: <LeagueDetailForm league={state.data.leagues[leagueId]}/>,
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
        }
    }
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetail);

export default LeagueDetailContainer