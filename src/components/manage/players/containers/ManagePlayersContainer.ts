import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getNext, getPrevious, getSafePage, Person, Player, RosterPosition } from '../../../../models/models';
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
    const currentPage = getSafePage(ownProps.location);
    const previous = getPrevious(dispatch, ownProps.location, currentPage);
    const next = getNext(dispatch, ownProps.location, currentPage);
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchPlayers(currentPage)),
        onClickAdd: () => dispatch(push('/manage/players/add')),
        onClickPrevious: previous,
        onClickNext: next,
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