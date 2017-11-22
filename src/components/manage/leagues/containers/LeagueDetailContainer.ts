import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/leagues';
import { resetView, toggleCurrentViewEdit } from '../../../../actions/currentView';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailFormProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { League } from '../../../../models/models';

const deepCopy = <T>(o: T): T => {
    return JSON.parse(JSON.stringify(o));
};

const emptyLeague = {
    id: '',
    type: 'leagues',
    attributes: {
        name: ''
    }
};

const getLeague = (id: string, storedLeagues: Map<string, League>): League | undefined => {
    if (id === 'add') {
        return deepCopy(emptyLeague);
    }
    return storedLeagues.get(id);
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>):
    LeagueDetailFormProps => {
    const leagueId = ownProps.match.params.itemId;
    return {
        league: getLeague(leagueId, state.data.leagues),
        currentView: state.currentView
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>):
    LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        resetView: function() {
            dispatch(resetView());
        },
        fetchItemDetail: function() {
            dispatch(fetchLeagueDetail(leagueId));
        },
        toggleCurrentViewEdit: function() {
            dispatch(toggleCurrentViewEdit());
        },
        saveLeague: function (league: League) {
            dispatch(saveLeague(league));
        }
    };
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer;