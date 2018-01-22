import { connect, Dispatch } from 'react-redux';
import { deleteRosterPosition, fetchPlayers } from '../../../../actions/resource/rosterpositionsActions';
import ManagePlayersForm, { ManagePlayersFormActions, ManagePlayersFormProps } from '../presenters/ManagePlayersForm';
import { RootState } from '../../../../reducers/rootReducer';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { parseQueryParameters } from '../../../../util/urlParser';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';

const MANAGE_PLAYERS_BASE_URL = '/manage/players';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManagePlayersFormProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    const rosterPositions = state.resource.rosterPositions.getMappedPage(currentPage);
    const includedPeople = state.resource.people.data.getAll(getRelatedPersonIds(rosterPositions)).toArray();
    return {
        rosterPositions,
        includedPeople
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManagePlayersFormActions => {
    return {
        fetchListItems: (currentPage: PageDescriptor) => () => dispatch(fetchPlayers(currentPage)),
        onClickAdd: () => dispatch(push(MANAGE_PLAYERS_BASE_URL + '/add')),
        getPage: (page: number) => () => dispatch(push(MANAGE_PLAYERS_BASE_URL + `?page=${page}`)),
        buildHandleSelectPlayerDetail: (rosterPosition: RosterPosition) => () =>
            dispatch(push(`${MANAGE_PLAYERS_BASE_URL}/${rosterPosition.id}`)),
        buildHandleDeleteRosterPosition: (rosterPosition: RosterPosition) => () => dispatch(deleteRosterPosition(rosterPosition)),
    };
};

const ManagePlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagePlayersForm);

export default ManagePlayersContainer;

function getRelatedPersonIds(rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>): string[] {
    if (!isPresent(rosterPositions)) {
        return [];
    }
    return rosterPositions.object.contents.toArray()
        .map((it) => it.relationships.player.data.id);
}