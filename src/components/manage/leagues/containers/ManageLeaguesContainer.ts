import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resource/leaguesActions';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers';
import { push } from 'react-router-redux';
import { getSafePage, League } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
// import { getObjectsForPage } from '../../../../reducers/resource/index';
import { PageDescriptor } from '../../../../reducers/resource/page';

const MANAGE_LEAGUES_BASE_URL = '/manage/leagues';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentView = getSafePage(state.resource.leagues, ownProps.location);
    return {
        leagues: state.resource.leagues.getNonNullPageItems(new PageDescriptor(currentView.page)),
        currentView: currentView,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageLeaguesActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchLeagues(new PageDescriptor(page))),
        onClickAdd: () => dispatch(push(MANAGE_LEAGUES_BASE_URL + '/add')),
        getPage: (page: number) => () => dispatch(push(MANAGE_LEAGUES_BASE_URL + `?page=${page}`)),
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`${MANAGE_LEAGUES_BASE_URL}/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;