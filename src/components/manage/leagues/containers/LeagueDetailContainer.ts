import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/resource/leaguesActions';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { FetchedState, League } from '../../../../models/models';
import { updateLeagueName } from '../../../../actions/form/leagueFormActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    if  (leagueId === 'add') {
        return {
            league: state.form.league.league,
            isEdit: true,
            currentView: {
                fetchedState: FetchedState.FETCHED
            }
        };
    } else {
        const leagueCache = state.resource.leagues.data.get(leagueId);
        return {
            league: leagueCache ? leagueCache.object : null,
            isEdit: false,
            currentView: {
                fetchedState: leagueCache ? leagueCache.fetchingState : FetchedState.NOT_FETCHED
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
        updateName: function (name: string) {
            dispatch(updateLeagueName(name));
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