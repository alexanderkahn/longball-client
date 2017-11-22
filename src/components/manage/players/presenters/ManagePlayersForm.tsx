import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { CurrentView, Player } from '../../../../models/models';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';

export interface ManagePlayersFormProps {
    players: Array<Player>;
    currentView: CurrentView;
}

export interface ManagePlayersFormActions {
    resetView: () => void;
    fetchListItems: () => void;
    buildHandleSelectPlayerDetail: (id: string) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {currentView, resetView, fetchListItems} = this.props;
        return (
            <ManagementList
                title="Players"
                currentView={currentView}
                resetView={resetView}
                fetchListItems={fetchListItems}
            >
                {this.getChildListItems()}
            </ManagementList>
        );
    }

    getChildListItems(): Array<JSX.Element> {
        const {players, buildHandleSelectPlayerDetail} = this.props;
        return players.map(player => (
            <PlayerListItem
                player={player}
                handleSelectPlayerDetail={buildHandleSelectPlayerDetail(player.rosterPosition.id)}
                key={player.rosterPosition.id}
            />
        ));
    }
}