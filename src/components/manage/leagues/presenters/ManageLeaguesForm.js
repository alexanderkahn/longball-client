// @flow

import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import type {League} from "../../../../models/models";
import LeagueListItem from "./LeagueListItem";

type ManageLeaguesFormProps = {
    leagues: Array<League>,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems(): void,
}

export default function ManageLeaguesForm(props: ManageLeaguesFormProps) {
    const listItems: Array<LeagueListItem> = getChildListItems(props.leagues);
    return (
        <ManagementList
            title="Leagues"
            isFetching={props.isFetching}
            lastFetched={props.lastFetched}
            fetchListItems={props.fetchListItems}>
            {listItems}
        </ManagementList>
    );
}

function getChildListItems(leagues: Array<League>): Array<LeagueListItem> {
    return leagues.map(league => <LeagueListItem league={league} key={league.id}/>);
}