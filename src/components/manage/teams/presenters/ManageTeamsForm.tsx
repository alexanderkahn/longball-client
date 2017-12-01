import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { CurrentView, Team } from '../../../../models/models';
import TeamListItem from './TeamListItem';
import { Component } from 'react';

export interface ManageTeamsFormProps {
    teams: Array<Team>;
    currentView: CurrentView;
}

export interface ManageTeamsFormActions {
    resetView: () => void;
    fetchListItems: () => void;
    onClickAdd: () => void;
    onClickPrevious: (() => void) | null;
    onClickNext: (() => void) | null;
    buildHandleSelectTeamDetail: (team: Team) => () => void;
    buildHandleDeleteTeam: (team: Team) => () => void;
}

export default class ManageTeamsForm extends Component<ManageTeamsFormProps & ManageTeamsFormActions> {

    render() {
        const {currentView, resetView, fetchListItems, onClickAdd, onClickPrevious, onClickNext} = this.props;
        return (
            <ManagementList
                title="Teams"
                currentView={currentView}
                resetView={resetView}
                fetchListItems={fetchListItems}
                onClickAdd={onClickAdd}
                onClickPrevious={onClickPrevious}
                onClickNext={onClickNext}
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