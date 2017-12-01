import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { getNext, getPrevious, getSafePage, League } from '../../../../models/models';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: RootState): ManageLeaguesProps => {
    return {
        leagues: Array.from(state.data.leagues.values()),
        currentView: state.currentView,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<{}>): ManageLeaguesActions => {
    const currentPage = getSafePage(ownProps.location);
    const previous = getPrevious(dispatch, ownProps.location, currentPage);
    const next = getNext(dispatch, ownProps.location, currentPage);
    return {
        resetView: () => dispatch(resetView()),
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