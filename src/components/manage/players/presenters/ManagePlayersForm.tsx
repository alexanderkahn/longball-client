import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';
import { Player } from '../../../../reducers/resource/rosterPosition';
import { PageResult } from '../../../../reducers/resource/page';
import { isPresent, ResourceCache } from '../../../../reducers/resource';

export interface ManagePlayersFormProps {
    players: ResourceCache<PageResult<Player>>;
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
        const {
            players, fetchListItems, onClickAdd, getPage, buildHandleSelectPlayerDetail, buildHandleDeletePlayer
        } = this.props;
        const presentPage = isPresent(players) ? players.object : null;
        return (
            <ManagementList
                title="Players"
                currentView={players}
                // TODO we should always know the requested page even if it isn't present. This might break shit.
                fetchListItems={fetchListItems(presentPage ? presentPage.meta.number : 1)}
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