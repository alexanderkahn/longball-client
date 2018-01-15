import * as React from 'react';
import { Component } from 'react';
import { MenuItem, TextField } from 'material-ui';
import Downshift from 'downshift';
import Paper from 'material-ui/Paper';
import { FetchingState, ResourceCache, ResourceObject } from '../../../../reducers/resource';

export interface ResourcePickerProps<T extends ResourceObject> {
    matchingResources: ResourceCache<Array<T>>;
    selectedResourceId: string | null;
    selectedResource: ResourceCache<T> | null;
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
        const { inputDisplayValue, matchingResources, selectedResource, parseDisplayValue  } = this.props;
        return (
            <Downshift
                inputValue={inputDisplayValue || ''}
                selectedItem={selectedResource && matchingResources.object
                    ? matchingResources.object.find(it => it === selectedResource.object)
                    : null
                }
                itemToString={parseDisplayValue}
                onInputValueChange={(value: string) => this.props.onChangeDisplay(value)}
                onChange={(selection: T) => this.props.onSelectResource(selection.id)}
                render={({isOpen, getInputProps, getItemProps}) => (
                    <div>
                        {this.renderInput(getInputProps({placeholder: this.props.inputDisplayPlaceholder}))}
                        {isOpen ? this.renderSuggestionsContainer(
                            this.props.matchingResources.object ?
                                this.props.matchingResources.object.map((resource: T) =>
                                    this.renderSuggestion(resource, getItemProps({item: resource}))
                            ) : []
                        ) : null}
                    </div>
                )}
            />
        );
    }

    private updatePicker() {
        if (this.props.selectedResourceId && this.props.selectedResource
            && this.props.selectedResource.fetchingState === FetchingState.NOT_FETCHED) {
            this.props.fetchMatchingResource(this.props.selectedResourceId);
        } else if (this.props.selectedResource && this.props.selectedResource.object && !this.props.inputDisplayValue) {
            this.props.populateDisplayValue(this.props.parseDisplayValue(this.props.selectedResource.object));
        } else if (this.props.matchingResources.fetchingState === FetchingState.NOT_FETCHED
            && this.props.inputDisplayValue.length > 0) {
            this.props.fetchSuggestions(this.props.inputDisplayValue ? this.props.inputDisplayValue : '');
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
