import { connect, Dispatch } from 'react-redux';
import { deleteLeague, fetchLeagues } from '../../../../actions/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';
import { League } from '../../../../models/models';

const mapStateToProps = (state: RootState): ManageLeaguesProps => {
    return {
        leagues: Array.from(state.data.leagues.values()),
        currentView: state.currentView,
        addOneUrl: '/manage/leagues/add'
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageLeaguesActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchLeagues(0)),
        onClickAdd: () => dispatch(push('manage/leagues/add')),
        buildHandleSelectDetail: (id: string) => () => dispatch(push(`/manage/leagues/${id}`)),
        buildHandleDeleteLeague: (league: League) => () => dispatch(deleteLeague(league))
    };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;