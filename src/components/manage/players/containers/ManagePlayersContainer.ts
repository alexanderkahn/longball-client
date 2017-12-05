import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/resourceobjects/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import {
    FetchingState, getSafePage, getUrlForPage, hasNext, hasPrevious, Person, Player,
    RosterPosition
} from '../../../../models/models';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage, ResourceObjectState } from '../../../../reducers/data/index';

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
    const currentPage = getSafePage(ownProps.location);
    const pageInfo = state.data.rosterPositions.pageInfo.pages.get(currentPage);
    const rosterPositions = getObjectsForPage(state.data.rosterPositions, currentPage);
    return {
        players: getPlayers(rosterPositions, state.data.people),
        currentView: {
            fetchingState: pageInfo ? pageInfo.fetchingState : FetchingState.NOT_FETCHED,
            page: currentPage,
            hasPrevious: hasPrevious(currentPage),
            hasNext: hasNext(state.data.rosterPositions, currentPage)
        }
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManagePlayersFormActions => {
    const currentPage = getSafePage(ownProps.location);
    return {
        fetchListItems: () => dispatch(fetchPlayers(currentPage)),
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