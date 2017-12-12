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

interface Suggestion {
    label: string;
}

const suggestions: Array<Suggestion> = [
    {label: 'Hello'},
    {label: 'Hiya'},
    {label: 'Hey'}
];

export default class TeamPicker extends Component<TeamPickerProps & TeamPickerActions> {
    render() {
        return (
            <Downshift
                render={({inputValue, isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: 'Teams'}))}
                        {isOpen
                            ? this.renderSuggestionsContainer(
                            this.getSuggestions(inputValue).map((suggestion: Suggestion) =>
                                this.renderSuggestion(suggestion, getItemProps({item: suggestion.label}))
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

    renderSuggestion(suggestion: Suggestion, itemProps: any): JSX.Element {
        return (
            <MenuItem {...itemProps} key={suggestion.label} component="div">
                {suggestion.label}
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

    getSuggestions(inputValue: string | null): Array<Suggestion> {
        let count = 0;

        return suggestions.filter(suggestion => {
            const keep =
                (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
                count < 5;

            if (keep) {
                count += 1;
            }

            return keep;
        });
    }
}