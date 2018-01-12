import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { ViewState, FetchingState, Player } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import DatePicker from 'react-datepicker';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import 'react-datepicker/dist/react-datepicker.css';
import TeamPicker from '../containers/TeamPicker';

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
    player: Player | null;
    isEdit: boolean;
    currentView: ViewState;
}

export interface PlayerDetailFormActions {
    fetchItemDetail: () => void;
    updateFirstName: (name: string) => void;
    updateLastName: (name: string) => void;
    updateJerseyNumber: (jerseyNumber: string) => void;
    updateStartDate: (startDate: string) => void;
    savePlayer: (player: Player) => void;
}

export default class PlayerDetailForm extends Component<PlayerDetailProps & PlayerDetailFormActions> {

    componentWillMount() {
        this.tryFetch();
    }

    componentDidUpdate() {
        this.tryFetch();
    }

    render() {
        const {currentView} = this.props;
        return (
            <FetchableAsset fetchingState={currentView.fetchedState}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private tryFetch() {
        const {currentView, fetchItemDetail} = this.props;
        if (currentView.fetchedState === FetchingState.NOT_FETCHED) {
            fetchItemDetail();
        }
    }

    private getForm() {
        const {
            player,
            isEdit,
            savePlayer,
            updateFirstName,
            updateLastName,
            updateJerseyNumber,
            updateStartDate
        } = this.props;
        if (!player) {
            return <div>I can't find the selected player</div>;
        } else {
            const {person, rosterPosition} = player;
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
                            onSave={() => savePlayer(player)}
                        />
                    </form>
                </div>
            );
        }
    }
}