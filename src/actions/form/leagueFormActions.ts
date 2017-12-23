import { ResourceType } from '../../models/models';

export enum ResourceFormUpdateActionType {
    UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE',
}

export interface ResourceFormUpdateAttributeAction {
    type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE;
    resourceType: ResourceType;
    attribute: string;
    value: string;
}

export type ResourceFormUpdateAction =
    | ResourceFormUpdateAttributeAction;

export function updateLeagueName(name: string): ResourceFormUpdateAttributeAction {
    return {
        type: ResourceFormUpdateActionType.UPDATE_ATTRIBUTE,
        resourceType: 'leagues',
        attribute: 'name',
        value: name
    };
}
