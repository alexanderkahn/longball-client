import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';
import { Player } from '../../../../reducers/resource/rosterPosition';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { ResourceCache } from '../../../../reducers/resource/cache';

export interface ManagePlayersFormProps {
    players: ResourceCache<PageDescriptor, PageResult<Player>>;
}

export interface ManagePlayersFormActions {
    fetchListItems: (currentPage: PageDescriptor) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectPlayerDetail: (player: Player) => () => void;
    buildHandleDeletePlayer: (player: Player) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {
            players, fetchListItems, onClickAdd, getPage, buildHandleSelectPlayerDetail, buildHandleDeletePlayer
        } = this.props;
        return (
            <ManagementList
                title="Players"
                currentView={players}
                fetchListItems={fetchListItems(players.id)}
                onClickAdd={onClickAdd}
                getPage={getPage}
                renderChild={this.buildPlayerListItemRenderer(buildHandleSelectPlayerDetail, buildHandleDeletePlayer)}
            />
        );
    }

    buildPlayerListItemRenderer(selectBuilder: (player: Player) => () => void,
                                deleteBuilder: (player: Player) => () => void): (player: Player) => JSX.Element {
        return (player: Player) => {
            return (
                <PlayerListItem
                    player={player}
                    handleSelectPlayerDetail={selectBuilder(player)}
                    handleDeletePlayer={deleteBuilder(player)}
                    key={player.rosterPosition.id}
                />
            );
        };
    }
}