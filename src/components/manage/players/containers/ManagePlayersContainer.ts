import { connect, Dispatch } from 'react-redux';
import { fetchPlayers } from '../../../../actions/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { Person, Player, RosterPosition } from '../../../../models/models';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';

function getPlayers(rosterPositions: Map<string, RosterPosition>, people: Map<string, Person>): Array<Player> {
    let players: Array<Player> = [];
    Array.from(rosterPositions.values()).forEach( (rosterPosition) => {
        const person = people.get(rosterPosition.relationships.player.data.id);
        if (person) {
            players.push({rosterPosition, person});
        }
    });
    return players;
}

const mapStateToProps = (state: any): ManagePlayersFormProps => {
    return {
        players: getPlayers(state.data.rosterPositions, state.data.people),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManagePlayersFormActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchPlayers(0))
    };
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePlayersForm);

export default ManagePlayersContainer;