import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import TeamListItem from './TeamListItem';
import { Component } from 'react';
import { Team } from '../../../../reducers/resource/team';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { copyContentsToCache } from '../../../../util/listTransformer';
import { MissingResourceListItem } from '../../../shared/presenters/MissingResourceListItem';

export interface ManageTeamsFormProps {
    teams: ResourceCache<PageDescriptor, PageResult<ResourceCache<string, Team>>>;
}

export interface ManageTeamsFormActions {
    fetchListItems: (page: PageDescriptor) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectTeamDetail: (team: Team) => () => void;
    buildHandleDeleteTeam: (team: Team) => () => void;
}

export default class ManageTeamsForm extends Component<ManageTeamsFormProps & ManageTeamsFormActions> {

    render() {
        const {teams, fetchListItems, getPage, onClickAdd} = this.props;
        return (
            <ManagementList
                title="Teams"
                currentView={isPresent(teams) ? copyContentsToCache(teams, teams.object.contents.toArray().map(it => this.buildTeamListItem(it))) : teams}
                fetchListItems={fetchListItems(teams.id)}
                getPage={getPage}
                onClickAdd={onClickAdd}
            />
        );
    }

    buildTeamListItem(team: ResourceCache<string, Team>): JSX.Element {
        const {buildHandleSelectTeamDetail, buildHandleDeleteTeam} = this.props;
        if (isPresent(team)) {
            return (
                <TeamListItem
                    key={team.id}
                    team={team.object}
                    handleSelectTeamDetail={buildHandleSelectTeamDetail(team.object)}
                    handleDeleteTeam={buildHandleDeleteTeam(team.object)}
                />
            );
        } else {
            return <MissingResourceListItem/>;
        }
    }
}