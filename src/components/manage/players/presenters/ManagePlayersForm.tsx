import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import PlayerListItem from './PlayerListItem';
import { Component } from 'react';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { Person } from '../../../../reducers/resource/person';
import { copyContentsToCache } from '../../../../util/listTransformer';
import { MissingResourceListItem } from '../../../shared/presenters/MissingResourceListItem';

export interface ManagePlayersFormProps {
    rosterPositions: ResourceCache<PageDescriptor, PageResult<ResourceCache<string, RosterPosition>>>;
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
        const cachedElements = isPresent(rosterPositions)
            ? copyContentsToCache(rosterPositions, rosterPositions.object.contents.toArray().map(it => this.buildPlayerListItem(it)))
            : rosterPositions;
        return (
            <ManagementList
                title="Players"
                currentView={cachedElements}
                fetchListItems={fetchListItems(rosterPositions.id)}
                onClickAdd={onClickAdd}
                getPage={getPage}
            />
        );
    }

    private buildPlayerListItem(rosterPosition: ResourceCache<string, RosterPosition>): JSX.Element {
        const {buildHandleSelectPlayerDetail, buildHandleDeleteRosterPosition, includedPeople} = this.props;
        const person = isPresent(rosterPosition)
            ? includedPeople.find(it => it.id === rosterPosition.object.relationships.player.data.id)
            : null;
        if (!isPresent(rosterPosition) || !person || !isPresent(person)) {
            return <MissingResourceListItem/>;
        } else {
            return (
                <PlayerListItem
                    person={person.object}
                    rosterPosition={rosterPosition.object}
                    handleSelectPlayerDetail={buildHandleSelectPlayerDetail(rosterPosition.object)}
                    handleDeletePlayer={buildHandleDeleteRosterPosition(rosterPosition.object)}
                    key={rosterPosition.id}
                />
            );
        }
    }
}