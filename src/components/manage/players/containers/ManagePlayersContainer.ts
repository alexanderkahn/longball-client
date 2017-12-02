import { connect, Dispatch } from 'react-redux';
import { deletePlayer, fetchPlayers } from '../../../../actions/rosterpositions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { getNext, getPrevious, getSafePage, Player, RosterPosition } from '../../../../models/models';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PeopleState } from '../../../../reducers/data/people';
import { List } from 'immutable';

function getPlayers(rosterPositions: Array<RosterPosition>, people: PeopleState): Array<Player> {
    let players: Array<Player> = [];

    rosterPositions.forEach((rosterPosition) => {
        const person = !rosterPosition ? null : people.data.get(rosterPosition.relationships.player.data.id);
        if (rosterPosition && person) {
            players.push({rosterPosition, person});
        }
    });

    return players;
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManagePlayersFormProps => {
    const currentPage = getSafePage(ownProps.location);
    const rosterPositionIds = state.data.rosterPositions.pageInfo.pages.get(currentPage, List());
    console.info(rosterPositionIds);
    const rosterPositions = rosterPositionIds
        .map(id => state.data.rosterPositions.data.get(id || '', undefined)).toArray();
    return {
        players: getPlayers(rosterPositions, state.data.people),
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