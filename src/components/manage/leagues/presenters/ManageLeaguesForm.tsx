import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import LeagueListItem from './LeagueListItem';
import { Component } from 'react';
import { League } from '../../../../reducers/resource/league';
import { ResourceCache } from '../../../../reducers/resource';
import { PageDescriptor, PageResult } from '../../../../reducers/resource/page';

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
        const {leagues, onClickAdd, getPage, fetchListItems, buildHandleSelectDetail, buildHandleDeleteLeague}
        = this.props;
        return (
            <ManagementList
                title="Leagues"
                currentView={leagues}
                onClickAdd={onClickAdd}
                getPage={getPage}
                fetchListItems={fetchListItems(leagues.id)}
                renderChild={this.buildLeagueListItemRenderer(buildHandleSelectDetail, buildHandleDeleteLeague)}
            />
        );
    }

    buildLeagueListItemRenderer(selectBuilder: (league: League) => () => void,
                                deleteBuilder: (league: League) => () => void): (league: League) => JSX.Element {
        return (league: League) => {
            return (
                <LeagueListItem
                    key={league.id}
                    league={league}
                    handleSelectLeagueDetail={selectBuilder(league)}
                    handleDeleteLeague={deleteBuilder(league)}
                />
            );
        };
    }
}