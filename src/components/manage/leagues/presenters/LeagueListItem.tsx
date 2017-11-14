import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Icon } from 'material-ui';
import { Link } from 'react-router-dom';
import { League } from '../../../../models/models';
import { Component } from 'react';

interface LeagueListItemProps {
    league: League;
}

export default class LeagueListItem extends Component<LeagueListItemProps> {
    render() {
        const league = this.props.league;
        const leagueDetailRoute = `/manage/leagues/${league.id}`;
        // <ListItem button={true} component={Link} to={leagueDetailRoute}>

        return (
            <Link to={leagueDetailRoute}>
                <ListItem button={true}>
                    <ListItemIcon><Icon>{league.attributes.name[0]}</Icon></ListItemIcon>
                    <ListItemText primary={league.attributes.name}/>
                </ListItem>
            </Link>
        );
    }

}