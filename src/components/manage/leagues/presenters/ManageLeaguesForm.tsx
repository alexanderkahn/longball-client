import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {League} from "../../../../models/models";
import LeagueListItem from "./LeagueListItem";

export interface ManageLeaguesProps {
    leagues: Array<League>,
    isFetching: boolean,
    lastFetched?: number,
}

export interface ManageLeaguesActions {
    fetchListItems: () => void,
}

export default function ManageLeaguesForm(props: ManageLeaguesProps & ManageLeaguesActions) {
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