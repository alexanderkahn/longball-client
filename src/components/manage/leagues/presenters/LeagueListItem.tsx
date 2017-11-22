import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Icon, ListItemSecondaryAction } from 'material-ui';
import { League } from '../../../../models/models';
import { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

interface LeagueListItemProps {
    league: League;
    onClickListItem: () => void;
}

export default class LeagueListItem extends Component<LeagueListItemProps> {
    render() {
        const {league, onClickListItem} = this.props;

        return (
            <ListItem button={true} onClick={onClickListItem}>
                <ListItemIcon><Icon>{league.attributes.name[0]}</Icon></ListItemIcon>
                <ListItemText primary={league.attributes.name}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

}
