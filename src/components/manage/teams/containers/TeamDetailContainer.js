import React from "react";
import {connect} from 'react-redux'
import {fetchTeamDetail} from "../../../../actions/teams";
import {resetView} from "../../../../actions/currentView";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";
import TeamDetailForm from "../presenters/TeamDetailForm";

const mapStateToProps = (state, ownProps) => {
    const teamId = ownProps.match.params.teamId;
    return {
        itemDetailForm: <TeamDetailForm team={state.data.teams[teamId]}/>,
        currentView: state.currentView
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const teamId = ownProps.match.params.teamId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchTeamDetail(teamId));
        }
    }
};

const TeamDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementItemDetail);

export default TeamDetailContainer