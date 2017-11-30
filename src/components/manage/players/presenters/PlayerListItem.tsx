import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Avatar, ListItemSecondaryAction } from 'material-ui';
import { Player } from '../../../../models/models';
import { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

interface PlayerListItemProps {
    player: Player;
    handleSelectPlayerDetail: () => void;
    handleDeletePlayer: () => void;
}

export default class PlayerListItem extends Component<PlayerListItemProps> {
    render() {
        const {player, handleSelectPlayerDetail, handleDeletePlayer } = this.props;
        return (
            <ListItem button={true} onClick={handleSelectPlayerDetail}>
                <ListItemIcon><Avatar>{player.person.attributes.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={player.person.attributes.first + ' ' + player.person.attributes.last}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleDeletePlayer} aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}
