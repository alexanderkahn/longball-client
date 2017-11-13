import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {CurrentView, Team} from "../../../../models/models";
import TeamListItem from "./TeamListItem";

export interface ManageTeamsFormProps {
    teams: Array<Team>,
    currentView: CurrentView,
}

export interface ManageTeamsFormActions {
    resetView: () => void,
    fetchListItems: () => void,
}

export default function ManageTeamsForm(props: ManageTeamsFormProps & ManageTeamsFormActions) {
    return (
        <ManagementList title="Teams" currentView={props.currentView}
                        resetView={props.resetView} fetchListItems={props.fetchListItems}>
            {getChildListItems(props.teams)}
        </ManagementList>
    );
}

function getChildListItems(teams: Array<Team>): Array<JSX.Element> {
    return teams.map(team => <TeamListItem team={team} key={team.id}/>);
}