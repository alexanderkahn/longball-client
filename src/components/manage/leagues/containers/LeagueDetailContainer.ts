import { connect, Dispatch } from 'react-redux';
import { fetchLeague, saveLeague } from '../../../../actions/resource/leaguesActions';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers/rootReducer';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { resetForm, updateFormAttribute } from '../../../../actions/form/formUpdateActions';
import { League } from '../../../../reducers/resource/league';
import { redirectToManagementRoute } from '../../../../actions/routeActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    return {
        formLeague: state.form.league.resource,
        storedLeague: state.resource.leagues.data.get(leagueId),
        isEdit: state.form.league.isEdit,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : LeagueDetailFormActions => {
    const leagueId = ownProps.match.params.itemId;
    return {
        fetchItem: () => dispatch(fetchLeague(leagueId)),
        resetFormItem: (league: League) => dispatch(resetForm('leagues', league)),
        updateName: (name: string) => dispatch(updateFormAttribute('leagues', 'name', name)),
        saveLeague: async (league: League) => {
            const savedId = await dispatch(saveLeague(league));
            dispatch(redirectToManagementRoute('leagues', savedId));
        }
    };
};

const LeagueDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeagueDetailForm);

export default LeagueDetailContainer;