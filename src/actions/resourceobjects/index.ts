import { ResourceObjectType } from '../../models/models';

export enum ResourceObjectActionType {
    REMOVE_RESOURCE_OBJECT = 'REMOVE_RESOURCE_OBJECT'
}

export type ResourceObjectAction =
    | RemoveResourceObjectAction;

export interface RemoveResourceObjectAction {
    type: ResourceObjectActionType.REMOVE_RESOURCE_OBJECT;
    resourceObjectType: ResourceObjectType;
    removed: string;
}