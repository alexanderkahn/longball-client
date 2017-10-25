import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../../shared/presenters/ManagementList'
import PlayerListItem from "../presenters/PlayerListItem";
import {fetchPlayers} from "../../../../actions/rosterpositions";

//TODO: no presentation components in state containers?
const getChildListItems = (rosterPositions, people) => {
    return Object.values(rosterPositions)
        .map(rosterPosition => <PlayerListItem key={rosterPosition.id}
                                               rosterPosition={rosterPosition}
                                               person={people[rosterPosition.relationships.player.data.id]}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Players',
        listItems: getChildListItems(state.data.rosterPositions, state.data.people),
        isFetching: state.currentView.isFetching,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListItems: function () {
            dispatch(fetchPlayers(0));
        },
    }
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default ManagePlayersContainer