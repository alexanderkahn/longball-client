// @flow

import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import type {Player} from "../../../../models/models";
import PlayerListItem from "./PlayerListItem";

type ManagePlayersFormProps = {
    players: Array<Player>,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems(): void,
}

export default function ManagePlayersForm(props: ManagePlayersFormProps) {
    const listItems: Array<PlayerListItem> = getChildListItems(props.players);
    return (
        <ManagementList
            title="Players"
            isFetching={props.isFetching}
            lastFetched={props.lastFetched}
            fetchListItems={props.fetchListItems}>
            {listItems}
        </ManagementList>
    );
}

function getChildListItems(players: Array<Player>): Array<PlayerListItem> {
    return players.map(player => <PlayerListItem player={player} key={player.rosterPosition.id}/>);
}