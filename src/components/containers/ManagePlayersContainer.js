import React from 'react'
import {connect} from 'react-redux'
import ManagementList from '../ManagementList'
import PlayerListItem from "../PlayerListItem";

//TODO: no presentation components in state containers?
const getChildListItems = (players) => {
    return Object.values(players).map(player => <PlayerListItem key={player.id} player={player}/>);
};

const mapStateToProps = state => {
    return {
        title: 'Players',
        listItems: getChildListItems(state.data.players),
        isFetching: state.routes.managePlayers.isFetching,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagementList);

export default ManagePlayersContainer