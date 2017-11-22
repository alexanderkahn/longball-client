import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { Button, TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { CurrentView, League } from '../../../../models/models';
import { isNullOrUndefined } from 'util';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

export interface LeagueDetailFormProps {
    league?: League;
    currentView: CurrentView;
}

export interface LeagueDetailFormActions {
    resetView: () => void;
    fetchItemDetail: () => void;
    toggleCurrentViewEdit: () => void;
    saveLeague: (league: League) => void;
}

export default class LeagueDetailForm extends Component<LeagueDetailFormProps & LeagueDetailFormActions> {

    onLeagueNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isNullOrUndefined(this.props.league)) {
            return;
        }

        this.props.league.attributes.name = event.target.value;
        this.forceUpdate();
    }

    getForm() {
        const {currentView, toggleCurrentViewEdit, saveLeague, league} = this.props;
        if (!league) {
            return <div>I can't find the league you requested!</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={!currentView.isEdit}
                        id="name"
                        label="Name"
                        value={league.attributes.name}
                        onChange={this.onLeagueNameChange}
                    />
                    <EditSaveToggle
                        isEdit={currentView.isEdit}
                        toggleEdit={toggleCurrentViewEdit}
                        onSave={() => saveLeague(league)}
                    />
                </form>
            );
        }
    }

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const {currentView, league, fetchItemDetail} = this.props;
        if (!currentView.isFetching && !currentView.lastUpdated && isNullOrUndefined(league)) {
            fetchItemDetail();
        }
    }

    render() {
        return (
            <FetchableAsset isFetching={isNullOrUndefined(this.props.league)}>
                {this.getForm()}
            </FetchableAsset>
        );
    }
}

function EditSaveToggle(props: { isEdit: boolean, toggleEdit: () => void, onSave: () => void }) {
    if (props.isEdit) {
        return (
            <div>
                <Button onClick={props.toggleEdit}>Cancel</Button>
                <Button onClick={props.onSave}>Save</Button>
            </div>
        );
    } else {
        return (
            <div>
                <Button onClick={props.toggleEdit}>Edit</Button>
            </div>
        );
    }
}
