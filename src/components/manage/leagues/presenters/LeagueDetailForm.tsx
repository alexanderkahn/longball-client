import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { CurrentView, League } from '../../../../models/models';
import { isNullOrUndefined } from 'util';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';

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
    isEdit: boolean;
    currentView: CurrentView;
}

export interface LeagueDetailFormActions {
    resetView: () => void;
    fetchItemDetail: () => void;
    saveLeague: (league: League) => void;
}

export default class LeagueDetailForm extends Component<LeagueDetailFormProps & LeagueDetailFormActions> {

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

    getForm() {
        const {isEdit, saveLeague, league} = this.props;
        if (!league) {
            return <div>I can't find the league you requested!</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={!isEdit}
                        id="name"
                        label="Name"
                        value={league.attributes.name}
                        onChange={this.onNameChange}
                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => saveLeague(league)}
                    />
                </form>
            );
        }
    }

    onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.league)) {
            this.props.league.attributes.name = event.target.value;
            this.forceUpdate();
        }
    }

}
