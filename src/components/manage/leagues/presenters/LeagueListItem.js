// @flow

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Icon} from "material-ui";
import {Link} from "react-router-dom";
import {League} from "../../../../models/models";

interface LeagueListItemProps {
    league: League,
}

export default function LeagueListItem(props: LeagueListItemProps) {
    const league = props.league;
    const leagueDetailRoute = `/manage/leagues/${league.id}`;
    return (
        <ListItem button component={Link} to={leagueDetailRoute}>
            <ListItemIcon><Icon>{league.attributes.name[0]}</Icon></ListItemIcon>
            <ListItemText primary={league.attributes.name}/>
        </ListItem>
    );

}
