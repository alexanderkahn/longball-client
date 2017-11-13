import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {Player} from "../../../../models/models";
import PlayerListItem from "./PlayerListItem";

export interface ManagePlayersFormProps {
    players: Array<Player>,
    isFetching: boolean,
    lastFetched: number,
}

export interface ManagePlayersFormActions {
    fetchListItems: () => void,
}

export default function ManagePlayersForm(props: ManagePlayersFormProps & ManagePlayersFormActions) {
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