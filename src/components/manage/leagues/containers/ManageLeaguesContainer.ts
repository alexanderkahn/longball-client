import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resourceobjects/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getSafePage, League, getUrlForPage } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/data/index';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = getSafePage(state.data.leagues, ownProps.location);
    return {
        leagues: getObjectsForPage(state.data.leagues, currentPage.page),
        currentView: currentPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>): ManageLeaguesActions => {
    return {
        fetchListItems: (page: number) => () => dispatch(fetchLeagues(page)),
        onClickAdd: () => dispatch(push('/manage/leagues/add')),
        getPage: (page: number) => () => dispatch(push(getUrlForPage(ownProps.location, page))),
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`/manage/leagues/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;