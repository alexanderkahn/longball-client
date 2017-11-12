import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {Player} from "../../../../models/models";
import PlayerListItem from "./PlayerListItem";

interface ManagePlayersFormProps {
    players: Array<Player>,
    isFetching: boolean,
    lastFetched: number,
    fetchListItems: Function,
}

export default function ManagePlayersForm(props: ManagePlayersFormProps) {
    return (
        <ManagementList title="Players" isFetching={props.isFetching}
                        lastFetched={props.lastFetched} fetchListItems={props.fetchListItems}>
            {getChildListItems(props.players)}
        </ManagementList>
    );
}

function getChildListItems(players: Array<Player>): Array<JSX.Element> {
    return players.map(player => <PlayerListItem player={player} key={player.rosterPosition.id}/>);
}