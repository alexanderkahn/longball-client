import { connect } from 'react-redux';
import { fetchPlayer, savePlayer } from '../../../../actions/resource/rosterpositionsActions';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import {
    resetForm, updatePersonAttribute,
    updateRosterPositionAttribute,
} from '../../../../actions/form/formUpdateActions';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';

const emptyPlayer: ResourceCache<Player> = {
    fetchingState: FetchingState.FETCHED,
    object: {
        person: Person.empty(),
        rosterPosition: RosterPosition.empty()
    }
};

const getStorePlayer = function (state: RootState, teamId: string): ResourceCache<Player> {
    const rosterPosition = state.resource.rosterPositions.data.get(teamId);
    const person = !isPresent(rosterPosition) ? null
        : state.resource.people.data.get(rosterPosition.object.relationships.player.data.id);
    const statePlayer = isPresent(rosterPosition) && isPresent(person) ? {
        rosterPosition: rosterPosition.object,
        person: person.object,
    } : null;
    return toResourceCache(rosterPosition.fetchingState, statePlayer);
};

// TODO: get rid of this. Look into whether we really need to build the player for this view.
function toResourceCache<T>(fetchingState: FetchingState, object: T | null): ResourceCache<T> {
    if (fetchingState === FetchingState.FETCHED && object !== null) {
        return {
            fetchingState,
            object
        };
    } else if (fetchingState === FetchingState.FETCHED) {
        return {
            fetchingState,
            object: null
        };
    } else {
        return {
            fetchingState
        };
    }
}

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): PlayerDetailProps {
    // TODO: lordy this is ugly and bad.
    let teamId = ownProps.match.params.itemId;
    const isNew = teamId === 'add';
    return {
        storedPlayer: isNew ? emptyPlayer : getStorePlayer(state, teamId),
        formPlayer: {
            person: state.form.person.resource,
            rosterPosition: state.form.rosterPosition.resource,
        },
        isEdit: isNew,
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
            dispatch(updatePersonAttribute('first', firstName)),
        updateLastName: (lastName: string) =>
            dispatch(updatePersonAttribute('last', lastName)),
        updateJerseyNumber: (jerseyNumber: string) =>
            dispatch(updateRosterPositionAttribute('jerseyNumber', jerseyNumber)),
        updateStartDate: (startDate: string) =>
            dispatch(updateRosterPositionAttribute('startDate', startDate)),
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