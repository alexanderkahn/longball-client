import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { CurrentView, FetchedState, Player } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { isNullOrUndefined, isNumber } from 'util';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';

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
    currentView: CurrentView;
}

export interface PlayerDetailFormActions {
    fetchItemDetail: () => void;
    savePlayer: (player: Player) => void;
}

export default class PlayerDetailForm extends Component<PlayerDetailProps & PlayerDetailFormActions> {

    componentWillMount() {
        this.tryFetch();
    }

    componentWillUpdate() {
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
            return (
                <form style={styles.root}>
                    <div style={styles.teamSelector}>
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="team"
                            label="Team"
                            value={player.rosterPosition.relationships.team.data.id}
                            onChange={this.onTeamChange}
                        />
                    </div>
                    <div style={styles.playerInfo}>
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="first"
                            label="First Name"
                            value={player.person.attributes.first}
                            onChange={this.onFirstNameChange}

                        />
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="last"
                            label="Last Name"
                            value={player.person.attributes.last}
                            onChange={this.onLastNameChange}

                        />
                    </div>
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="jerseyNumber"
                        label="Jersery Number"
                        type="number"
                        value={player.rosterPosition.attributes.jerseyNumber}
                        onChange={this.onJerseyNumberChange}

                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="startDate"
                        label="Start Date"
                        value={player.rosterPosition.attributes.startDate}
                        onChange={this.onStartDateChange}

                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => savePlayer(player)}
                    />
                </form>
            );
        }
    }

    private onTeamChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.player)) {
            this.props.player.rosterPosition.relationships.team.data.id = event.target.value;
            this.forceUpdate();
        }
    }

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

    private onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.player)) {
            this.props.player.rosterPosition.attributes.startDate = event.target.value;
            this.forceUpdate();
        }
    }

}