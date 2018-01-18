import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import FetchableAsset from '../../shared/presenters/FetchableAsset';
import { SaveDetailFooter } from '../../shared/presenters/SaveDetailFooter';
import { FetchingState, isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { League } from '../../../../reducers/resource/league';

const styles: CSSProperties = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

export interface LeagueDetailProps {
    storedLeague: ResourceCache<string, League>;
    formLeague: League;
    isEdit: boolean;
}

export interface LeagueDetailFormActions {
    resetFormItem: (league: League) => void;
    fetchItem: () => void;
    updateName: (name: string) => void;
    saveLeague: (league: League) => void;
}

export default class LeagueDetailForm extends Component<LeagueDetailProps & LeagueDetailFormActions> {

    componentWillMount() {
        this.updateForm();
    }

    componentDidUpdate() {
        this.updateForm();
    }

    render() {
        const {storedLeague} = this.props;
        return (
            <FetchableAsset fetchingState={storedLeague.fetchingState}>
                {this.getForm()}
            </FetchableAsset>
        );
    }

    private updateForm() {
        const {storedLeague, formLeague, fetchItem, resetFormItem} = this.props;
        if (storedLeague.fetchingState === FetchingState.NOT_FETCHED) {
            fetchItem();
        } else if (isPresent<string, League>(storedLeague) && storedLeague.object.id !== formLeague.id) {
            resetFormItem(storedLeague.object);
        }
    }

    private getForm() {
        const {isEdit, updateName, saveLeague, formLeague, storedLeague} = this.props;
        if (!isPresent(storedLeague)) {
            return <div>I can't find the league you requested!</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={!isEdit}
                        id="name"
                        label="Name"
                        value={formLeague.attributes.name}
                        onChange={event => updateName(event.target.value)}
                    />
                    <SaveDetailFooter
                        isEdit={isEdit}
                        onSave={() => saveLeague(formLeague)}
                    />
                </form>
            );
        }
    }

}
