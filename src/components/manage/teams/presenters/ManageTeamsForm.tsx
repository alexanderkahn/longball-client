import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import TeamListItem from './TeamListItem';
import { Component } from 'react';
import { Team } from '../../../../reducers/resource/team';
import { PagedView } from '../../../../reducers/resource/page';

export interface ManageTeamsFormProps {
    teams: Array<Team>;
    currentView: PagedView;
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
        const {currentView, fetchListItems, getPage, onClickAdd} = this.props;
        return (
            <ManagementList
                title="Teams"
                currentView={currentView}
                fetchListItems={fetchListItems(currentView.page)}
                getPage={getPage}
                onClickAdd={onClickAdd}
            >
                {this.getChildListItems()}
            </ManagementList>
        );
    }

    getChildListItems(): Array<JSX.Element> {
        const {teams, buildHandleSelectTeamDetail, buildHandleDeleteTeam} = this.props;
        return teams.map(team => (
            <TeamListItem
                team={team}
                key={team.id}
                handleSelectTeamDetail={buildHandleSelectTeamDetail(team)}
                handleDeleteTeam={buildHandleDeleteTeam(team)}
            />
        ));
    }
}