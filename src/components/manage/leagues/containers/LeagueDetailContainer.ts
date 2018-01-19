import { connect, Dispatch } from 'react-redux';
import { fetchLeague, saveLeague } from '../../../../actions/resource/leaguesActions';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/rootReducer';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { resetForm, updateLeagueAttribute } from '../../../../actions/form/formUpdateActions';
import { League } from '../../../../reducers/resource/league';
import { NEW_RESOURCE_FORM_ROUTE } from '../../../../reducers/resource/cache';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    const isNewItem = leagueId === NEW_RESOURCE_FORM_ROUTE;
    return {
        formLeague: state.form.league.resource,
        storedLeague: state.resource.leagues.data.get(leagueId),
        isEdit: isNewItem,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        fetchItem: () => dispatch(fetchLeague(leagueId)),
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