import * as React from 'react';
import ManagementList from '../../shared/presenters/ManagementList';
import { CurrentView, League } from '../../../../models/models';
import LeagueListItem from './LeagueListItem';
import { Component } from 'react';

export interface ManageLeaguesProps {
    leagues: Array<League>;
    currentView: CurrentView;
    addOneUrl: string;
}

export interface ManageLeaguesActions {
    resetView: () => void;
    fetchListItems: () => void;
    onClickAdd: () => void;
    buildHandleSelectDetail: (id: string) => () => void;
    buildHandleDeleteLeague: (league: League) => () => void;
}

export default class ManageLeaguesForm extends Component<ManageLeaguesProps & ManageLeaguesActions> {

    render() {
        const {currentView, onClickAdd, resetView, fetchListItems} = this.props;
        return (
            <ManagementList
                title="Leagues"
                currentView={currentView}
                onClickAdd={onClickAdd}
                resetView={resetView}
                fetchListItems={fetchListItems}
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