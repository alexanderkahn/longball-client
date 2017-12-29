import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resource/rosterpositionsActions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getSafePage, Person, Player, RosterPosition } from '../../../../models/models';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage, ResourceObjectState } from '../../../../reducers/resource';

const MANAGE_PLAYERS_BASE_URL = '/manage/players';

function getPlayers(rosterPositions: Array<RosterPosition>, people: ResourceObjectState<Person>): Array<Player> {
    let players: Array<Player> = [];

    rosterPositions.forEach((rosterPosition) => {
        const person = !rosterPosition ? null : people.data.get(rosterPosition.relationships.player.data.id).object;
        if (rosterPosition && person) {
            players.push({rosterPosition, person});
        }
    });

    return players;
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManagePlayersFormProps => {
    const currentPage = getSafePage(state.resource.rosterPositions, ownProps.location);
    const rosterPositions = getObjectsForPage(state.resource.rosterPositions, '', currentPage.page);
    return {
        players: getPlayers(rosterPositions, state.resource.people),
        currentView: currentPage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>)
    : ManagePlayersFormActions => {
    return {
        fetchListItems: (currentPage: number) => () => dispatch(fetchPlayers('', currentPage)),
        onClickAdd: () => dispatch(push(MANAGE_PLAYERS_BASE_URL + '/add')),
        getPage: (page: number) => () => dispatch(push(MANAGE_PLAYERS_BASE_URL + `?page=${page}`)),
        buildHandleSelectPlayerDetail: (player: Player) => () =>
            dispatch(push(`${MANAGE_PLAYERS_BASE_URL}/${player.rosterPosition.id}`)),
        buildHandleDeletePlayer: (player: Player) => () => dispatch(deletePlayer(player)),
    };
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePlayersForm);

export default ManagePlayersContainer;