import { connect } from 'react-redux';
import { fetchPlayer, savePlayer } from '../../../../actions/resource/rosterpositionsActions';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers/rootReducer';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { resetForm, updateFormAttribute, } from '../../../../actions/form/formUpdateActions';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';

const getStorePlayer = function (state: RootState, rosterPositionId: string): ResourceCache<string, Player> {
    const rosterPosition = state.resource.rosterPositions.data.get(rosterPositionId);
    const person = !isPresent<string, RosterPosition>(rosterPosition) ? null
        : state.resource.people.data.get(rosterPosition.object.relationships.player.data.id);
    const statePlayer = isPresent<string, RosterPosition>(rosterPosition) && isPresent<string, Person>(person) ? {
        rosterPosition: rosterPosition.object,
        person: person.object,
    } : null;
    return toResourceCache(rosterPosition.fetchingState, rosterPositionId, statePlayer);
};

// TODO: get rid of this. Look into whether we really need to build the player for this view.
function toResourceCache<T>(fetchingState: FetchingState, id: string, object: T | null): ResourceCache<string, T> {
    if (fetchingState === FetchingState.FETCHED && object !== null) {
        return {
            id,
            fetchingState,
            object
        };
    } else if (fetchingState === FetchingState.FETCHED) {
        return {
            id,
            fetchingState,
            object: null
        };
    } else {
        return {
            id,
            fetchingState
        };
    }
}

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): PlayerDetailProps {
    let teamId = ownProps.match.params.itemId;
    return {
        storedPlayer: getStorePlayer(state, teamId),
        formPlayer: {
            person: state.form.person.resource,
            rosterPosition: state.form.rosterPosition.resource,
        },
        isEdit: state.form.person.isEdit,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: RouteComponentProps<ManageItemRouteProps>)
    : PlayerDetailFormActions => {
    const playerId = ownProps.match.params.itemId;
    return {
        fetchItem: function () {
            dispatch(fetchPlayer(playerId));
        },
        resetFormItem: (player: Player) => {
            dispatch(resetForm('people', player.person));
            dispatch(resetForm('rosterpositions', player.rosterPosition));
        },
        updateFirstName: (firstName: string) =>
            dispatch(updateFormAttribute('people', 'first', firstName)),
        updateLastName: (lastName: string) =>
            dispatch(updateFormAttribute('people', 'last', lastName)),
        updateJerseyNumber: (jerseyNumber: string) =>
            dispatch(updateFormAttribute('rosterpositions', 'jerseyNumber', jerseyNumber)),
        updateStartDate: (startDate: string) =>
            dispatch(updateFormAttribute('rosterpositions', 'startDate', startDate)),
        savePlayer: function (player: Player) {
            dispatch(savePlayer(player));
        }
    };
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetailForm);

export default PlayerDetailContainer;