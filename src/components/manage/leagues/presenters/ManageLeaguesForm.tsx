import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { League, PagedView } from '../../../../models/models';
import LeagueListItem from './LeagueListItem';
import { Component } from 'react';

export interface ManageLeaguesProps {
    leagues: Array<League>;
    currentView: PagedView;
}

export interface ManageLeaguesActions {
    fetchListItems: (page: number) => () => void;
    onClickAdd: () => void;
    getPage: (page: number) => () => void;
    buildHandleSelectDetail: (id: string) => () => void;
    buildHandleDeleteLeague: (league: League) => () => void;
}

export default class ManageLeaguesForm extends Component<ManageLeaguesProps & ManageLeaguesActions> {

    render() {
        const {currentView, onClickAdd, getPage, fetchListItems} = this.props;
        return (
            <ManagementList
                title="Leagues"
                currentView={currentView}
                onClickAdd={onClickAdd}
                getPage={getPage}
                fetchListItems={fetchListItems(currentView.page)}
            >
                {this.getChildListItems()}
            </ManagementList>
        );
    }

    getChildListItems(): Array<JSX.Element> {
        const {leagues, buildHandleSelectDetail, buildHandleDeleteLeague} = this.props;
        return leagues.map(league => (
            <LeagueListItem
                league={league}
                handleSelectLeagueDetail={buildHandleSelectDetail(league.id)}
                handleDeleteLeague={buildHandleDeleteLeague(league)}
                key={league.id}
            />
        ));
    }
}