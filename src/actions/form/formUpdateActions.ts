import { RelationshipResource, ResourceType } from '../../models/models';

export enum ResourceFormUpdateActionType {
    UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE',
    UPDATE_RELATIONSHIP = 'UPDATE_RELATIONSHIP',
}

export interface ResourceFormUpdateAttributeAction {
    type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE;
    resourceType: ResourceType;
    attribute: string;
    value: string;
}

export interface ResourceFormUpdateRelationshipAction {
    type: ResourceFormUpdateActionType.UPDATE_RELATIONSHIP;
    resourceType: ResourceType;
    relationship: string;
    value: RelationshipResource;
}

export type ResourceFormUpdateAction =
    | ResourceFormUpdateAttributeAction
    | ResourceFormUpdateRelationshipAction;

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