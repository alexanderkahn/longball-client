import { deleteObject, fetchCollection, fetchObject, postObject } from '../rest';
import { RootState } from '../../reducers/rootReducer';
import { Dispatch } from 'redux';
import { OrderedMap } from 'immutable';
import {
    ReceiveResourcePageAction,
    RemoveResourceObjectAction, RequestResourcePageAction, RequestResourceObjectAction,
    ResourceActionType, ReceiveResourceObjectAction
} from './resourceActions';
import { PageDescriptor, PageResultsMeta } from '../../reducers/resource/page';
import { ResourceType } from '../../reducers/resource/resourceReducer';
import { Team } from '../../reducers/resource/team';

const TEAMS_RESOURCE_TYPE: ResourceType = 'teams';

function requestTeam(id: string): RequestResourceObjectAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        id
    };
}

function requestTeamCollection(page: PageDescriptor): RequestResourcePageAction {
    return {
        type: ResourceActionType.REQUEST_RESOURCE_PAGE,
        resourceType: TEAMS_RESOURCE_TYPE,
        page
    };
}

function receiveTeam(id: string, resource: Team | null): ReceiveResourceObjectAction<Team> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        data: {
            id,
            resource
        },
    };
}

function receiveTeams(teams: OrderedMap<string, Team>, meta: PageResultsMeta, page: PageDescriptor)
: ReceiveResourcePageAction<Team> {
    return {
        type: ResourceActionType.RECEIVE_RESOURCE_PAGE,
        resourceType: TEAMS_RESOURCE_TYPE,
        page,
        meta,
        data: teams
    };
}

function removeTeam(id: string): RemoveResourceObjectAction {
    return {
        type: ResourceActionType.REMOVE_RESOURCE_OBJECT,
        resourceType: TEAMS_RESOURCE_TYPE,
        removed: id
    };
}

export function fetchTeams(page: PageDescriptor): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeamCollection(page));
        const collection = await fetchCollection<Team>('teams', page);
        const teams = OrderedMap<string, Team>(collection.data.map(team => [team.id, team]));
        dispatch(receiveTeams(teams, collection.meta.page, page));
    };
}

export function fetchTeam(teamId: string): Dispatch<RootState> {
    return async function (dispatch: Dispatch<RootState>) {
        dispatch(requestTeam(teamId));
        const object = await fetchObject<Team>('teams', teamId);
        dispatch(receiveTeam(teamId, object ? object.data : null));
    };
}

export function saveTeam(team: Team): (dispatch: Dispatch<RootState>) => Promise<string> {
    return async (dispatch) => {
        const saveResponse = (await postObject(team)).data;
        dispatch(receiveTeam(saveResponse.id, saveResponse));
        return saveResponse.id;
    };
}

export function deleteTeam(team: Team): Dispatch<RootState> {
    return async function  (dispatch: Dispatch<RootState>) {
        await deleteObject(team);
        dispatch(removeTeam(team.id));
    };
}