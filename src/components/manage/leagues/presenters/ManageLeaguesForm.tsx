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
    onClickListItemCreator: (id: string) => () => void;
}

export default class ManageLeaguesForm extends Component<ManageLeaguesProps & ManageLeaguesActions> {

    render() {
        const {currentView, addOneUrl, resetView, fetchListItems} = this.props;
        return (
            <ManagementList
                title="Leagues"
                currentView={currentView}
                addOneUrl={addOneUrl}
                resetView={resetView}
                fetchListItems={fetchListItems}
            >
                {this.getChildListItems()}
            </ManagementList>
        );
    }

    getChildListItems(): Array<JSX.Element> {
        const {leagues, onClickListItemCreator} = this.props;
        return leagues.map(league => (
            <LeagueListItem
                league={league}
                onClickListItem={onClickListItemCreator(league.id)}
                key={league.id}
            />
        ));
    }
}