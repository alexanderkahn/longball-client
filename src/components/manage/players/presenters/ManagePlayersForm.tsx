import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { PagedView, Player } from '../../../../models/models';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';

export interface ManagePlayersFormProps {
    players: Array<Player>;
    currentView: PagedView;
}

export interface ManagePlayersFormActions {
    fetchListItems: (currentPage: number) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectPlayerDetail: (player: Player) => () => void;
    buildHandleDeletePlayer: (player: Player) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {currentView, fetchListItems, onClickAdd, getPage} = this.props;
        return (
            <ManagementList
                title="Players"
                currentView={currentView}
                fetchListItems={fetchListItems(currentView.page)}
                onClickAdd={onClickAdd}
                getPage={getPage}
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