import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import LeagueListItem from './LeagueListItem';
import { Component } from 'react';
import { League } from '../../../../reducers/resource/league';
import { isPresent, ResourceCache } from '../../../../reducers/resource/cache';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { copyContentsToCache } from '../../../../util/listTransformer';
import { MissingResourceListItem } from '../../../shared/presenters/MissingResourceListItem';

export interface ManageLeaguesProps {
    leagues: ResourceCache<PageDescriptor, PageResult<ResourceCache<string, League>>>;
}

export interface ManageLeaguesActions {
    fetchListItems: (page: PageDescriptor) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectDetail: (league: League) => () => void;
    buildHandleDeleteLeague: (league: League) => () => void;
}

export default class ManageLeaguesForm extends Component<ManageLeaguesProps & ManageLeaguesActions> {

    render() {
        const {leagues, onClickAdd, getPage, fetchListItems} = this.props;
        return (
            <ManagementList
                title="Leagues"
                currentView={isPresent(leagues) ? copyContentsToCache(leagues, leagues.object.contents.toArray().map(it => this.buildLeagueListItem(it))) : leagues}
                onClickAdd={onClickAdd}
                getPage={getPage}
                fetchListItems={fetchListItems(leagues.id)}
            />
        );
    }

    buildLeagueListItem(league: ResourceCache<string, League>): JSX.Element {
        const {buildHandleSelectDetail, buildHandleDeleteLeague} = this.props;
        if (isPresent(league)) {
            return (
                <LeagueListItem
                    key={league.id}
                    league={league.object}
                    handleSelectLeagueDetail={buildHandleSelectDetail(league.object)}
                    handleDeleteLeague={buildHandleDeleteLeague(league.object)}
                />
            );
        } else {
            return <MissingResourceListItem/>;
        }
    }

}