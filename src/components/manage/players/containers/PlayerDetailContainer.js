import React from "react";
import {connect} from 'react-redux'
import {fetchPlayerDetail} from "../../../../actions/rosterpositions";
import {resetView} from "../../../../actions/currentView";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";
import PlayerDetailForm from "../presenters/PlayerDetailForm";

function mapStateToProps(state, ownProps) {
    const rosterPosition = state.data.rosterPositions[ownProps.match.params.playerId];
    const person = !rosterPosition ? null : state.data.people[rosterPosition.relationships.player.data.id];
    return {
        itemDetailForm: <PlayerDetailForm rosterPosition={rosterPosition} person={person}/>,
        currentView: state.currentView
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const playerId = ownProps.match.params.playerId;
    return {
        resetView: function () {
            dispatch(resetView());
        },
        fetchItemDetail: function () {
            dispatch(fetchPlayerDetail(playerId));
        }
    }
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementItemDetail);

export default PlayerDetailContainer