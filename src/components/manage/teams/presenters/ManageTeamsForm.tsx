import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {Team} from "../../../../models/models";
import TeamListItem from "./TeamListItem";

interface ManageTeamsFormProps {
    teams: Array<Team>,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems: Function,
}

export default function ManageTeamsForm(props: ManageTeamsFormProps) {
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