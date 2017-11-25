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
    leagueSelector: {
        paddingBottom: 30,
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
        const {team} = this.props;
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
                            disabled={true}
                            id="league"
                            label="League"
                            value={team.relationships.league.data.id}
                        />
                    </div>
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        id="abbreviation"
                        label="Abbreviation"
                        value={team.attributes.abbreviation}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        id="location"
                        label="Location"
                        value={team.attributes.location}
                    />
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        id="nickname"
                        label="Nickname"
                        value={team.attributes.nickname}
                    />
                </form>
            );
        }
    }
}
