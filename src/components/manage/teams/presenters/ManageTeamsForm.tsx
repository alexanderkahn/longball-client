import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {Team} from "../../../../models/models";
import TeamListItem from "./TeamListItem";

export interface ManageTeamsFormProps {
    teams: Array<Team>,
    isFetching: boolean,
    lastFetched: number,
}

export interface ManageTeamsFormActions {
    fetchListItems: () => void,
}

export default function ManageTeamsForm(props: ManageTeamsFormProps & ManageTeamsFormActions) {
    return (
        <ManagementList
            title="Teams"
            isFetching={props.isFetching}
            lastFetched={props.lastFetched}
            fetchListItems={props.fetchListItems}>
            {getChildListItems(props.teams)}
        </ManagementList>
    );
}

function getChildListItems(teams: Array<Team>): Array<JSX.Element> {
    return teams.map(team => <TeamListItem team={team} key={team.id}/>);
}