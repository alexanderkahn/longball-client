import { ResourceObject, ResourceType } from '../../models/models';
import { OrderedMap } from 'immutable';
import { CollectionPage } from '../rest';

export enum ResourceActionType {
    REQUEST_RESOURCE_OBJECT = 'REQUEST_RESOURCE_OBJECT',
    REQUEST_RESOURCE_COLLECTION = 'REQUEST_RESOURCE_COLLECTION',
    RECEIVE_RESOURCE = 'RECEIVE_RESOURCE',
    REMOVE_RESOURCE_OBJECT = 'REMOVE_RESOURCE_OBJECT'
}

export type ResourceObjectAction<T extends ResourceObject> =
    | RequestResourceObjectAction
    | RequestResourceCollectionAction
    | ReceiveResourceAction<T>
    | RemoveResourceObjectAction;

export interface RequestResourceObjectAction {
    type: ResourceActionType.REQUEST_RESOURCE_OBJECT;
    resourceType: ResourceType;
    id: string;
}

export interface RequestResourceCollectionAction {
    type: ResourceActionType.REQUEST_RESOURCE_COLLECTION;
    resourceType: ResourceType;
    page: number;
}

export interface ReceiveResourceAction<T extends ResourceObject> {
    type: ResourceActionType.RECEIVE_RESOURCE;
    resourceType: ResourceType;
    receivedAt: number;
    data: OrderedMap<string, T>;
    page?: CollectionPage;
}

export interface RemoveResourceObjectAction {
    type: ResourceActionType.REMOVE_RESOURCE_OBJECT;
    resourceType: ResourceType;
    removed: string;
}