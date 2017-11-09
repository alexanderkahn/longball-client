// @flow

import React, {Component} from "react";
import {TextField} from "material-ui";
import {Person, RosterPosition, CurrentView} from "../../../../models/models";
import ManagementItemDetail from "../../shared/presenters/ManagementItemDetail";

const styles = {
    root: {
        padding: 10,
    },
    input: {
        display: 'block',
    }
};

interface PlayerDetailFormProps {
    rosterPosition: RosterPosition,
    person: Person,
    currentView: CurrentView,
    resetView(): void,
    fetchItemDetail(): void
}

export default class PlayerDetailForm extends Component<PlayerDetailFormProps> {
    render() {
        const {rosterPosition, person, currentView, resetView, fetchItemDetail} = this.props;
        return (
            <ManagementItemDetail currentView={currentView} resetView={resetView} fetchItemDetail={fetchItemDetail}>
                {PlayerDetailForm.getForm(rosterPosition, person)}
            </ManagementItemDetail>
        );
    }

    static getForm(rosterPosition, person) {
        if (!rosterPosition) {
            return <div>I can't find the selected player</div>
        } else {
            return (
                <form style={styles.root}>
                    <TextField style={styles.input}
                               disabled={true}
                               id="first"
                               label="First Name"
                               value={person.attributes.first}/>
                    <TextField style={styles.input}
                               disabled={true}
                               id="last"
                               label="Last Name"
                               value={person.attributes.last}/>
                </form>
            );
        }
    }

}