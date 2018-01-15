import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import TeamListItem from './TeamListItem';
import { Component } from 'react';
import { Team } from '../../../../reducers/resource/team';
import { isPresent, ResourceCache } from '../../../../reducers/resource';
import { PageResult } from '../../../../reducers/resource/page';

export interface ManageTeamsFormProps {
    teams: ResourceCache<PageResult<Team>>;
}

export interface ManageTeamsFormActions {
    fetchListItems: (page: number) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectTeamDetail: (team: Team) => () => void;
    buildHandleDeleteTeam: (team: Team) => () => void;
}

export default class ManageTeamsForm extends Component<ManageTeamsFormProps & ManageTeamsFormActions> {

    render() {
        const {teams, fetchListItems, getPage, onClickAdd,
            buildHandleSelectTeamDetail, buildHandleDeleteTeam} = this.props;
        const presentPage = isPresent(teams) ? teams.object : null;
        return (
            <ManagementList
                title="Teams"
                currentView={teams}
                // TODO we should always know the requested page even if it isn't present. This might break shit.
                fetchListItems={fetchListItems(presentPage ? presentPage.meta.number : 1)}
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