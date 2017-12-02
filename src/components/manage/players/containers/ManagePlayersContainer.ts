import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getNext, getPrevious, getSafePage, Player } from '../../../../models/models';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PeopleState } from '../../../../reducers/data/people';
import { RosterPositionsState } from '../../../../reducers/data/rosterPositions';

function getPlayers(rosterPositions: RosterPositionsState, people: PeopleState): Array<Player> {
    let players: Array<Player> = [];

    rosterPositions.data.forEach((rosterPosition) => {
        const person = !rosterPosition ? null : people.data.get(rosterPosition.relationships.player.data.id);
        if (rosterPosition && person) {
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