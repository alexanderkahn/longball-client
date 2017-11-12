import * as React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Icon} from "material-ui";
import {Team} from "../../../../models/models";
import {Component} from "react";

interface TeamListItemProps {
    team: Team,
}

export default class TeamListItem extends Component<TeamListItemProps> {
    render() {
        const team = this.props.team;
        return (
            //<ListItem button component={Link} to={teamDetailRoute}> TODO: re-enable this
            <ListItem>
                <ListItemIcon><Icon>{team.attributes.abbreviation}</Icon></ListItemIcon>
                <ListItemText primary={team.attributes.location + " " + team.attributes.nickname}/>
            </ListItem>
        );
    }
}