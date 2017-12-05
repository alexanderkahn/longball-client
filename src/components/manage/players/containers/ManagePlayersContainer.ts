import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resource/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getSafePage, getUrlForPage, Person, Player, RosterPosition } from '../../../../models/models';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage, ResourceObjectState } from '../../../../reducers/resource/index';

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
    const rosterPositions = getObjectsForPage(state.resource.rosterPositions, currentPage.page);
    return {
        players: getPlayers(rosterPositions, state.resource.people),
        currentView: currentPage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManagePlayersFormActions => {
    return {
        fetchListItems: (currentPage: number) => () => dispatch(fetchPlayers(currentPage)),
        onClickAdd: () => dispatch(push('/manage/players/add')),
        getPage: (page: number) => () => dispatch(push(getUrlForPage(ownProps.location, page))),
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