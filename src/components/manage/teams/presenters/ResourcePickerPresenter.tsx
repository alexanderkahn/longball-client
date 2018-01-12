import * as React from 'react';
import { Component } from 'react';
import { ViewState, FetchingState, ResourceObject } from '../../../../models/models';
import { MenuItem, TextField } from 'material-ui';
import Downshift from 'downshift';
import Paper from 'material-ui/Paper';

export interface ResourcePickerProps<T extends ResourceObject> {
    matchingResources: Array<T>;
    selectedResourceId: string;
    inputDisplayValue: string;
    inputDisplayPlaceholder: string;
    currentView: ViewState;
    isEdit: boolean;
}

export interface ResourcePickerActions<T extends ResourceObject> {
    getResourceDisplay: (display: T | string | null) => string;
    fetchSuggestions: (searchTerm: string) => void;
    onChangeDisplay: (value: string) => void;
    onSelectResource: (resourceId: string) => void;
}

export default class ResourcePickerPresenter<T extends ResourceObject>
    extends Component<ResourcePickerProps<T> & ResourcePickerActions<T>> {

    componentWillMount() {
        this.tryFetch();
    }

    componentDidUpdate() {
        this.tryFetch();
    }

    render() {
        return (
            <Downshift
                inputValue={this.props.inputDisplayValue}
                selectedItem={this.props.matchingResources.find(it => it.id === this.props.selectedResourceId)}
                itemToString={this.props.getResourceDisplay}
                onInputValueChange={(value: string) => this.props.onChangeDisplay(value)}
                onChange={(selection: T) => this.props.onSelectResource(selection.id)}
                render={({isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: this.props.inputDisplayPlaceholder}))}
                        {isOpen ? this.renderSuggestionsContainer(
                            this.props.matchingResources.map((resource: T) =>
                                this.renderSuggestion(resource, getItemProps({item: resource}))
                            )
                        ) : null}
                    </div>
                )}
            />
        );
    }

    private tryFetch() {
        const {currentView, fetchSuggestions, inputDisplayValue} = this.props;
        if (currentView.fetchedState === FetchingState.NOT_FETCHED) {
            fetchSuggestions(inputDisplayValue);
        }
    }

    private renderInput(props: { value?: string, ref: string, onChange: () => void }) {
        return (
            <TextField
                disabled={!this.props.isEdit}
                value={props.value || ''}
                inputRef={props.ref}
                onChange={props.onChange}
                id={this.props.inputDisplayPlaceholder.toLowerCase()}
                label={this.props.inputDisplayPlaceholder}
                autoComplete="off"
            />
        );
    }

    private renderSuggestion(resource: T, itemProps: {}): JSX.Element {
        return (
            <MenuItem {...itemProps} key={resource.id} component="div">
                {this.props.getResourceDisplay(resource)}
            </MenuItem>
        );
    }

    private renderSuggestionsContainer(children: Array<JSX.Element>) {
        return (
            <Paper>
                {children}
            </Paper>
        );
    }
}
