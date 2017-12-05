import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/resourceobjects/leagues';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { deepCopy, FetchingState, League } from '../../../../models/models';

const emptyLeague: League = {
    id: '',
    type: 'leagues',
    attributes: {
        name: ''
    }
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    if  (leagueId === 'add') {
        return {
            league: deepCopy(emptyLeague),
            isEdit: true,
            currentView: {
                fetchingState: FetchingState.FETCHED
            }
        };
    } else {
        const leagueCache = state.data.leagues.data.get(leagueId);
        return {
            league: leagueCache ? leagueCache.object : null,
            isEdit: false,
            currentView: {
                fetchingState: leagueCache ? leagueCache.fetchingState : FetchingState.NOT_FETCHED
            }
        };
    }
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>):
    LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: function() {
            dispatch(fetchLeagueDetail(leagueId));
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