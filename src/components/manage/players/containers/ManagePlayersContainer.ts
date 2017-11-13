import {connect} from 'react-redux'
import {fetchPlayers} from "../../../../actions/rosterpositions";
import ManagePlayersForm, {ManagePlayersFormActions, ManagePlayersFormProps} from "../presenters/ManagePlayersForm";
import {RosterPosition} from "../../../../models/models";

function getPlayers(rosterPositions: any, people: any) {
    let getPlayer = function (rosterPosition: RosterPosition) {
        return {rosterPosition, person: people[rosterPosition.relationships.player.data.id]};
    };
    return Object.values(rosterPositions)
        .map(rosterPosition => getPlayer(rosterPosition));
}

const mapStateToProps = (state: any): ManagePlayersFormProps => {
    return {
        players: getPlayers(state.data.rosterPositions, state.data.people),
        isFetching: state.currentView.isFetching,
        lastFetched: state.currentView.lastUpdated,
    }
};

const mapDispatchToProps = (dispatch: any): ManagePlayersFormActions => {
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