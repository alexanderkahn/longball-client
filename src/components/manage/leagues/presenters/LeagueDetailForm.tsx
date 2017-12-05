import * as React from 'react';
import { ChangeEvent, Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { CurrentView, FetchedState, League } from '../../../../models/models';
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

export interface LeagueDetailProps {
    league: League | null;
    isEdit: boolean;
    currentView: CurrentView;
}

export interface LeagueDetailFormActions {
    fetchItemDetail: () => void;
    saveLeague: (league: League) => void;
}

export default class LeagueDetailForm extends Component<LeagueDetailProps & LeagueDetailFormActions> {

    componentWillMount() {
        this.tryFetch();
    }

    componentDidUpdate() {
        this.tryFetch();
    }

    render() {
        const { currentView } = this.props;
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

    private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(this.props.league)) {
            this.props.league.attributes.name = event.target.value;
            this.forceUpdate();
        }
    }

}
