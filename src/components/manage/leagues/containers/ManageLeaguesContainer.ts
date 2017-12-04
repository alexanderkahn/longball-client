import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/resourceobjects/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { FetchingState, getNext, getPrevious, getSafePage, League } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';
import { getObjectsForPage } from '../../../../reducers/data/index';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<{}>): ManageLeaguesProps => {
    const currentPage = getSafePage(ownProps.location);
    const pageInfo = state.data.leagues.pageInfo.pages.get(currentPage);
    return {
        leagues: getObjectsForPage(state.data.leagues, currentPage),
        currentView: {
            fetchingState: pageInfo ? pageInfo.fetchingState : FetchingState.NOT_FETCHED,
        },
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>): ManageLeaguesActions => {
    const currentPage = getSafePage(ownProps.location);
    const previous = getPrevious(dispatch, ownProps.location, currentPage);
    const next = getNext(dispatch, ownProps.location, currentPage);
    return {
        fetchListItems: () => dispatch(fetchLeagues(currentPage)),
        onClickAdd: () => dispatch(push('/manage/leagues/add')),
        onClickPrevious: previous,
        onClickNext: next,
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`/manage/leagues/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;