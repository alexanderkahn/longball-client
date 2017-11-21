import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { CurrentView, Team } from '../../../../models/models';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { isNullOrUndefined } from 'util';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

export interface TeamDetailFormProps {
    team?: Team;
    currentView: CurrentView;
}

export interface TeamDetailFormActions {
    resetView: () => void;
    fetchItemDetail: () => void;
}

export default class TeamDetailForm extends Component<TeamDetailFormProps & TeamDetailFormActions> {
    static getForm(team?: Team) {
        if (!team) {
            return <div>I can't find the requested team</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="abbreviation"
                        label="Abbreviation"
                        value={team.attributes.abbreviation}
                    />
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="location"
                        label="Location"
                        value={team.attributes.location}
                    />
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="nickname"
                        label="Nickname"
                        value={team.attributes.nickname}
                    />
                </form>
            );
        }
    }

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
                {TeamDetailForm.getForm(team)}
            </FetchableAsset>
        );
    }
}
