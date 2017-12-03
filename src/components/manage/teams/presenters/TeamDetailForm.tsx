import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { CurrentView, Team } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { isNullOrUndefined } from 'util';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    leagueSelector: {
        paddingBottom: 30,
    }
};

export interface TeamDetailProps {
    team: Team | null;
    isEdit: boolean;
    currentView: CurrentView;
}

export interface TeamDetailFormActions {
    resetView: () => void;
    fetchItemDetail: () => void;
    saveTeam: (team: Team) => void;
}

export default class TeamDetailForm extends Component<TeamDetailProps & TeamDetailFormActions> {

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const {currentView, team, fetchItemDetail} = this.props;
        if (!currentView.isFetching && !currentView.lastUpdated && isNullOrUndefined(team)) {
            fetchItemDetail();
        }
    }

    render() {
        const {team} = this.props;
        return (
            <FetchableAsset isFetching={isNullOrUndefined(team)}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    getForm() {
        const {team, isEdit, saveTeam} = this.props;
        if (!team) {
            return <div>I can't find the requested team</div>;
        } else {
            return (
                <form style={styles.root}>
                    <div style={styles.leagueSelector}>
                        {/*<span>League: {team.relationships.league.data.id} </span>*/}
                        {/*<Button disabled={true} dense={true}>Change selection</Button>*/}
                        <TextField
                            fullWidth={true}
                            disabled={!isEdit}
                            id="league"
                            label="League"
                            value={team.relationships.league.data.id}
                            onChange={this.onLeagueChange}
                        />
                    </div>
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="abbreviation"
                        label="Abbreviation"
                        value={team.attributes.abbreviation}
                        onChange={this.onAbbreviationChange}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="location"
                        label="Location"
                        value={team.attributes.location}
                        onChange={this.onLocationChange}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="nickname"
                        label="Nickname"
                        value={team.attributes.nickname}
                        onChange={this.onNicknameChange}
                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => saveTeam(team)}
                    />
                </form>
            );
        }
    }

    onLeagueChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.team)) {
            this.props.team.relationships.league.data.id = event.target.value;
            this.forceUpdate();
        }
    }

    onAbbreviationChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.team)) {
            this.props.team.attributes.abbreviation = event.target.value;
            this.forceUpdate();
        }
    }

    onLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.team)) {
            this.props.team.attributes.location = event.target.value;
            this.forceUpdate();
        }
    }

    onNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.team)) {
            this.props.team.attributes.nickname = event.target.value;
            this.forceUpdate();
        }
    }
}
