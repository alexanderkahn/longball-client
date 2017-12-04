import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/resourceobjects/leagues';
import { resetView } from '../../../../actions/currentView';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/index';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { deepCopy, League } from '../../../../models/models';

const emptyLeague = {
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
            currentView: state.currentView
        };
    } else {
        return {
            league: state.data.leagues.data.get(leagueId).object,
            isEdit: false,
            currentView: state.currentView
        };
    }
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