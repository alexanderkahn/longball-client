import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import TeamListItem from './TeamListItem';
import { Component } from 'react';
import { Team } from '../../../../reducers/resource/team';
import { ResourceCache } from '../../../../reducers/resource/cache';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { getListElements } from '../../../../util/listTransformer';

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
        const {teams, fetchListItems, getPage, onClickAdd} = this.props;
        const transform = this.buildTeamListItem.bind(this);
        return (
            <ManagementList
                title="Teams"
                currentView={getListElements(teams, transform)}
                fetchListItems={fetchListItems(teams.id)}
                getPage={getPage}
                onClickAdd={onClickAdd}
            />
        );
    }

    buildTeamListItem(team: Team): JSX.Element {
        const {buildHandleSelectTeamDetail, buildHandleDeleteTeam} = this.props;
        return (
            <TeamListItem
                key={team.id}
                team={team}
                handleSelectTeamDetail={buildHandleSelectTeamDetail(team)}
                handleDeleteTeam={buildHandleDeleteTeam(team)}
            />
        );
    }
}