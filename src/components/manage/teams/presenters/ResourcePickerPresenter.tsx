import * as React from 'react';
import { Component } from 'react';
import { MenuItem, TextField } from 'material-ui';
import Downshift from 'downshift';
import Paper from 'material-ui/Paper';
import { ResourceObject } from '../../../../reducers/resource';
import { PageDescriptor } from '../../../../reducers/resource/page';
import { FetchingState, isAbsent, isPresent, ResourceCache } from '../../../../reducers/resource/cache';

export interface ResourcePickerProps<T extends ResourceObject> {
    matchingResources: ResourceCache<PageDescriptor, T[]>;
    selectedResource: ResourceCache<string, T> | null;
    inputDisplayValue: string;
    inputDisplayPlaceholder: string;
    isEdit: boolean;
}

export interface ResourcePickerActions<T extends ResourceObject> {
    populateDisplayValue: (display: string) => void;
    fetchMatchingResource: (resourceId: string) => void;
    fetchSuggestions: (searchTerm: string) => void;
    parseDisplayValue: (display: T | string | null) => string;
    onChangeDisplay: (value: string) => void;
    onSelectResource: (resourceId: string) => void;
}

export default class ResourcePickerPresenter<T extends ResourceObject>
    extends Component<ResourcePickerProps<T> & ResourcePickerActions<T>> {

    componentWillMount() {
        this.updatePicker();
    }

    componentDidUpdate() {
        this.updatePicker();
    }

    render() {
        const {inputDisplayValue, inputDisplayPlaceholder, matchingResources, selectedResource, parseDisplayValue,
            onChangeDisplay, onSelectResource} = this.props;
        return (
            <Downshift
                inputValue={inputDisplayValue || ''}
                selectedItem={(isPresent(selectedResource) && isPresent<PageDescriptor, T[]>(matchingResources))
                    ? matchingResources.object.find(it => it === selectedResource.object)
                    : null
                }
                itemToString={parseDisplayValue}
                onInputValueChange={(value: string) => onChangeDisplay(value)}
                onChange={(selection: T) => onSelectResource(selection.id)}
                render={({isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: inputDisplayPlaceholder}))}
                        {isOpen && isPresent<PageDescriptor, T[]>(matchingResources)
                            ? this.renderSuggestionsContainer(matchingResources.object.map((resource: T) =>
                                this.renderSuggestion(resource, getItemProps({item: resource}))
                            )) : null}
                    </div>
                )}
            />
        );
    }

    private updatePicker() {
        const { selectedResource, fetchMatchingResource, inputDisplayValue, populateDisplayValue, parseDisplayValue,
            matchingResources, fetchSuggestions} = this.props;
        if (selectedResource && isAbsent(selectedResource) && selectedResource.id.length > 1) {
            fetchMatchingResource(selectedResource.id);
        } else if (isPresent(selectedResource) && !inputDisplayValue) {
            populateDisplayValue(parseDisplayValue(selectedResource.object));
        } else if (matchingResources.fetchingState === FetchingState.NOT_FETCHED && inputDisplayValue.length > 0) {
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
                {this.props.parseDisplayValue(resource)}
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
