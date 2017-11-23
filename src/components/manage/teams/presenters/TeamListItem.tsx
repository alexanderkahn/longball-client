import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Icon, ListItemSecondaryAction } from 'material-ui';
import { Team } from '../../../../models/models';
import { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

interface TeamListItemProps {
    team: Team;
    handleSelectTeamDetail: () => void;
    handleDeleteTeam: () => void;
}

export default class TeamListItem extends Component<TeamListItemProps> {
    render() {
        const {team, handleSelectTeamDetail, handleDeleteTeam} = this.props;
        return (
                <ListItem button={true} onClick={handleSelectTeamDetail}>
                    <ListItemIcon><Icon>{team.attributes.abbreviation}</Icon></ListItemIcon>
                    <ListItemText primary={team.attributes.location + ' ' + team.attributes.nickname}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleDeleteTeam} aria-label="Delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
        );
    }
}