import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Avatar } from 'material-ui';
import { Player } from '../../../../models/models';
import { Component } from 'react';

interface PlayerListItemProps {
    player: Player;
    handleSelectPlayerDetail: () => void;
}

export default class PlayerListItem extends Component<PlayerListItemProps> {
    render() {
        const {player, handleSelectPlayerDetail} = this.props;
        return (
            <ListItem button={true} onClick={handleSelectPlayerDetail}>
                <ListItemIcon><Avatar>{player.person.attributes.last[0]}</Avatar></ListItemIcon>
                <ListItemText primary={player.person.attributes.first + ' ' + player.person.attributes.last}/>
            </ListItem>
        );
    }
}
