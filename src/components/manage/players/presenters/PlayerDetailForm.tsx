import * as React from 'react';
import { Component, CSSProperties } from 'react';
import { TextField } from 'material-ui';
import { Person, RosterPosition, CurrentView } from '../../../../models/models';
import ManagementItemDetail from '../../shared/presenters/ManagementItemDetail';

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

    render() {
        const {rosterPosition, person, currentView, resetView, fetchItemDetail} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {PlayerDetailForm.getForm(rosterPosition, person)}
            </ManagementItemDetail>
        );
    }

}