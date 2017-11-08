import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Icon} from "material-ui";
import {Link} from "react-router-dom";
import {teamProp} from "../../../../models/models";

function TeamListItem(props) {
    const team = props.team;
    const teamDetailRoute = `/manage/teams/${props.team.id}`;
    return (
        <ListItem button component={Link} to={teamDetailRoute}>
            <ListItemIcon><Icon>{team.attributes.abbreviation}</Icon></ListItemIcon>
            <ListItemText primary={team.attributes.location + " " + team.attributes.nickname}/>
        </ListItem>
    );
}

TeamListItem.propTypes = {
    team: teamProp.isRequired,
};

export default TeamListItem;
