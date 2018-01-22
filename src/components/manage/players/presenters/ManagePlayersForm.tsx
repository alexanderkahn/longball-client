import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { Person } from '../../../../reducers/resource/person';
import { getListElements } from '../../../../util/listTransformer';

export interface ManagePlayersFormProps {
    rosterPositions: ResourceCache<PageDescriptor, PageResult<RosterPosition>>;
    includedPeople: Array<ResourceCache<string, Person>>;
}

export interface ManagePlayersFormActions {
    fetchListItems: (currentPage: PageDescriptor) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectPlayerDetail: (rosterPosition: RosterPosition) => () => void;
    buildHandleDeleteRosterPosition: (position: RosterPosition) => () => void;
}

export default class ManagePlayersForm extends Component<ManagePlayersFormProps & ManagePlayersFormActions> {
    render() {
        const {rosterPositions, fetchListItems, onClickAdd, getPage} = this.props;
        const transform = this.buildPlayerListItem.bind(this);
        return (
            <ManagementList
                title="Players"
                currentView={getListElements(rosterPositions, transform)}
                fetchListItems={fetchListItems(rosterPositions.id)}
                onClickAdd={onClickAdd}
                getPage={getPage}
            />
        );
    }

    private buildPlayerListItem(rosterPosition: RosterPosition | undefined): JSX.Element {
        const {buildHandleSelectPlayerDetail, buildHandleDeleteRosterPosition, includedPeople} = this.props;
        const person = rosterPosition ? includedPeople.find(it => it.id === rosterPosition.relationships.player.data.id) : null;
        if (!rosterPosition || !person || !isPresent(person)) {
            // TODO: there ought to be an option for 'missing' player so we can display that something is messed up.
            return <div key="asdfasdfasdfsadfwerwae"/>;
        } else {
            return (
                <PlayerListItem
                    person={person.object}
                    rosterPosition={rosterPosition}
                    handleSelectPlayerDetail={buildHandleSelectPlayerDetail(rosterPosition)}
                    handleDeletePlayer={buildHandleDeleteRosterPosition(rosterPosition)}
                    key={rosterPosition.id}
                />
            );
        }
    }
}