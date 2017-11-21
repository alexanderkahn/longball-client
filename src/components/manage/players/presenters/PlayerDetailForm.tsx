import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { Person, RosterPosition, CurrentView } from '../../../../models/models';
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

export interface PlayerDetailFormProps {
    rosterPosition: RosterPosition | null;
    person: Person | null;
    currentView: CurrentView;
}

export interface PlayerDetailFormActions {
    resetView: () => void;
    fetchItemDetail: () => void;
}

export default class PlayerDetailForm extends Component<PlayerDetailFormProps & PlayerDetailFormActions> {
    static getForm(rosterPosition: RosterPosition | null, person: Person | null) {
        if (!rosterPosition || !person) {
            return <div>I can't find the selected player</div>;
        } else {
            return (
                <form style={styles.root}>
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="first"
                        label="First Name"
                        value={person.attributes.first}
                    />
                    <TextField
                        style={styles.input}
                        disabled={true}
                        id="last"
                        label="Last Name"
                        value={person.attributes.last}
                    />
                </form>
            );
        }
    }

    componentDidMount() {
        this.props.resetView();
    }

    componentDidUpdate() {
        const {currentView, person, rosterPosition, fetchItemDetail} = this.props;
        if (!currentView.isFetching
            && !currentView.lastUpdated
            && (isNullOrUndefined(person) || isNullOrUndefined(rosterPosition))) {
            fetchItemDetail();
        }
    }

    render() {
        const {rosterPosition, person} = this.props;
        return (
            <FetchableAsset isFetching={isNullOrUndefined(person) || isNullOrUndefined(rosterPosition)}>
                {PlayerDetailForm.getForm(rosterPosition, person)}
            </FetchableAsset>
        );
    }

}