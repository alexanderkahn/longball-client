import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { ViewState, FetchedState, Player } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { isNullOrUndefined, isNumber } from 'util';
import DatePicker from 'react-datepicker';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import { Moment } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TeamPickerContainer from '../containers/TeamPickerContainer';

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
            <FetchableAsset isFetching={currentView.fetchedState === FetchedState.FETCHING}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private tryFetch() {
        const {currentView, fetchItemDetail} = this.props;
        if (currentView.fetchedState === FetchedState.NOT_FETCHED) {
            fetchItemDetail();
        }
    }

    private getForm() {
        const {player, isEdit, savePlayer} = this.props;
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
                        onChange={this.onFirstNameChange}

                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="last"
                        label="Last Name"
                        value={person.attributes.last}
                        onChange={this.onLastNameChange}

                    />
                </form>
                <form style={styles.root}>
                    <div style={styles.teamSelector}>
                        <TeamPickerContainer/>
                    </div>
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="jerseyNumber"
                        label="Jersery Number"
                        type="number"
                        value={rosterPosition.attributes.jerseyNumber}
                        onChange={this.onJerseyNumberChange}

                    />
                    <span>Start Date:</span>
                    <DatePicker
                        disabled={!isEdit}
                        onChange={this.onStartDateMomentChange}
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

    // private onTeamChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (!isNullOrUndefined(this.props.player)) {
    //         this.props.player.rosterPosition.relationships.team.itemIds.id = event.target.value;
    //         this.forceUpdate();
    //     }
    // }

    private onFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.player)) {
            this.props.player.person.attributes.first = event.target.value;
            this.forceUpdate();
        }
    }

    private onLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.player)) {
            this.props.player.person.attributes.last = event.target.value;
            this.forceUpdate();
        }
    }

    private onJerseyNumberChange = (event: ChangeEvent<HTMLInputElement>) => {

        const jerseyNumber = Number(event.target.value);
        if (!isNullOrUndefined(this.props.player) && isNumber(jerseyNumber)) {
            this.props.player.rosterPosition.attributes.jerseyNumber = jerseyNumber;
            this.forceUpdate();
        }
    }

    private onStartDateMomentChange = (date: Moment | null) => {
        if (date && this.props.player) {
            this.props.player.rosterPosition.attributes.startDate = date.format('YYYY-MM-DD');
            this.forceUpdate();
        }
    }

}