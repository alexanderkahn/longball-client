import { connect, Dispatch } from 'react-redux';
import { deleteTeam, fetchTeams } from '../../../../actions/resource/teamsActions';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { Team } from '../../../../reducers/resource/team';
import { parseQueryParameters } from '../../../../models/models';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource';
import { List } from 'immutable';

const MANAGE_TEAMS_BASE_URL = '/manage/teams';

// TODO: lookit all this bullshit
export function getResourcePageResult<T>(pageResults: ResourceCache<PageResult<string>>, nonNullPageItems: Array<T>)
: ResourceCache<PageResult<T>> {
        if (isPresent(pageResults)) {
            return {
                fetchingState: FetchingState.FETCHED,
                object: {
                    descriptor: pageResults.object.descriptor,
                    meta: pageResults.object.meta,
                    contents: List(nonNullPageItems)
                }
            };
        } else if (pageResults.fetchingState === FetchingState.FETCHED) {
            return {
                fetchingState: FetchingState.FETCHED,
                object: null
            };
        } else {
            return {
                fetchingState: pageResults.fetchingState
            };
        }
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageTeamsFormProps => {
    const currentPage = parseQueryParameters(ownProps.location);
    const pageResults = state.resource.teams.pages.get(currentPage);
    return {
        teams: getResourcePageResult(pageResults, state.resource.teams.getNonNullPageItems(currentPage))
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>)
    : ManageTeamsFormActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchTeams(new PageDescriptor(page))),
        onClickAdd: () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}/add`)),
        getPage: (page: number) => () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}?page=${page}`)),
        buildHandleSelectTeamDetail: (team: Team) => () => dispatch(push(`${MANAGE_TEAMS_BASE_URL}/${team.id}`)),
        buildHandleDeleteTeam: (team: Team) => () => dispatch(deleteTeam(team))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;