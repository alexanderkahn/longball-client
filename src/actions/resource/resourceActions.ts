import { OrderedMap } from 'immutable';
import { PageResultsMeta } from '../../reducers/resource/page';
import { PageDescriptor } from '../../reducers/resource/page';
import { ResourceObject, ResourceType } from '../../reducers/resource/resourceReducer';

export enum ResourceActionType {
    REQUEST_RESOURCE_OBJECT = 'REQUEST_RESOURCE_OBJECT',
    REQUEST_RESOURCE_PAGE = 'REQUEST_RESOURCE_PAGE',
    RECEIVE_RESOURCE_OBJECT = 'RECEIVE_RESOURCE_OBJECT',
    RECEIVE_RESOURCE_PAGE = 'RECEIVE_RESOURCE_PAGE',
    RECEIVE_RESOURCE_INCLUDES = 'RECEIVE_RESOURCE_INCLUDES',
    REMOVE_RESOURCE_OBJECT = 'REMOVE_RESOURCE_OBJECT'
}

export type ResourceObjectAction<T extends ResourceObject> =
    | RequestResourceObjectAction
    | RequestResourcePageAction
    | ReceiveResourceObjectAction<T>
    | ReceiveResourcePageAction<T>
    | ReceiveResourceIncludesAction<T>
    | RemoveResourceObjectAction;

export interface RequestResourceObjectAction {
    type: ResourceActionType.REQUEST_RESOURCE_OBJECT;
    resourceType: ResourceType;
    id: string;
}

export interface RequestResourcePageAction {
    type: ResourceActionType.REQUEST_RESOURCE_PAGE;
    resourceType: ResourceType;
    page: PageDescriptor;
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
    page: PageDescriptor;
    meta: PageResultsMeta;
    data: OrderedMap<string, T>;
}

export interface ReceiveResourceIncludesAction<T extends ResourceObject> {
    type: ResourceActionType.RECEIVE_RESOURCE_INCLUDES;
    resourceType: ResourceType;
    data: OrderedMap<string, T>;
}

export interface RemoveResourceObjectAction {
    type: ResourceActionType.REMOVE_RESOURCE_OBJECT;
    resourceType: ResourceType;
    removed: string;
}