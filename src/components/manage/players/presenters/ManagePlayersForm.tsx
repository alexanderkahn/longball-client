import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { CurrentView, Player, RosterPosition } from '../../../../models/models';
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
    buildHandleSelectPlayerDetail: (rosterPosition: RosterPosition) => () => void;
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
        const {players, buildHandleSelectPlayerDetail} = this.props;
        return players.map(player => (
            <PlayerListItem
                player={player}
                handleSelectPlayerDetail={buildHandleSelectPlayerDetail(player.rosterPosition)}
                key={player.rosterPosition.id}
            />
        ));
    }
}