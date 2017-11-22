import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Icon } from 'material-ui';
import { Team } from '../../../../models/models';
import { Component } from 'react';

interface TeamListItemProps {
    team: Team;
    handleSelectTeamDetail: () => void;
}

export default class TeamListItem extends Component<TeamListItemProps> {
    render() {
        const {team, handleSelectTeamDetail} = this.props;
        return (
                <ListItem button={true} onClick={handleSelectTeamDetail}>
                    <ListItemIcon><Icon>{team.attributes.abbreviation}</Icon></ListItemIcon>
                    <ListItemText primary={team.attributes.location + ' ' + team.attributes.nickname}/>
                </ListItem>
        );
    }
}