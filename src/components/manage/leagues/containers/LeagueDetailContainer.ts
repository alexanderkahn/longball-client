import { connect, Dispatch } from 'react-redux';
import { fetchLeagueDetail, saveLeague } from '../../../../actions/resource/leaguesActions';
import LeagueDetailForm, { LeagueDetailFormActions, LeagueDetailProps } from '../presenters/LeagueDetailForm';
import { RootState } from '../../../../reducers';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { League } from '../../../../models/models';
import { resetForm, updateLeagueAttribute } from '../../../../actions/form/formUpdateActions';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): LeagueDetailProps => {
    const leagueId = ownProps.match.params.itemId;
    return {
        formLeague: state.form.league.resource,
        storedLeague: state.resource.leagues.data.get(leagueId),
        isEdit: (leagueId === 'add'),
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