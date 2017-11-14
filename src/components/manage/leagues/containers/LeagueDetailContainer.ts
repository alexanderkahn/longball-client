import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail } from '../../../../actions/leagues';
import { resetView, toggleCurrentViewEdit } from '../../../../actions/currentView';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailFormProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/index';

const mapStateToProps = (state: any, ownProps: any): LeagueDetailFormProps => {
    const leagueId = ownProps.match.params.leagueId;
    return {
        league: state.data.leagues.get(leagueId),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: any): LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.leagueId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchLeagueDetail(leagueId));
        },
        toggleCurrentViewEdit: function() {
            dispatch(toggleCurrentViewEdit());
        }
    };
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer;