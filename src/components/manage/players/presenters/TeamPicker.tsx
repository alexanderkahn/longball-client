import * as React from 'react';
import { Component } from 'react';
import { List } from 'immutable';
import { Team } from '../../../../models/models';
import { MenuItem, TextField } from 'material-ui';
import Downshift from 'downshift';
import Paper from 'material-ui/Paper';

export interface TeamPickerProps {
    teams: List<Team>;
}

export interface TeamPickerActions {

}

export default class TeamPicker extends Component<TeamPickerProps & TeamPickerActions> {
    render() {
        return (
            <Downshift
                itemToString={this.getItemDisplay}
                render={({inputValue, isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: 'Teams'}))}
                        {isOpen
                            ? this.renderSuggestionsContainer(
                            this.getSuggestions(inputValue).map((team: Team) =>
                                this.renderSuggestion(team, getItemProps({item: team}))
                            )
                        ) : null}
                    </div>
                )}
            />
        );
    }

    renderInput(props: any) {
        return (
            <TextField
                value={props.value || ''}
                inputRef={props.ref}
                onChange={props.onChange}
                id="team"
                label="Team"
            />
        );
    }

    renderSuggestion(team: Team, itemProps: any): JSX.Element {
        return (
            <MenuItem {...itemProps} key={team.id} component="div">
                {this.getItemDisplay(team)}
            </MenuItem>
        );
    }

    renderSuggestionsContainer(children: Array<JSX.Element>) {
        return (
            <Paper
                id="team-picker"
            >
                {children}
            </Paper>
        );
    }

    getSuggestions(inputValue: string | null): Array<Team> {
        // TODO: filter back down to first 5 matches
        return this.props.teams.filter(team => {
            if (!inputValue || !team) {
                return false;
            }
            return (!inputValue || this.getItemDisplay(team).toLowerCase().includes(inputValue.toLowerCase()));
        }).toArray();
    }

    getItemDisplay(obj: any): string {
        if (!obj) {
            return '';
        } else if (!obj.attributes) {
            return String(obj);
        } else {
            return `${obj.attributes.location} ${obj.attributes.nickname}`;
        }
    }
}