import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import LeaguePicker from '../containers/LeaguePicker';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource';
import { Team } from '../../../../reducers/resource/team';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    leagueSelector: {
        paddingBottom: 30,
    }
};

export interface TeamDetailProps {
    storedTeam: ResourceCache<string, Team>;
    formTeam: Team;
    isEdit: boolean;
}

export interface TeamDetailFormActions {
    resetFormItem: (team: Team) => void;
    fetchItem: () => void;
    updateAbbreviation: (abbreviation: string) => void;
    updateLocation: (location: string) => void;
    updateNickname: (nickname: string) => void;
    saveTeam: (team: Team) => void;
}

export default class TeamDetailForm extends Component<TeamDetailProps & TeamDetailFormActions> {

    componentWillMount() {
        this.updateForm();
    }

    componentDidUpdate() {
        this.updateForm();
    }

    render() {
        const {storedTeam} = this.props;
        return (
            <FetchableAsset fetchingState={storedTeam.fetchingState}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private updateForm() {
        const {storedTeam, formTeam, fetchItem, resetFormItem} = this.props;
        if (storedTeam.fetchingState === FetchingState.NOT_FETCHED) {
            fetchItem();
        } else if (isPresent<string, Team>(storedTeam) && storedTeam.object.id !== formTeam.id) {
            resetFormItem(storedTeam.object);
        }
    }

    private getForm() {
        const {
            formTeam,
            isEdit,
            updateAbbreviation,
            updateLocation,
            updateNickname,
            saveTeam
        } = this.props;
        if (!formTeam) {
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
                        value={formTeam.attributes.abbreviation}
                        onChange={event => updateAbbreviation(event.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="location"
                        label="Location"
                        value={formTeam.attributes.location}
                        onChange={event => updateLocation(event.target.value)}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={!isEdit}
                        id="nickname"
                        label="Nickname"
                        value={formTeam.attributes.nickname}
                        onChange={event => updateNickname(event.target.value)}
                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => saveTeam(formTeam)}
                    />
                </form>
            );
        }
    }
}
