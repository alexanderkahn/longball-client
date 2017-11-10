// @flow

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";
import type {Player} from "../../../../models/models";

type PlayerListItemProps = {
    player: Player
}

export default function PlayerListItem(props: PlayerListItemProps) {
    const rosterPosition = props.player.rosterPosition;
    const person = props.player.person;
    const playerDetailRoute = `/manage/players/${rosterPosition.id}`;
    return (
        <ListItem button component={Link} to={playerDetailRoute}>
            <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
            <ListItemText primary={person.attributes.first + " " + person.attributes.last}/>
        </ListItem>
    );
}
