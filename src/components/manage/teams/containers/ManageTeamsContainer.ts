import { connect, Dispatch } from 'react-redux';
import { fetchTeams } from '../../../../actions/teams';
import ManageTeamsForm, { ManageTeamsFormActions, ManageTeamsFormProps } from '../presenters/ManageTeamsForm';
import { resetView } from '../../../../actions/currentView';
import { RootState } from '../../../../reducers/index';
import { push } from 'react-router-redux';

const mapStateToProps = (state: RootState): ManageTeamsFormProps => {
    return {
        teams: Array.from(state.data.teams.values()),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): ManageTeamsFormActions => {
    return {
        resetView: () => dispatch(resetView()),
        fetchListItems: () => dispatch(fetchTeams(0)),
        buildHandleSelectTeamDetail: (id: string) => () => dispatch(push(`/manage/teams/${id}`))
    };
};

const ManageTeamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTeamsForm);

export default ManageTeamsContainer;