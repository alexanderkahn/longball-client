import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resource/rosterpositionsActions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { RootState } from '../../../../reducers/rootReducer';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';
import { parseQueryParameters } from '../../../../util/urlParser';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import * as Immutable from 'immutable';

const MANAGE_PLAYERS_BASE_URL = '/manage/players';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManagePlayersFormProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    const rosterPositions = state.resource.rosterPositions.getMappedPage(currentPage);
    const rpKeys = getRelatedPersonIds(rosterPositions);
    const people = state.resource.people.data.getAll(rpKeys);
    return {
        players: mapCacheToPlayers(rosterPositions, people.toArray())
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

function getRelatedPersonIds(rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>): string[] {
    if (!isPresent<PageDescriptor, PageResult<RosterPosition>>(rosterPositions)) {
        return [];
    }
    return rosterPositions.object.contents.toArray()
        .map((it) => it.relationships.player.data.id);
}

// TODO: got rid of all the garbage everywhere else, but still have lots and lots of garbage here.
function mapCacheToPlayers(
    rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>,
    people: Array<ResourceCache<string, Person>>
): ResourceCache<PageDescriptor, PageResult<Player>> {
    if (isPresent<PageDescriptor, PageResult<RosterPosition>>(rosterPositions)) {
        return {
            ...rosterPositions,
            object: {
                ...rosterPositions.object,
                contents: Immutable.List(getPlayers(rosterPositions, people))
            }
        };
    } else {
        return rosterPositions;
    }
}

function getPlayers(
    rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>,
    people: Array<ResourceCache<string, Person>>
): Array<Player> {
    let players: Array<Player> = [];

    if (!isPresent<PageDescriptor, PageResult<RosterPosition>>(rosterPositions)) {
        return [];
    }
    rosterPositions.object.contents.toArray().forEach((rosterPosition) => {
        const person = people.find(
            it => it.id === rosterPosition.relationships.player.data.id
        );
        if (rosterPosition && person && isPresent<string, Person>(person)) {
            players.push({rosterPosition, person: person.object});
        }
    });

    return players;
}