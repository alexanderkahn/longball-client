import { connect, Dispatch } from 'react-redux';
import { fetchLeagues } from '../../../../actions/leagues';
import ManageLeaguesForm, { ManageLeaguesActions, ManageLeaguesProps } from '../presenters/ManageLeaguesForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';

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
        fetchListItems: () => dispatch(fetchLeagues(0))
        };
};

const ManageLeaguesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageLeaguesForm);

export default ManageLeaguesContainer;