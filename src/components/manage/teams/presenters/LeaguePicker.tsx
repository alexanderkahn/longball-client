import * as React from 'react';
import { Component } from 'react';
import { League } from '../../../../models/models';
import { MenuItem, TextField } from 'material-ui';
import Downshift from 'downshift';
import Paper from 'material-ui/Paper';

export interface LeaguePickerProps {
    leagues: Array<League>;
    selectedLeagueId: string;
    leaguePickerDisplay: string;
}

export interface LeaguePickerActions {
    onChangeDisplay: (value: string) => void;
    onSelectItem: (leagueId: string) => void;
}

export default class LeaguePicker extends Component<LeaguePickerProps & LeaguePickerActions> {
    render() {
        return (
            <Downshift
                inputValue={this.props.leaguePickerDisplay}
                selectedItem={this.props.leagues.find(it => it.id === this.props.selectedLeagueId)}
                itemToString={this.getItemDisplay}
                onInputValueChange={(value: string) => this.props.onChangeDisplay(value)}
                onChange={(selection: League) => this.props.onSelectItem(selection.id)}
                render={({inputValue, isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: 'League'}))}
                        {isOpen
                            ? this.renderSuggestionsContainer(
                                this.getSuggestions(inputValue).map((league: League) =>
                                    this.renderSuggestion(league, getItemProps({item: league}))
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
                id="league"
                label="League"
                autoComplete="off"
            />
        );
    }

    renderSuggestion(league: League, itemProps: any): JSX.Element {
        return (
            <MenuItem {...itemProps} key={league.id} component="div">
                {this.getItemDisplay(league)}
            </MenuItem>
        );
    }

    renderSuggestionsContainer(children: Array<JSX.Element>) {
        return (
            <Paper
                id="league-picker"
            >
                {children}
            </Paper>
        );
    }

    getSuggestions(inputValue: string | null): Array<League> {
        return this.props.leagues.filter(league => this.matches(inputValue, league)).slice(0, 5);
    }

    matches(searchValue: string | null, league: League) {
        if (!searchValue || !league) {
            return false;
        }
        return (!searchValue || this.getItemDisplay(league).toLowerCase().includes(searchValue.toLowerCase()));
    }

    getItemDisplay(obj: any): string {
        if (!obj || !isLeague(obj)) {
            return '';
        } else {
            return obj.attributes.name;
        }
    }
}

function isLeague(value: any): value is League {
    return value !== null && value.type === 'leagues';
}
