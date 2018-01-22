import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Avatar, ListItemSecondaryAction } from 'material-ui';
import { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { RosterPosition } from '../../../../reducers/resource/rosterPosition';
import { Person } from '../../../../reducers/resource/person';

interface PlayerListItemProps {
    person: Person;
    rosterPosition: RosterPosition;
    handleSelectPlayerDetail: () => void;
    handleDeletePlayer: () => void;
}

export default class PlayerListItem extends Component<PlayerListItemProps> {
    render() {
        const {person, handleSelectPlayerDetail, handleDeletePlayer } = this.props;
        return (
            <ListItem button={true} onClick={handleSelectPlayerDetail}>
                <ListItemIcon><Avatar>{person.attributes.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={person.attributes.first + ' ' + person.attributes.last}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleDeletePlayer} aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}
