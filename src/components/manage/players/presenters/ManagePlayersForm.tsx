import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { CurrentView, Player } from '../../../../models/models';
import PlayerListItem from './PlayerListItem';

export interface ManagePlayersFormProps {
    players: Array<Player>;
    currentView: CurrentView;
}

export interface ManagePlayersFormActions {
    resetView: () => void;
    fetchListItems: () => void;
}

export default function ManagePlayersForm(props: ManagePlayersFormProps & ManagePlayersFormActions) {
    return (
        <ManagementList
            title="Players"
            currentView={props.currentView}
            resetView={props.resetView}
            fetchListItems={props.fetchListItems}
        >
            {getChildListItems(props.players)}
        </ManagementList>
    );
}

function getChildListItems(players: Array<Player>): Array<JSX.Element> {
    return players.map(player => <PlayerListItem player={player} key={player.rosterPosition.id}/>);
}