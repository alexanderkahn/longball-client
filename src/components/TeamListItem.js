import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {withStyles} from 'material-ui/styles';
import {Icon} from "material-ui";


const styles = theme => ({});

function TeamListItem(props) {
    const team = props.team;
    return (
        <ListItem button>
            <ListItemIcon><Icon>{team.abbreviation}</Icon></ListItemIcon>
            <ListItemText primary={team.location + " " + team.nickname}/>
        </ListItem>
    );
}

TeamListItem.propTypes = {
    team: PropTypes.shape({
        id: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
    }).isRequired
};

export default withStyles(styles)(TeamListItem);
