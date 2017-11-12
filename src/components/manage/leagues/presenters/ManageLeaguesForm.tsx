import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {League} from "../../../../models/models";
import LeagueListItem from "./LeagueListItem";

interface ManageLeaguesFormProps {
    leagues: Array<League>,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems: Function,
}

export default function ManageLeaguesForm(props: ManageLeaguesFormProps) {
    return (
        <ManagementList title="Leagues" isFetching={props.isFetching} lastFetched={props.lastFetched}
                        fetchListItems={props.fetchListItems}>
            {getChildListItems(props.leagues)}
        </ManagementList>
    );
}

function getChildListItems(leagues: Array<League>): Array<JSX.Element> {
    return leagues.map(league => <LeagueListItem league={league}/>);
}