import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import TeamListItem from './TeamListItem';
import { Component } from 'react';
import { Team } from '../../../../reducers/resource/team';
import { ResourceCache } from '../../../../reducers/resource/cache';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';

export interface ManageTeamsFormProps {
    teams: ResourceCache<PageDescriptor, PageResult<Team>>;
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
        const {teams, fetchListItems, getPage, onClickAdd,
            buildHandleSelectTeamDetail, buildHandleDeleteTeam} = this.props;
        return (
            <ManagementList
                title="Teams"
                currentView={teams}
                fetchListItems={fetchListItems(teams.id)}
                getPage={getPage}
                onClickAdd={onClickAdd}
                renderChild={this.buildTeamListItemRenderer(buildHandleSelectTeamDetail, buildHandleDeleteTeam)}
            />
        );
    }

    buildTeamListItemRenderer(selectBuilder: (team: Team) => () => void, deleteBuilder: (team: Team) => () => void)
    : (team: Team) => JSX.Element {
        return (team: Team) => {
            return (
                <TeamListItem
                    key={team.id}
                    team={team}
                    handleSelectTeamDetail={selectBuilder(team)}
                    handleDeleteTeam={deleteBuilder(team)}
                />
            );
        };
    }
}