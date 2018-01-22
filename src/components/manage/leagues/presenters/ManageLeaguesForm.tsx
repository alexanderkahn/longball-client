import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import LeagueListItem from './LeagueListItem';
import { Component } from 'react';
import { League } from '../../../../reducers/resource/league';
import { ResourceCache } from '../../../../reducers/resource/cache';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';
import { getListElements } from '../../../../util/listTransformer';

export interface ManageLeaguesProps {
    leagues: ResourceCache<PageDescriptor, PageResult<League>>;
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
        const transform = this.buildLeagueListItem.bind(this);
        return (
            <ManagementList
                title="Leagues"
                currentView={getListElements(leagues, transform)}
                onClickAdd={onClickAdd}
                getPage={getPage}
                fetchListItems={fetchListItems(leagues.id)}
            />
        );
    }

    buildLeagueListItem(league: League): JSX.Element {
        const {buildHandleSelectDetail, buildHandleDeleteLeague} = this.props;
        return (
            <LeagueListItem
                key={league.id}
                league={league}
                handleSelectLeagueDetail={buildHandleSelectDetail(league)}
                handleDeleteLeague={buildHandleDeleteLeague(league)}
            />
        );
    }
}