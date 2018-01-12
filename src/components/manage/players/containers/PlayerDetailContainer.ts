import { connect } from 'react-redux';
import { fetchPlayerDetail, savePlayer } from '../../../../actions/resource/rosterpositionsActions';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { FetchingState, Player } from '../../../../models/models';
import { isNullOrUndefined } from 'util';
import { updatePersonAttribute, updateRosterPositionAttribute, } from '../../../../actions/form/formUpdateActions';

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): PlayerDetailProps {
    // TODO: lordy this is ugly and bad.
    let teamId = ownProps.match.params.itemId;
    if (teamId === 'add') {
        return {
            player: {
                person: state.form.person.resource,
                rosterPosition: state.form.rosterPosition.resource,
            },
            isEdit: true,
            currentView: {
                fetchedState: FetchingState.FETCHED
            }
        };
    } else {
        // TODO: maybe this should return an unfetched thing if not found
        const rosterPositionCache = state.resource.rosterPositions.data.get(teamId);
        const rosterPosition = rosterPositionCache ? rosterPositionCache.object : null;
        const person = !rosterPosition ? null
            : state.resource.people.data.get(rosterPosition.relationships.player.data.id).object;
        return {
            player: isNullOrUndefined(rosterPosition) || isNullOrUndefined(person) ? null : {rosterPosition, person},
            isEdit: false,
            currentView: {
                fetchedState: rosterPositionCache ? rosterPositionCache.fetchingState : FetchingState.NOT_FETCHED
            }
        };
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : PlayerDetailFormActions => {
    const playerId = ownProps.match.params.itemId;
    return {
        fetchItemDetail: function () {
            dispatch(fetchPlayerDetail(playerId));
        },
        updateFirstName: (firstName: string) =>
            dispatch(updatePersonAttribute('first', firstName)),
        updateLastName: (lastName: string) =>
            dispatch(updatePersonAttribute('last', lastName)),
        updateJerseyNumber: (jerseyNumber: string) =>
            dispatch(updateRosterPositionAttribute('jerseyNumber', jerseyNumber)),
        updateStartDate: (startDate: string) =>
            dispatch(updateRosterPositionAttribute('startDate', startDate)),
        savePlayer: function(player: Player) {
            dispatch(savePlayer(player));
        }
    };
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetailForm);

export default PlayerDetailContainer;