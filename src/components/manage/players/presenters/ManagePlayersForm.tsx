import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';
import { Player, RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { ResourceCache } from '../../../../reducers/resource/cache';
import { Person } from '../../../../reducers/resource/person';

export interface ManagePlayersFormProps {
    rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>;
    includedPeople: Array<ResourceCache<string, Person>>;
}

export interface ManagePlayersFormActions {
    fetchListItems: (currentPage: PageDescriptor) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectPlayerDetail: (player: Player) => () => void;
    buildHandleDeleteRosterPosition: (position: RosterPosition) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {rosterPositions, fetchListItems, onClickAdd, getPage, buildHandleSelectPlayerDetail,
            buildHandleDeleteRosterPosition} = this.props;
        // FIXME: this will break. Need to pull rendering children back into this layer.
        return (
            <ManagementList
                title="Players"
                currentView={rosterPositions}
                fetchListItems={fetchListItems(rosterPositions.id)}
                onClickAdd={onClickAdd}
                getPage={getPage}
                renderChild={this.buildPlayerListItemRenderer(buildHandleSelectPlayerDetail, buildHandleDeleteRosterPosition)}
            />
        );
    }

    buildPlayerListItemRenderer(selectBuilder: (player: Player) => () => void,
                                deleteBuilder: (position: RosterPosition) => () => void): (player: Player) => JSX.Element {
        return (player: Player) => {
            // TODO: there ought to be an option for 'missing' player so we can display that something is messed up.
            return (
                <PlayerListItem
                    player={player}
                    handleSelectPlayerDetail={selectBuilder(player)}
                    handleDeletePlayer={deleteBuilder(player.rosterPosition)}
                    key={player.rosterPosition.id}
                />
            );
        };
    }
}