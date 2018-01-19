import { RelationshipResource, ResourceObject, ResourceType } from '../../reducers/resource/resourceReducer';

export enum ResourceFormUpdateActionType {
    RESET_FORM = 'RESET_FORM',
    UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE',
    UPDATE_RELATIONSHIP = 'UPDATE_RELATIONSHIP',
    UPDATE_RELATIONSHIP_DISPLAY = 'UPDATE_RELATIONSHIP_DISPLAY',
    TOGGLE_EDIT = 'TOGGLE_EDIT'
}

interface ResourceFormResetAction<T extends ResourceObject> {
    type: ResourceFormUpdateActionType.RESET_FORM;
    resourceType: ResourceType;
    resource: T;
}

interface ResourceFormUpdateAttributeAction {
    type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE;
    resourceType: ResourceType;
    attribute: string;
    value: string;
}

interface ResourceFormUpdateRelationshipAction {
    type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP;
    resourceType: ResourceType;
    relationship: string;
    value: RelationshipResource;
}

interface ResourceFormUpdateRelationshipDisplayAction {
    type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY;
    resourceType: ResourceType;
    relationship: string;
    value: string;
}

interface ResourceFormToggleEditAction {
    type: ResourceFormUpdateActionType.TOGGLE_EDIT;
    resourceType: ResourceType;
    isEdit: boolean;
}

export type ResourceFormUpdateAction<T extends ResourceObject> =
    | ResourceFormResetAction<T>
    | ResourceFormUpdateAttributeAction
    | ResourceFormUpdateRelationshipAction
    | ResourceFormUpdateRelationshipDisplayAction
    | ResourceFormToggleEditAction;

export function resetForm<T extends ResourceObject>(resourceType: ResourceType, resource: T)
: ResourceFormResetAction<T> {
    return {
        type: ResourceFormUpdateActionType.RESET_FORM,
        resourceType,
        resource
    };
}

export function updateFormAttribute(resourceType: ResourceType, attribute: string, value: string)
: ResourceFormUpdateAttributeAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType,
        attribute,
        value
    };
}

export function updateFormRelationship(resourceType: ResourceType, relationship: string, value: RelationshipResource)
: ResourceFormUpdateRelationshipAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP,
        resourceType,
        relationship,
        value
    };
}

export function updateFormRelationshipDisplay(resourceType: ResourceType, relationship: string, value: string)
: ResourceFormUpdateRelationshipDisplayAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY,
        resourceType,
        relationship,
        value
    };
}

export function toggleFormIsEdit(formType: ResourceType, isEdit: boolean): ResourceFormToggleEditAction {
    return {
        type: ResourceFormUpdateActionType.TOGGLE_EDIT,
        resourceType: formType,
        isEdit
    };
}