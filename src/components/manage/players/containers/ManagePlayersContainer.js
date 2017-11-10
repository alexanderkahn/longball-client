import {connect} from 'react-redux'
import {fetchPlayers} from "../../../../actions/rosterpositions";
import ManagePlayersForm from "../presenters/ManagePlayersForm";

function getPlayers(rosterPositions, people) {
    let getPlayer = function (rosterPosition) {
        return {rosterPosition, person: people[rosterPosition.relationships.player.data.id]};
    };
    return Object.values(rosterPositions)
        .map(rosterPosition => getPlayer(rosterPosition));
}

const mapStateToProps = state => {
    return {
        title: 'Players',
        players: getPlayers(state.data.rosterPositions, state.data.people),
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
)(ManagePlayersForm);

export default ManagePlayersContainer