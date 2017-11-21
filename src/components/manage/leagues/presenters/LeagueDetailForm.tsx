import * as React from 'react';
import { Component, CSSProperties } from 'react';
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
}

export default class LeagueDetailForm extends Component<LeagueDetailFormProps & LeagueDetailFormActions> {

    static getForm(isEdit: boolean, toggleEdit: () => void, league?: League) {
        if (!league) {
            return <div>I can't find the league you requested!</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="name"
                        label="Name"
                        value={league.attributes.name}
                    />
                    <EditSaveToggle isEdit={isEdit} toggleEdit={toggleEdit}/>
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
        const {currentView, league, toggleCurrentViewEdit} = this.props;
        return (
            <FetchableAsset isFetching={isNullOrUndefined(league)}>
                {LeagueDetailForm.getForm(currentView.isEdit, toggleCurrentViewEdit, league)}
            </FetchableAsset>
        );
    }
}

function EditSaveToggle(props: { isEdit: boolean, toggleEdit: () => void }) {
    if (props.isEdit) {
        return (
            <div>
                <Button onClick={props.toggleEdit}>Cancel</Button>
                <Button>Save</Button>
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
