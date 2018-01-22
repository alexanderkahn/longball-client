import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import DatePicker from 'react-datepicker';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import 'react-datepicker/dist/react-datepicker.css';
import TeamPicker from '../containers/TeamPicker';
import { FetchingState, isAbsent, isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    teamSelector: {
        paddingBottom: 30,
    },
    playerInfo: {
        paddingBottom: 30,
    }
};

export interface PlayerDetailProps {
    formPerson: Person;
    formRosterPosition: RosterPosition;
    storedPerson: ResourceCache<string, Person>;
    storedRosterPosition: ResourceCache<string, RosterPosition>;
    isEdit: boolean;
}

export interface PlayerDetailFormActions {
    fetchItem: (rosterPositionId: string) => void;
    resetFormItem: (person: Person, rosterPosition: RosterPosition) => void;
    updateFirstName: (name: string) => void;
    updateLastName: (name: string) => void;
    updateJerseyNumber: (jerseyNumber: string) => void;
    updateStartDate: (startDate: string) => void;
    savePlayer: (person: Person, rosterPosition: RosterPosition) => void;
}

export default class PlayerDetailForm extends Component<PlayerDetailProps & PlayerDetailFormActions> {

    componentWillMount() {
        this.updateForm();
    }

    componentDidUpdate() {
        this.updateForm();
    }

    render() {
        const {storedRosterPosition} = this.props;
        return (
            <FetchableAsset fetchingState={storedRosterPosition.fetchingState}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private updateForm() {
        const {
            storedPerson, storedRosterPosition, formPerson, formRosterPosition, fetchItem, resetFormItem
        } = this.props;
        if (storedPerson.fetchingState === FetchingState.NOT_FETCHED
            || storedRosterPosition.fetchingState === FetchingState.NOT_FETCHED) {
            fetchItem(storedRosterPosition.id);
        } else if (isPresent(storedPerson) && isPresent(storedRosterPosition) && (
            storedRosterPosition.object.id !== formRosterPosition.id ||
            storedPerson.object.id !== formPerson.id)
        ) {
            resetFormItem(storedPerson.object, storedRosterPosition.object);
        }
    }

    private getForm() {
        const {
            storedPerson, storedRosterPosition,
            formPerson, formRosterPosition, isEdit,
            savePlayer, updateFirstName, updateLastName, updateJerseyNumber, updateStartDate
        } = this.props;
        if (isAbsent(storedPerson) || isAbsent(storedRosterPosition)) {
            return <div>I can't find the selected player</div>;
        } else {
            return (
                <div>
                    <form style={styles.root}>
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="first"
                            label="First Name"
                            value={formPerson.attributes.first}
                            onChange={event => updateFirstName(event.target.value)}

                        />
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="last"
                            label="Last Name"
                            value={formPerson.attributes.last}
                            onChange={event => updateLastName(event.target.value)}

                        />
                    </form>
                    <form style={styles.root}>
                        <div style={styles.teamSelector}>
                            <TeamPicker isEdit={isEdit}/>
                        </div>
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="jerseyNumber"
                            label="Jersery Number"
                            type="number"
                            value={formRosterPosition.attributes.jerseyNumber}
                            onChange={event => updateJerseyNumber(event.target.value)}

                        />
                        <span>Start Date:</span>
                        <DatePicker
                            disabled={!isEdit}
                            onChange={event => event && updateStartDate(event.format('YYYY-MM-DD'))}
                            value={formRosterPosition.attributes.startDate}
                            id="startDate"
                            dateFormat={'YYYY-MM-DD'}
                        />
                        <SaveDetailFooter
                            isEdit={isEdit}
                            onSave={() => savePlayer(formPerson, formRosterPosition)}
                        />
                    </form>
                </div>
            );
        }
    }
}