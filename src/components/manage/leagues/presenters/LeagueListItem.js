import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Icon} from "material-ui";
import {Link} from "react-router-dom";
import {leagueProp} from "../../../../models/models";

function LeagueListItem(props) {
    const league = props.league;
    const leagueDetailRoute = `/manage/leagues/${league.id}`;
    return (
        <ListItem button component={Link} to={leagueDetailRoute}>
            <ListItemIcon><Icon>{league.attributes.name[0]}</Icon></ListItemIcon>
            <ListItemText primary={league.attributes.name}/>
        </ListItem>
    );
}

LeagueListItem.propTypes = {
    league: leagueProp.isRequired,
};

export default LeagueListItem;
