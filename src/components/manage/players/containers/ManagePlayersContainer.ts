import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resource/rosterpositionsActions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { isPresent, ResourceObjectState } from '../../../../reducers/resource';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';
import { parseQueryParameters } from '../../../../models/models';
import { getResourcePageResult } from '../../teams/containers/ManageTeamsContainer';

const MANAGE_PLAYERS_BASE_URL = '/manage/players';

function getPlayers(rosterPositions: Array<RosterPosition>, people: ResourceObjectState<Person>): Array<Player> {
    let players: Array<Player> = [];

    rosterPositions.forEach((rosterPosition) => {
        const person = !rosterPosition ? null : people.data.get(rosterPosition.relationships.player.data.id);
        if (rosterPosition && isPresent<string, Person>(person)) {
            players.push({rosterPosition, person: person.object});
        }
    });

    return players;
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManagePlayersFormProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    const pageResults = state.resource.rosterPositions.pages.get(currentPage);
    const rosterPositions = state.resource.rosterPositions.getNonNullPageItems(currentPage);
    return {
        players: getResourcePageResult(pageResults, getPlayers(rosterPositions, state.resource.people))
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>)
    : ManagePlayersFormActions => {
    return {
        fetchListItems: (currentPage: PageDescriptor) => () => dispatch(fetchPlayers(currentPage)),
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