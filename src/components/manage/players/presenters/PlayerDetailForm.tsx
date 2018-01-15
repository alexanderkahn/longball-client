import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import DatePicker from 'react-datepicker';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import 'react-datepicker/dist/react-datepicker.css';
import TeamPicker from '../containers/TeamPicker';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource';
import { Player } from '../../../../reducers/resource/rosterPosition';

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
    formPlayer: Player;
    storedPlayer: ResourceCache<string, Player>;
    isEdit: boolean;
}

export interface PlayerDetailFormActions {
    fetchItem: () => void;
    resetFormItem: (player: Player) => void;
    updateFirstName: (name: string) => void;
    updateLastName: (name: string) => void;
    updateJerseyNumber: (jerseyNumber: string) => void;
    updateStartDate: (startDate: string) => void;
    savePlayer: (player: Player) => void;
}

export default class PlayerDetailForm extends Component<PlayerDetailProps & PlayerDetailFormActions> {

    componentWillMount() {
        this.updateForm();
    }

    componentDidUpdate() {
        this.updateForm();
    }

    render() {
        const {storedPlayer} = this.props;
        return (
            <FetchableAsset fetchingState={storedPlayer.fetchingState}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private updateForm() {
        const {storedPlayer, formPlayer, fetchItem, resetFormItem} = this.props;
        if (storedPlayer.fetchingState === FetchingState.NOT_FETCHED) {
            fetchItem();
        } else if (isPresent<string, Player>(storedPlayer) && (
            storedPlayer.object.rosterPosition.id !== formPlayer.rosterPosition.id ||
            storedPlayer.object.person.id !== formPlayer.person.id)
        ) {
            resetFormItem(storedPlayer.object);
        }
    }

    private getForm() {
        const {
            formPlayer,
            isEdit,
            savePlayer,
            updateFirstName,
            updateLastName,
            updateJerseyNumber,
            updateStartDate
        } = this.props;
        if (!formPlayer) {
            return <div>I can't find the selected player</div>;
        } else {
            const {person, rosterPosition} = formPlayer;
            return (
                <div>
                    <form style={styles.root}>
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="first"
                            label="First Name"
                            value={person.attributes.first}
                            onChange={event => updateFirstName(event.target.value)}

                        />
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="last"
                            label="Last Name"
                            value={person.attributes.last}
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
                            value={rosterPosition.attributes.jerseyNumber}
                            onChange={event => updateJerseyNumber(event.target.value)}

                        />
                        <span>Start Date:</span>
                        <DatePicker
                            disabled={!isEdit}
                            onChange={event => event && updateStartDate(event.format('YYYY-MM-DD'))}
                            value={rosterPosition.attributes.startDate}
                            id="startDate"
                            dateFormat={'YYYY-MM-DD'}
                        />
                        <SaveDetailFooter
                            isEdit={isEdit}
                            onSave={() => savePlayer(formPlayer)}
                        />
                    </form>
                </div>
            );
        }
    }
}