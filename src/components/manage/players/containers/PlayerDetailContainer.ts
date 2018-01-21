import { connect } from 'react-redux';
import { fetchRosterPositionIncludePerson, saveRosterPosition } from '../../../../actions/resource/rosterpositionsActions';
import PlayerDetailForm, { PlayerDetailFormActions, PlayerDetailProps } from '../presenters/PlayerDetailForm';
import { Dispatch } from 'redux';
import { RootState } from '../../../../reducers/rootReducer';
import { ManageItemRouteProps } from '../../shared/presenters/ManagementViewRouter';
import { RouteComponentProps } from 'react-router';
import { resetForm, updateFormAttribute, } from '../../../../actions/form/formUpdateActions';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';
import { savePerson } from '../../../../actions/resource/peopleActions';
import { isPresent } from '../../../../reducers/resource/cache';

function mapStateToProps(state: RootState, ownProps: RouteComponentProps<ManageItemRouteProps>): PlayerDetailProps {
    let rosterPositionId = ownProps.match.params.itemId;
    const storedRosterPosition = state.resource.rosterPositions.data.get(rosterPositionId);
    const personId = isPresent(storedRosterPosition) ? storedRosterPosition.object.relationships.player.data.id : '';
    return {
        storedPerson: state.resource.people.data.get(personId),
        storedRosterPosition: storedRosterPosition,
        formPerson: state.form.person.resource,
        formRosterPosition: state.form.rosterPosition.resource,
        isEdit: state.form.person.isEdit,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>)
    : PlayerDetailFormActions => {
    return {
        fetchItem: function (rosterPositionId: string) {
            dispatch(fetchRosterPositionIncludePerson(rosterPositionId));
        },
        resetFormItem: (person, rosterPosition) => {
            dispatch(resetForm('people', person));
            dispatch(resetForm('rosterpositions', rosterPosition));
        },
        updateFirstName: (firstName: string) =>
            dispatch(updateFormAttribute('people', 'first', firstName)),
        updateLastName: (lastName: string) =>
            dispatch(updateFormAttribute('people', 'last', lastName)),
        updateJerseyNumber: (jerseyNumber: string) =>
            dispatch(updateFormAttribute('rosterpositions', 'jerseyNumber', jerseyNumber)),
        updateStartDate: (startDate: string) =>
            dispatch(updateFormAttribute('rosterpositions', 'startDate', startDate)),
        savePlayer: async function (person: Person, rosterPosition: RosterPosition) {
            rosterPosition.relationships.player.data.id = await dispatch(savePerson(person));
            dispatch(saveRosterPosition(rosterPosition));
        }
    };
};

const PlayerDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerDetailForm);

export default PlayerDetailContainer;