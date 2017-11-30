import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getSafePage, Person, Player, RosterPosition } from '../../../../models/models';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';

function getPlayers(rosterPositions: Map<string, RosterPosition>, people: Map<string, Person>): Array<Player> {
    let players: Array<Player> = [];
    Array.from(rosterPositions.values()).forEach((rosterPosition) => {
        const person = people.get(rosterPosition.relationships.player.data.id);
        if (person) {
            players.push({rosterPosition, person});
        }
    });
    return players;
}

const mapStateToProps = (state: RootState): ManagePlayersFormProps => {
    return {
        players: getPlayers(state.data.rosterPositions, state.data.people),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManagePlayersFormActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchPlayers(getSafePage(ownProps.location))),
        onClickAdd: () => dispatch(push('/manage/players/add')),
        buildHandleSelectPlayerDetail: (player: Player) => () =>
            dispatch(push(`/manage/players/${player.rosterPosition.id}`)),
        buildHandleDeletePlayer: (player: Player) => () => dispatch(deletePlayer(player)),
    };
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePlayersForm);

export default ManagePlayersContainer;