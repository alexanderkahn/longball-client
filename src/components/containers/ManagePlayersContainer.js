import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import PlayerListItem from "../PlayerListItem";
import {fetchPlayers} from "../../actions/players";

//TODO: no presentation components in state containers?
const getChildListItems = (players) => {
    return Object.values(players).map(player => <PlayerListItem key={player.id} player={player}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Players',
        listItems: getChildListItems(state.data.players),
        isFetching: state.views.managePlayers.isFetching,
        lastFetched: state.views.managePlayers.lastFetched,

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