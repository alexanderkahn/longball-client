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
    onClickAdd: () => void;
    buildHandleSelectPlayerDetail: (player: Player) => () => void;
    buildHandleDeletePlayer: (player: Player) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {currentView, resetView, fetchListItems, onClickAdd} = this.props;
        return (
            <ManagementList
                title="Players"
                currentView={currentView}
                resetView={resetView}
                fetchListItems={fetchListItems}
                onClickAdd={onClickAdd}
            >
                {this.getChildListItems()}
            </ManagementList>
        );
    }

    getChildListItems(): Array<JSX.Element> {
        const {players, buildHandleSelectPlayerDetail, buildHandleDeletePlayer} = this.props;
        return players.map(player => (
            <PlayerListItem
                player={player}
                handleSelectPlayerDetail={buildHandleSelectPlayerDetail(player)}
                handleDeletePlayer={buildHandleDeletePlayer(player)}
                key={player.rosterPosition.id}
            />
        ));
    }
}