import { ResourceObject, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { CollectionPage } from '../rest';

export enum ResourceActionType {
    REQUEST_RESOURCE_OBJECT = 'REQUEST_RESOURCE_OBJECT',
    REQUEST_RESOURCE_PAGE = 'REQUEST_RESOURCE_PAGE',
    RECEIVE_RESOURCE_OBJECT = 'RECEIVE_RESOURCE_OBJECT',
    RECEIVE_RESOURCE_PAGE = 'RECEIVE_RESOURCE_PAGE',
    REMOVE_RESOURCE_OBJECT = 'REMOVE_RESOURCE_OBJECT'
}

export type ResourceObjectAction<T extends ResourceObject> =
    | RequestResourceObjectAction
    | RequestResourcePageAction
    | ReceiveResourceObjectAction<T>
    | ReceiveResourcePageAction<T>
    | RemoveResourceObjectAction;

export interface RequestResourceObjectAction {
    type: ResourceActionType.REQUEST_RESOURCE_OBJECT;
    resourceType: ResourceType;
    id: string;
}

export interface RequestResourcePageAction {
    type: ResourceActionType.REQUEST_RESOURCE_PAGE;
    resourceType: ResourceType;
    page: number;
}

export interface ReceiveResourceObjectAction<T extends ResourceObject> {
    type: ResourceActionType.RECEIVE_RESOURCE_OBJECT;
    resourceType: ResourceType;
    data: {
        id: string;
        resource: T | null;
    };
}

export interface ReceiveResourcePageAction<T extends ResourceObject> {
    type: ResourceActionType.RECEIVE_RESOURCE_PAGE;
    resourceType: ResourceType;
    data: OrderedMap<string, T>;
    page: CollectionPage;
}

export interface RemoveResourceObjectAction {
    type: ResourceActionType.REMOVE_RESOURCE_OBJECT;
    resourceType: ResourceType;
    removed: string;
}