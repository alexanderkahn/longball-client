import * as React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Avatar} from "material-ui";
// import {Link} from "react-router-dom";
import {Player} from "../../../../models/models";
import {Component} from "react";

interface PlayerListItemProps {
    player: Player
}

export default class PlayerListItem extends Component<PlayerListItemProps> {
    render() {
        const rosterPosition = this.props.player.rosterPosition;
        const person = this.props.player.person;
        // const playerDetailRoute = `/manage/players/${rosterPosition.id}`;
        return (
            //<ListItem button component={Link} to={playerDetailRoute}>
            <ListItem key={rosterPosition.id}>
                <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={person.attributes.first + " " + person.attributes.last}/>
            </ListItem>
        );
    }
}
