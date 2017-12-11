import * as React from 'react';
import { Component } from 'react';
import { List } from 'immutable';
import { Team } from '../../../../models/models';
import { TextField } from 'material-ui';

export interface TeamPickerProps {
    teams: List<Team>;
}

export interface TeamPickerActions {

}

export default class TeamPicker extends Component<TeamPickerProps & TeamPickerActions> {

    render() {
        return (
            <TextField
                id="first"
                label="First Name"
                value={'hey look a team picker'}
            />
        );
    }
}