import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resource/rosterpositionsActions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getSafePage } from '../../../../models/models';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { ResourceObjectState } from '../../../../reducers/resource';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';

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
    const rosterPositions = state.resource.rosterPositions.getNonNullPageItems(new PageDescriptor(currentPage.page));
    return {
        players: getPlayers(rosterPositions, state.resource.people),
        currentView: currentPage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>)
    : ManagePlayersFormActions => {
    return {
        fetchListItems: (currentPage: number) => () => dispatch(fetchPlayers(new PageDescriptor(currentPage))),
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