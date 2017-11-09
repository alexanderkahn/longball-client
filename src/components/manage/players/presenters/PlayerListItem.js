// @flow

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Avatar} from "material-ui";
import {Link} from "react-router-dom";
import {Person, RosterPosition} from "../../../../models/models";

interface PlayerListItemProps {
    rosterPosition: RosterPosition,
    person: Person,
}

export default function PlayerListItem(props: PlayerListItemProps) {
    const rosterPosition = props.rosterPosition;
    const person = props.person;
    const playerDetailRoute = `/manage/players/${rosterPosition.id}`;
    return (
        <ListItem button component={Link} to={playerDetailRoute}>
            <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
            <ListItemText primary={person.attributes.first + " " + person.attributes.last}/>
        </ListItem>
    );
}
