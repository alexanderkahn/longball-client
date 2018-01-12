import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { ViewState, FetchingState, Team } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import LeaguePicker from '../containers/LeaguePicker';

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
    currentView: ViewState;
}

export interface TeamDetailFormActions {
    fetchItemDetail: () => void;
    updateAbbreviation: (abbreviation: string) => void;
    updateLocation: (location: string) => void;
    updateNickname: (nickname: string) => void;
    saveTeam: (team: Team) => void;
}

export default class TeamDetailForm extends Component<TeamDetailProps & TeamDetailFormActions> {

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
            team,
            isEdit,
            updateAbbreviation,
            updateLocation,
            updateNickname,
            saveTeam
        } = this.props;
        if (!team) {
            return <div>I can't find the requested team</div>;
        } else {
            return (
                <form style={styles.root}>
                    <LeaguePicker isEdit={isEdit}/>
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="abbreviation"
                        label="Abbreviation"
                        value={team.attributes.abbreviation}
                        onChange={event => updateAbbreviation(event.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="location"
                        label="Location"
                        value={team.attributes.location}
                        onChange={event => updateLocation(event.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="nickname"
                        label="Nickname"
                        value={team.attributes.nickname}
                        onChange={event => updateNickname(event.target.value)}
                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => saveTeam(team)}
                    />
                </form>
            );
        }
    }
}
