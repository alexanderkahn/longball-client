import { RelationshipResource, ResourceObject, ResourceType } from '../../reducers/resource';

export enum ResourceFormUpdateActionType {
    RESET_FORM = 'RESET_FORM',
    UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE',
    UPDATE_RELATIONSHIP = 'UPDATE_RELATIONSHIP',
    UPDATE_RELATIONSHIP_DISPLAY = 'UPDATE_RELATIONSHIP_DISPLAY'
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

export type ResourceFormUpdateAction<T extends ResourceObject> =
    | ResourceFormResetAction<T>
    | ResourceFormUpdateAttributeAction
    | ResourceFormUpdateRelationshipAction
    | ResourceFormUpdateRelationshipDisplayAction;

export function resetForm<T extends ResourceObject>(resourceType: ResourceType, resource: T)
: ResourceFormResetAction<T> {
    return {
        type: ResourceFormUpdateActionType.RESET_FORM,
        resourceType,
        resource
    };
}

// TODO: looks like these could just pass in which form they want to update. No need for separate methods.
export function updateLeagueAttribute(attribute: string, value: string): ResourceFormUpdateAttributeAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType: 'leagues',
        attribute,
        value
    };
}

export function updateTeamAttribute(attribute: string, value: string): ResourceFormUpdateAttributeAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType: 'teams',
        attribute,
        value
    };
}

export function updateTeamRelationship(relationship: string, value: RelationshipResource)
: ResourceFormUpdateRelationshipAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP,
        resourceType: 'teams',
        relationship,
        value
    };
}

export function updateTeamRelationshipDisplay(relationship: string, value: string)
: ResourceFormUpdateRelationshipDisplayAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY,
        resourceType: 'teams',
        relationship,
        value
    };
}

export function updatePersonAttribute(attribute: string, value: string) {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType: 'people',
        attribute,
        value
    };
}

export function updateRosterPositionAttribute(attribute: string, value: string) {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType: 'rosterpositions',
        attribute,
        value
    };
}

export function updateRosterPositionRelationship(relationship: string, value: RelationshipResource)
: ResourceFormUpdateRelationshipAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP,
        resourceType: 'rosterpositions',
        relationship,
        value
    };
}

export function updateRosterPositionRelationshipDisplay(relationship: string, value: string)
: ResourceFormUpdateRelationshipDisplayAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP_DISPLAY,
        resourceType: 'rosterpositions',
        relationship,
        value
    };
}