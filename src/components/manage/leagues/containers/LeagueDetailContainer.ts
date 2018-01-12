import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/resource/leaguesActions';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { FetchingState, League } from '../../../../models/models';
import { resetForm, updateLeagueAttribute } from '../../../../actions/form/formUpdateActions';
import { ResourceCache } from '../../../../reducers/resource';

// FIXME GOD DAMMIT this cannot be back. At the very least why should it live here?
// Once the models all have empty() methods, maybe we can return this from the store,
// make the form track isEdit and remove the 'add' keyword logic from the container?
const newLeague: ResourceCache<League> = {
    fetchingState: FetchingState.FETCHED,
    object: League.empty(),
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    const isNewItem = leagueId === 'add';
    return {
        formLeague: state.form.league.resource,
        storedLeague: isNewItem ? newLeague : state.resource.leagues.data.get(leagueId),
        isEdit: isNewItem,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: () => dispatch(fetchLeagueDetail(leagueId)),
        resetFormItem: (league: League) => dispatch(resetForm('leagues', league)),
        updateName: (name: string) => dispatch(updateLeagueAttribute('name', name)),
        saveLeague: (league: League) => dispatch(saveLeague(league))
    };
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer;