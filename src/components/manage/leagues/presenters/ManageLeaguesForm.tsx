import * as React from "react";
import ManagementList from "../../shared/presenters/ManagementList";
import {CurrentView, League} from "../../../../models/models";
import LeagueListItem from "./LeagueListItem";

export interface ManageLeaguesProps {
    leagues: Array<League>,
    currentView: CurrentView,
}

export interface ManageLeaguesActions {
    resetView: () => void,
    fetchListItems: () => void,
}

export default function ManageLeaguesForm(props: ManageLeaguesProps & ManageLeaguesActions) {
    return (
        <ManagementList title="Leagues" currentView={props.currentView}
                        resetView={props.resetView} fetchListItems={props.fetchListItems}>
            {getChildListItems(props.leagues)}
        </ManagementList>
    );
}

function getChildListItems(leagues: Array<League>): Array<JSX.Element> {
    return leagues.map(league => <LeagueListItem league={league}/>);
}